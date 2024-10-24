import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
// import {useNavigate} from 'react-router-dom'

const UserManagement = ({logoutaction}) => {
  const [data, setData] = useState([]);
  // const navigate = useNavigate()
  
  
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


  const getuser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/auth/userfind");
      if (res) {
        setData(res.data.data);
      }
    } catch (error) {
      toast(error.res.data.msg);
    }
  };

   const handleActive = async (id)=>{
         try {
            const res = await axios.put(`http://localhost:8000/api/auth/active/${id}`)
            toast.success(res.data.msg)
            
                getuser()
            
         } catch (error) {
            toast.error(error.res.data.msg)
         }
   }

   const deleteuser = async (id)=>{
    try {
        const response = await axios.put(`http://localhost:8000/api/auth/deleteuser${id}`)
        toast.success(response.data.msg)
    } catch (error) {
        toast.error(error.response.data.msg)
    }
   }
 
  useEffect(() => {
    getuser();
    auth()
  }, []);
  console.log("users", data);


  return (
    <div className="container mt-4 ">
      <h1 className="text-center mb-4">Manage Users</h1>

      <div className="row">
        <div>
          <Table striped bordered hover responsive style={{ width: "82vw" }}>
            <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td style={{width:'150px',color:`${user.status==='Active' ? "green" : "red"}`}}>
                      <p>
                        {user.status ==='Active' ? "Active" : "Inactive"}
                      </p>
                    </td>
                    <td style={{ width:'300px'}}>
                            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                                <Button 
                                    variant={user.status==='Deactivate' ? "danger" : "success"}
                                    onClick={()=>handleActive(user._id)}
                                >
                                    {user.status==='Active'?'Deactivate':'Active' }
                                </Button>
                                <Button variant="danger" onClick={()=>deleteuser(user._id)}>
                                    Delete
                                </Button>
                            </div>
                        </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
