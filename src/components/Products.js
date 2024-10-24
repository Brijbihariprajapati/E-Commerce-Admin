import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function Products({logoutaction}) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);


  
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

  const find = () => {
    axios
      .get("http://localhost:8000/api/auth/findproduct")
      .then((response) => {
        setProducts(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };
  useEffect(() => {
    auth()
    find();
  }, []);

  const StatusAction = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/auth/status/${id}`
      );
      if (response) {
        toast.success(response.data.msg);
        console.log(response.data);
        find();
      }
    } catch (error) {
      toast.error("Failed to Update Status");
      console.log("Failed to Update Status", error);
    }
  };

  const deletedata = async (id) => {
    try {
      const data = await axios.delete(
        `http://localhost:8000/api/auth/delete/${id}`
      );
      if (data) {
        toast.success(data.data.msg);
        find();
      }
    } catch (error) {
      toast.error("Failed To Delete Products");
    }
  };

  const View = async (product) => {
    navigate("/showproducts", { state: { product } });
  };





  const handleEdit =(product)=>{

    navigate('/editproducts',{state:{product}})

  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Manage Products</h1>
        <Button
          variant="primary"
          style={{ marginTop: "20px" }}
          className="mb-3"
          onClick={() => navigate("/addproducts")}
        >
          Add New Product
        </Button>
      </div>
      <Table striped bordered hover style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Available Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td style={{width:'50px'}}>{index + 1}</td>
              <td style={{ width: "50px" }}>
                <img
                  style={{ height: "50px", width: "63px", margin: "-7px" }}
                  alt={product.name}
                  src={`http://localhost:8000/public/ProductsImage/${product.image}`}
                />
              </td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stocks}</td>
              <td>{product.available}</td>
              <td>
                <button
                  onClick={() => StatusAction(product._id)}
                  style={{
                    color: product.status === 0 ? "green" : "red",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    padding: 0,
                    textDecoration: "none",
                  }}
                >
                  {product.status === 0 ? "Active" : "Deactive"}
                </button>
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    gap: "20px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={() => View(product)}
                    color="green"
                    className="me-2"
                    size="2x"
                  />

                  <FontAwesomeIcon 

                  onClick={()=>handleEdit(product)}
                    className="me-2"
                    icon={faPenToSquare}
                    color="yellow"
                    size="2x"
                  />
                  <FontAwesomeIcon
                    onClick={() => deletedata(product._id)}
                    icon={faTrashCan}
                    color="red"
                    size="2x"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Products;
