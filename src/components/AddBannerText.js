import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "./AddProducts.css";

const AddBannerText = ({ logoutaction }) => {
  const [BannerName, setBannerName] = useState({
    name: "",
    description: "",
    offerText: "",
    offer:null
  });

  const [message, setMessage] = useState("");

  const auth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No authentication token found. Please log in.");
        logoutaction();
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.get("http://localhost:8000/api/auth/authrization", config);
    } catch (error) {
      toast.error("You Are UnAuthorized");
      logoutaction();
    }
  };

  const handleInputChange = (e) => {
    setBannerName({
      ...BannerName,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/homebanner",
        BannerName 
      );
      toast.success(response.data.msg);
      setMessage("Banner uploaded successfully!");
    } catch (error) {
      setMessage("Failed to upload banner");
      console.error("Error:", error);
    }
  };

  const find = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/auth/findBannerText`);
      if (response.data.data) {
        const bannerData = response.data.data;

        bannerData.map((v)=>{
            return setBannerName({
                name: v.name || "",
                description: v.description || "",
                offerText: v.offerText || "",
                offer:v.offer
              });
        })
       
      }
    } catch (error) {
      toast.error("Failed to fetch banner text");
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    auth();
    find();
  }, []);

  return (
    <div className="containerr">
      <h2>Upload Banner Text</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={BannerName.name} 
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Banner Description:</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={BannerName.description} 
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="offerText">Offer Text:</label>
          <input
            type="text"
            className="form-control"
            id="offerText"
            name="offerText"
            value={BannerName.offerText} 
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="offerText">Offer:</label>
          <input
            type="number"
            className="form-control"
            id="offer"
            name="offer"
            value={BannerName.offer} 
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Upload Banner
        </button>
      </form>
    </div>
  );
};

export default AddBannerText;
