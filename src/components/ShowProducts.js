import axios from 'axios';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ShowProducts({logoutaction}) {
  
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
useEffect(()=>{
  auth()
},[])
const location = useLocation()
const Navigate = useNavigate()
const data = location.state.product

console.log('products', data);


  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`http://localhost:8000/public/ProductsImage/${data.image}`} />
      <Card.Body style={{fontWeight:'400'}}>
        <Card.Title style={{fontWeight:'700', fontSize:'20px'}}>{data.name}</Card.Title>
        <Card.Title style={{fontWeight:'600', fontSize:'15px'}}>Price ${data.price}</Card.Title>
        <Card.Title style={{fontWeight:'600',fontSize:'15px'}}>Total Quantity: {data.stocks}</Card.Title>
        <Card.Title style={{fontWeight:'600',fontSize:'15px'}}>Available: {data.available}</Card.Title>
        <Card.Title style={{fontWeight:'600',fontSize:'15px'}}>Status: {data.status===0?'Active':'Deactive'}</Card.Title>
        <Card.Text> <h4>About:</h4>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary" onClick={()=>Navigate(-1)}>Back</Button>
      </Card.Body>
    </Card>
  );
}

export default ShowProducts;