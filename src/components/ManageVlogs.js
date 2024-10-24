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

function ManageVlogs({ logoutaction }) {
  const navigate = useNavigate();
  const [Vlog, setVlog] = useState([]);

  const auth = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No authentication token found. Please log in.");
        logoutaction();
        // navigate('/')
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Set token in headers
        },
      };

      await axios.get("http://localhost:8000/api/auth/authrization", config);
    } catch (error) {
      toast.error("You Are UnAuthorized");
      logoutaction();
    }
  };

  const find = () => {
    axios
      .get("http://localhost:8000/api/auth/findVlog")
      .then((response) => {
        setVlog(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };
  useEffect(() => {
    auth();
    find();
  }, []);

  const deletedata = async (id) => {
    try {
      const data = await axios.delete(
        `http://localhost:8000/api/auth/deleteVlog/${id}`
      );
      if (data) {
        toast.success(data.data.msg);
        find();
      }
    } catch (error) {
      toast.error("Failed To Delete");
    }
  };

  const handleEdit = (Vlog) => {
    navigate("/editvlogs", { state: { Vlog } });
  };
  return (
    <div>
      <h1>Manage Vlogs</h1>
      <Table striped bordered hover style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Vlog.map((Vlog, index) => (
            <tr key={Vlog.id}>
              <td style={{ width: "50px" }}>{index + 1}</td>
              <td style={{ width: "50px" }}>
                <img
                  style={{ height: "50px", width: "63px", margin: "-7px" }}
                  alt={Vlog.name}
                  src={`http://localhost:8000/public/Vlog/${Vlog.image}`}
                />
              </td>
              <td>{Vlog.title}</td>
              <td>${Vlog.description}</td>
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
                    onClick={() => handleEdit(Vlog)}
                    className="me-2"
                    icon={faPenToSquare}
                    color="yellow"
                    size="2x"
                  />
                  <FontAwesomeIcon
                    onClick={() => deletedata(Vlog._id)}
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

export default ManageVlogs;
