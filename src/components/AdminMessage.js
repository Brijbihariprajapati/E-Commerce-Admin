import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminMessages.css';

const AdminMessage = ({logoutaction}) => {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState();
  const [isReplying, setIsReplying] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  // const navigate = useNavigate();

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


  // Fetch messages after checking authorization
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        await auth(); // Ensure the user is authorized

        const response = await axios.get('http://localhost:8000/api/auth/findmessage');
        setMessages(response.data.response);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    
    fetchMessages();
  }, []);

  // Handle input change for reply
  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  // Set the reply state for the selected message
  const handleReplyClick = (email, name, id) => {
    setEmail(email);
    setName(name);
    setId(id);
    setIsReplying(true);
  };

  // Handle reply submission
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!reply.trim()) {
      return;
    }

    try {
      const data = await axios.post(`http://localhost:8000/api/auth/reply`, { reply, email, name, id });

      if (data) {
        setSuccessMessage('Reply sent successfully!');
        setReply('');
        setName('');
        setEmail('');
        setIsReplying(false);
      } else {
        setSuccessMessage('Failed to send reply. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      setSuccessMessage('Failed to send reply. Please try again later.');
    }
  };

  // Filter out replied messages
  const mess = messages.filter((v) => v.status === 0);

  return (
    <div className="admin-messages-container">
      <h2>Received Messages</h2>
      {mess.length === 0 ? (
        <p>No messages to display.</p>
      ) : (
        mess.map((message) => (
          <div key={message._id} className="message-card">
            <h3>{message.subject}</h3>
            <p><strong>From:</strong> {message.name} ({message.email})</p>
            <p>{message.message}</p>
            <button onClick={() => handleReplyClick(message.email, message.name, message._id)}>Reply</button>
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

export default AdminMessage;
