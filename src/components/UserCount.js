import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import './UserCount.css'; // Import the CSS file for custom styles
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserCount = ({logoutaction}) => {
    const [activeCount, setActiveCount] = useState(0);
    const [deactiveCount, setDeactiveCount] = useState(0);
    const navigate = useNavigate()

    
  const auth = async () => {
    try {
      const token = localStorage.getItem('token'); 

      if (!token) {
        toast.error('No authentication token found. Please log in.');
        logoutaction()
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      };

      await axios.get('http://localhost:8000/api/auth/authrization', config);
    } catch (error) {
      toast.error('You Are UnAuthorized');
      logoutaction()
      
    }
  };

    useEffect(() => {
        const fetchUserCounts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/auth/getUserCounts'); // Update with your API endpoint
                setActiveCount(response.data.activeCount);
                setDeactiveCount(response.data.deactiveCount);
            } catch (error) {
                console.error('Error fetching user counts:', error);
            }
        };
        auth()
        fetchUserCounts();
    }, []);

    return (
        <Row className="justify-content-center">
            <Col md={6} className="mb-4" onClick={()=>navigate('/usermanagement')}>
                <Card className="text-white bg-success custom-card">
                    <Card.Body>
                        <Card.Title>Active Users</Card.Title>
                        <Card.Text>
                            <h1 className="count">{activeCount}</h1>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={6} className="mb-4" onClick={()=>navigate('/usermanagement')}>
                <Card className="text-white bg-danger custom-card">
                    <Card.Body>
                        <Card.Title>Deactivated Users</Card.Title>
                        <Card.Text>
                            <h1 className="count">{deactiveCount}</h1>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default UserCount;
