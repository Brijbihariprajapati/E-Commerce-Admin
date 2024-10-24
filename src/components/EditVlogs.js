import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const EditVlogs = ({ logoutaction }) => {
    const data = useLocation();
    const val = data.state.Vlog;
    
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    const [Vlog, setVlog] = useState({
        title: val.title,
        description: val.description,
    });

    const [message, setMessage] = useState('');

    const auth = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error('No authentication token found. Please log in.');
                logoutaction();
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
            logoutaction();
        }
    };

    useEffect(() => {
        auth();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVlog({
            ...Vlog,
            [name]: value,
        });
    };

    const uploadImage = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', Vlog.title);
        formData.append('description', Vlog.description);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.put(`http://localhost:8000/api/auth/editVlog/${val._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success(response.data.msg);
            setMessage('Vlog updated successfully!');
            navigate('/managevlogs');
        } catch (error) {
            setMessage('Failed to update vlog');
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2 style={{ display: 'flex', alignItems: 'start', paddingBottom: '20px' }}>Update Vlog</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={Vlog.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={Vlog.description}
                        onChange={handleInputChange}
                        required
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
                        accept="image/*"
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Update Vlog</button>
            </form>
        </div>
    );
};

export default EditVlogs;
