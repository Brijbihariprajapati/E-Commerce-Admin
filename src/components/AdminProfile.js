// src/components/AdminProfile.js

import React, { useState, useEffect } from 'react';
import './AdminProfile.css'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AdminProfile({logoutaction}) {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    profilePicture: '', 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [id, setId] = useState(localStorage.getItem('userid'));

  
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

    
    const fetchProfile = async () => {

      try {
        
         
        const res = await axios.get(`http://localhost:8000/api/auth/findadmin/${id}`);
        setProfile(res.data.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(error.response?.data?.msg || 'Failed to load profile. Please try again.');
        toast.error(error.response?.data?.msg || 'Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    auth()
    fetchProfile();
  }, [navigate, id]);


  if (loading) {
    return (
      <div className="admin-profile-wrapper">
        <div className="admin-profile-container">
          <div className="loading">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-profile-wrapper">
        <div className="admin-profile-container">
          <div className="error-message">{error}</div>
        
        </div>
      </div>
    );
  }

  return (
    <div className="admin-profile-wrapper">
      <div className="admin-profile-container">
        <h2>Admin Profile</h2>
        <div className="profile-picture-section">
          {profile.profilePicture ? (
            <img src="https://t4.ftcdn.net/jpg/02/27/45/09/360_F_227450952_KQCMShHPOPebUXklULsKsROk5AvN6H1H.jpg" alt="Default Profile" className="profile-picture" />
        ) : (
            <img src="https://t4.ftcdn.net/jpg/02/27/45/09/360_F_227450952_KQCMShHPOPebUXklULsKsROk5AvN6H1H.jpg" alt="Default Profile" className="profile-picture" />
          )}
        </div>
        <div className="profile-details">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          
        </div>
      
      </div>
    </div>
  );
}

export default AdminProfile;
