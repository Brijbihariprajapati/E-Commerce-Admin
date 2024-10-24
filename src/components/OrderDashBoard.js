import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import './UserCount.css'; 
import { useNavigate } from 'react-router-dom';

const OrderDashBoard = () => {
    const [pendingCount, setActiveCount] = useState(0);
    const [dispatchCount, setDeactiveCount] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserCounts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/auth/orderCounts');
                setActiveCount(response.data.pendingCount);
                setDeactiveCount(response.data.dispatchCount);
            } catch (error) {
                console.error('Error fetching user counts:', error);
            }
        };

        fetchUserCounts();
    }, []);

    return (
        <Row className="justify-content-center">
            <Col md={6} className="mb-4" onClick={()=>navigate('/order')}>
                <Card className="text-white custom-card" style={{backgroundColor:'#0eaf9e'}}>
                    <Card.Body>
                        <Card.Title>Recieved Orders</Card.Title>
                        <Card.Text>
                            <h1 className="count">{pendingCount}</h1>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={6} className="mb-4" onClick={()=>navigate('/order')}>
                <Card className="text-white custom-card" style={{backgroundColor:'#a667b1'}}>
                    <Card.Body>
                        <Card.Title>Dispatched Order</Card.Title>
                        <Card.Text>
                            <h1 className="count">{dispatchCount}</h1>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default OrderDashBoard;
