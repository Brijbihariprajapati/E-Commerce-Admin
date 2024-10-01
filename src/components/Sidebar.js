import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBox, faShoppingCart, faUsers } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  return (
    <div className="bg-dark text-white d-flex flex-column justify-content-between p-3" style={{ width: '250px', height: '100vh' }}>
      {/* Sidebar Header */}
      <div>
        <h3>Admin Panel</h3>
        <Nav className="flex-column">
          <Link to="/" className="text-white mb-3">
            <FontAwesomeIcon icon={faUser} /> Dashboard
          </Link>
          <Link to="/products" className="text-white mb-3">
            <FontAwesomeIcon icon={faBox} /> Manage Products
          </Link>
          <Link to="/orders" className="text-white mb-3">
            <FontAwesomeIcon icon={faShoppingCart} /> Manage Orders
          </Link>
          <Link to="/users" className="text-white mb-3">
            <FontAwesomeIcon icon={faUsers} /> Manage Users
          </Link>
        </Nav>
      </div>

      {/* Admin Profile Section */}
      <div className="admin-profile">
        <hr className="bg-white" />
        <div className="d-flex flex-column align-items-start">
          <p className="text-white">Admin Name</p>
          <Link to="/profile" className="text-white mb-2">Profile</Link>
          <Link to="/logout" className="text-white">Logout</Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
