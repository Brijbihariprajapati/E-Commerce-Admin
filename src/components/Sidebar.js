import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Slidebaar.css'
import {
  faGlobe,
  faBox,
  faShoppingCart,
  faUsers,
  faMessage,
  faReply,
  faFilePen,
  faUser,
  faRightFromBracket,
  faBlog,
  faListCheck
} from '@fortawesome/free-solid-svg-icons';

function Sidebar({ logoutaction }) {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const logout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    logoutaction();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-dark text-white d-flex flex-column justify-content-between p-3" style={{ width: '250px', height: '100vh' }}>
      <div>
        <h3>Admin Panel</h3>
        <Nav className="flex-column">
          <Link to="/" className={`text-white mb-3 ${isActive('/') ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
            <FontAwesomeIcon icon={faGlobe} color="red" /> Dashboard
          </Link>
          <Link to="/AddBannerText" className={`text-white mb-3 ${isActive('/AddBannerText') ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
            <FontAwesomeIcon icon={faFilePen} color="Lime" /> Banner Updates
          </Link>
          <Link to="/VlogUpload" className={`text-white mb-3 ${isActive('/VlogUpload') ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
          <FontAwesomeIcon icon={faBlog} color='#50C878' /> Vlogs Uploads
          </Link>
          <Link to="/managevlogs" className={`text-white mb-3 ${isActive('/managevlogs') ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
          <FontAwesomeIcon icon={faListCheck} color='#bd4e7b' /> Manage Vlogs
          </Link>
          <Link to="/products" className={`text-white mb-3 ${isActive('/products') ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
            <FontAwesomeIcon icon={faBox} color="green" /> Manage Products
          </Link>
          <Link to="/order" className={`text-white mb-3 ${isActive('/order') ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
            <FontAwesomeIcon icon={faShoppingCart} color="yellow" /> Manage Orders
          </Link>
          <Link to="/usermanagement" className={`text-white mb-3 ${isActive('/usermanagement') ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
            <FontAwesomeIcon icon={faUsers} color="Magenta" /> Manage Users
          </Link>
          <Link to="/adminmessage" className={`text-white mb-3 ${isActive('/adminmessage') ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
            <FontAwesomeIcon icon={faMessage} color="blue" /> Manage Message
          </Link>
          <Link to="/RespondedMessage" className={`text-white mb-3 ${isActive('/RespondedMessage') ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
            <FontAwesomeIcon icon={faReply} color="Turquoise" /> Replyed Message
          </Link>
         
        </Nav>
      </div>
      {/* Admin Profile Section */}
      <div className="admin-profile">
        <hr className="bg-white" />
        <div className="d-flex flex-column align-items-start" style={{ textDecoration: 'none' }}>
          <p className="text-white">Admin Name</p>
          <Link to="/AdminProfile" className="text-white mb-2" style={{ textDecoration: 'none' }}>
            <FontAwesomeIcon icon={faUser} color="Teal" /> Profile
          </Link>
          <Link onClick={logout} style={{ textDecoration: 'none' }} className="text-white">
            <FontAwesomeIcon icon={faRightFromBracket} color="SlateGray" /> Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
