import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import './UserCount.css'; 
import { useNavigate } from 'react-router-dom';

const MessageDashboard = () => {
    const [ZeroCount, setZeroCount] = useState(0);
    const [OneCount, setOneCount] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserCounts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/auth/messagecount');
                setZeroCount(response.data.ZeroCount);
                setOneCount(response.data.OneCount);
            } catch (error) {
                console.error('Error fetching user counts:', error);
            }
        };

        fetchUserCounts();
    }, []);

    return (
        <Row className="justify-content-center">
            <Col md={6} className="mb-4" onClick={()=>navigate('/usermanagement')}>
                <Card className="text-white custom-card" style={{backgroundColor:'#05487f'}}>
                    <Card.Body>
                        <Card.Title>Pending To Reply</Card.Title>
                        <Card.Text>
                            <h1 className="count">{ZeroCount}</h1>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={6} className="mb-4" onClick={()=>navigate('/usermanagement')}>
                <Card className="text-white custom-card" style={{backgroundColor:'#0eaf38'}}>
                    <Card.Body>
                        <Card.Title>Replayed message</Card.Title>
                        <Card.Text>
                            <h1 className="count">{OneCount}</h1>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default MessageDashboard;
