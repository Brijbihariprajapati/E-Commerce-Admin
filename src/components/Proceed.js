import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Proceed({logoutaction}) {
    const location  = useLocation();
    const [product, setProduct] = useState(null); 
    const data = location.state.product
    console.log('data',data);
    
    const navigate = useNavigate();
    
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


    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/auth/findproductbyidupdate/${data.productId}/${data._id}`);
            const fetchedProduct = response.data.data;
            console.log('Fetched product:', fetchedProduct);

            if (fetchedProduct) {
                setProduct(fetchedProduct); 
            } else {
                toast.error('Product not found');
            }
        } catch (error) {
            console.error("Error fetching product:", error);
            toast.error('Failed to fetch product details');
        }
    };

    useEffect(() => {
        auth()
        fetchProduct();
    }, [location]);

    return (
        <>
            {product ? ( 
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={`http://localhost:8000/public/ProductsImage/${product.image}`} />
                    <Card.Body style={{ fontWeight: '400' }}>
                        <Card.Title style={{ fontWeight: '700', fontSize: '20px' }}>{product.name}</Card.Title>
                        <Card.Title style={{ fontWeight: '600', fontSize: '15px' }}>Color: {product.color}</Card.Title>
                        <Button variant="primary" onClick={() => navigate(-1)}>Back</Button>
                    </Card.Body>
                </Card>
            ) : (
                <p>Loading product details...</p> 
            )}
        </>
    );
}

export default Proceed;
