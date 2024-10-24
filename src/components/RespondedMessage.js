

import React, { useEffect, useState } from 'react';
// import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

import axios from 'axios'
import './AdminMessages.css'; 

const RespondedMessage = ({logoutaction}) => {
    // const navigate = useNavigate()
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');
  const [name, setname] = useState('')
  const [email,setemail] = useState('')
  const [ id , setid] = useState()
  const [isReplying, setIsReplying] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  

  console.log(messages);

  
  const auth = async () => {
    try {
      const token = localStorage.getItem('token'); // Fetch auth token from localStorage

      if (!token) {
        toast.error('No authentication token found. Please log in.');
        logoutaction()
        // navigate('/')
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Set token in headers
        },
      };

      await axios.get('http://localhost:8000/api/auth/authrization', config);
    } catch (error) {
      toast.error('You Are UnAuthorized');
      logoutaction()
      
    }
  };


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/findmessage'); 
    
        setMessages(response.data.response

        );
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
auth()
    fetchMessages();
  }, []);

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplyClick = (email,name,id ) => {
     setemail(email)
     setname(name)
     setid(id)

     
    setIsReplying(true);
  };

  const handleReplySubmit = async (e) => {
    console.log('sss',email,name);
    
    e.preventDefault();
    if (!reply.trim()) {
      return; 
    }

    try {
      
      const data = await axios.post(`http://localhost:8000/api/auth/reply`,{reply,email,name,id})

      if (data) {
        setSuccessMessage('Reply sent successfully!');
        setReply('');
        setname('')
        setemail('')
        setIsReplying(false);
    
      } else {
        setSuccessMessage('Failed to send reply. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      setSuccessMessage('Failed to send reply. Please try again later.');
    }
  };
      const mess = messages.filter((v)=>v.status===1)
  return (
    <div className="admin-messages-container">
      <h2>Responded Messages</h2>
      {mess.length === 0 ? (
        <p>No messages to display.</p>
      ) : (
        mess.map((message) => (
          <div key={message._id} className="message-card">
            <h3>{message.subject}</h3>
            <p><strong>From:</strong> {message.name} ({message.email})</p>
            <p>{message.message}</p>
            <button onClick={() => handleReplyClick(message.email,message.name,message._id)}>Reply</button>
          </div>
        ))
      )}

      {isReplying && (
        <form onSubmit={handleReplySubmit}>
          <textarea
            value={reply}
            onChange={handleReplyChange}
            placeholder="Type your reply..."
            rows="4"
            required
          />
          <button type="submit">Send Reply</button>
        </form>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default RespondedMessage;
