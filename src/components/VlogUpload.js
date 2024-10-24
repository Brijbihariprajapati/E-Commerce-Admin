import React, { useState,useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './VlogUpload.css';  // Import the CSS for styling

const VlogUpload = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
    });

    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        if (formData.image) {
            data.append('image', formData.image); // Attach file to FormData
        }

        try {
            const response = await axios.post('http://localhost:8000/api/auth/vlogupload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure form-data is used
                },
            });
            toast.success(response.data.msg);
            setFormData({
                title: '',
                description: '',
                image: null,
            });
            if (fileInputRef.current) {
                fileInputRef.current.value = null; // Reset the file input
            }

        } catch (error) {
            console.error('Error uploading vlog:', error);
            toast.error('Failed to upload vlog');
        }
    };

    return (
        <div className="vlog-upload-container">
            <h2 className="vlog-upload-title">Upload Vlog</h2>
            <form onSubmit={handleSubmit} className="vlog-upload-form">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Upload Image:</label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef} 
                    />
                </div>

                <button type="submit" className="submit-btn">Upload Vlog</button>
            </form>
        </div>
    );
};

export default VlogUpload;
