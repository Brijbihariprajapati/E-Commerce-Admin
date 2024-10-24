import React, { useState, useEffect } from "react";
import "./OrderDetails.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ExcelJS from "exceljs";

const OrderDetails = ({ logoutaction }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [offer, setoffer] = useState(0);

  const find = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/auth/findBannerText`
      );
      if (response.data.data) {
        const bannerData = response.data.data;

        bannerData.map((v) => {
          return setoffer({
            offer: v.offer || "",
          });
        });
      }
    } catch (error) {
      toast.error("Failed to fetch banner text");
      console.error("Fetch error:", error);
    }
  };

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
          Authorization: `Bearer ${token}`, // Set token in headers
        },
      };

      await axios.get("http://localhost:8000/api/auth/authrization", config);
    } catch (error) {
      toast.error("You Are UnAuthorized");
      logoutaction();
    }
  };

  const fetchOrderDetails = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/auth/findordersdetails"
      );
      if (res) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Failed to fetch order details");
    }
  };

  useEffect(() => {
    auth();
    fetchOrderDetails();
    find();
  }, []);

  const handleButtonClick = (product) => {
    navigate(`/placed/${product.id}`, { state: { product } });
  };

  const handleExportExcel = async (order) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Order");

    worksheet.columns = [
      { header: "Order ID", key: "_id", width: 20 },
      { header: "Quantity", key: "quantity", width: 15 },
      { header: "User ID", key: "userId", width: 20 },
      { header: "Name", key: "name", width: 30 },
      { header: "Address", key: "address", width: 30 },
      { header: "Mobile", key: "mobile", width: 15 },
      { header: "Payment Method", key: "paymentMethod", width: 20 },
      { header: "Price", key: "price", width: 15 },
    ];

    worksheet.addRow(order);

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `order_${order._id}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  };

  return (
    <div className="flex container">
      <div className="row">
        {data.map((v) => (
          <div key={v._id} className="order-details col-md-6">
            <div className="order-header">
              <h2>Order ID: {v._id}</h2>
              <span
                className="order-status"
                style={{
                  color: v.status === "dispatch" ? "red" : undefined,
                  backgroundColor:
                    v.status === "dispatch" ? "#e74d3c4f" : undefined,
                }}
              >
                Status: <strong>{v.status || "Pending"}</strong>
              </span>
            </div>
            <div className="order-info" style={{ width: "100%" }}>
              <p>
                <strong>Quantity:</strong> {v.quantity}
              </p>
              <p>
                <strong>User ID:</strong> {v.userId}
              </p>
              <p>
                <strong>Name:</strong> {v.name}
              </p>
              <p>
                <strong>Address:</strong> {v.address}
              </p>
              <p>
                <strong>Mobile:</strong> {v.mobile}
              </p>
              <p>
                <strong>Payment Method:</strong> {v.paymentMethod}
              </p>
              <p className="order-price">
                <strong>
                  {offer.offer
                    ? `Total Amount After ${offer.offer}% Discount:`
                    : "Total Amount:"}
                </strong>{" "}
                $
                {v.paymentMethod === "cash"
                  ? (v.price - (v.price * offer.offer) / 100).toFixed(2)
                  : v.price.toFixed(2)}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>
              <Button
                style={{ cursor: "pointer" }}
                onClick={() => handleExportExcel(v)}
              >
                Print to Excel
              </Button>
              <Button
                style={{ cursor: "pointer" }}
                onClick={() => handleButtonClick(v)}
              >
                Proceed To This Order
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
