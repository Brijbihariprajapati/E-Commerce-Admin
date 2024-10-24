import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './AddProducts.css'
const AddProducts = ({logoutaction}) => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null); 

    const [productData, setProductData] = useState({
        name: '',
        price: '',
        color: '',
        stocks: '',
        available: '',
        status: 0,
    });

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
    useEffect(()=>{
        auth()
    },[])
    const [message, setMessage] = useState('');
    console.log('image', image);

    const handleInputChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });
    };

    const uploadImage = (e) => {
        setImage(e.target.files[0]); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        for (const key in productData) {
            formData.append(key, productData[key]);
        }
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('http://localhost:8000/api/auth/addproducts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success(response.data.msg);
            setMessage('Product uploaded successfully!');
            navigate('/products');
        } catch (error) {
            setMessage('Failed to upload product');
            console.error('Error:', error);
        }
    };

    return (
        <div className='containerr'>
            <h2>Upload a Product</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit} >
                <div  className="form-group" >
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={productData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={productData.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="color">Color:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="color"
                        name="color"
                        value={productData.color}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="stocks">Stocks:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="stocks"
                        name="stocks"
                        value={productData.stocks}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="available">Available:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="available"
                        name="available"
                        value={productData.available}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="status"
                        name="status"
                        value={productData.status}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={uploadImage}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Upload Product</button>
            </form>
        </div>
    );
};

export default AddProducts;
