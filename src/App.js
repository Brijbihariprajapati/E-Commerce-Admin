import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Login from './Login';
import AddProducts from './components/AddProducts.';
import ShowProducts from './components/ShowProducts';
import EditProducts from './components/EditProducts';
import OrderDetails from './components/OrderDetails';
import Proceed from './components/Proceed';
import UserManagement from './components/UserManagement';
import AdminMessage from './components/AdminMessage';
import RespondedMessage from './components/RespondedMessage';
import AdminProfile from './components/AdminProfile';
import AddBannerText from './components/AddBannerText';
import VlogUpload from './components/VlogUpload';
import ManageVlogs from './components/ManageVlogs';
import EditVlogs from './components/EditVlogs';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <div className="d-flex">
          <Sidebar logoutaction={handleLogout} />
          <Container fluid className="p-4">
            <Routes>
              <Route path="*" element={<Dashboard logoutaction={handleLogout} />} />
              <Route path="/products" element={<Products logoutaction={handleLogout}/>} />
              <Route path="/addproducts" element={<AddProducts logoutaction={handleLogout}/>} />
              <Route path='/showproducts' element={<ShowProducts logoutaction={handleLogout}/>}/>
              <Route path='/editproducts' element={<EditProducts logoutaction={handleLogout}/>}/>
              <Route path='/order' element={<OrderDetails logoutaction={handleLogout}/>}/>
              <Route path='/placed/:id' element={<Proceed logoutaction={handleLogout}/>}/>
              <Route path='/usermanagement' element={<UserManagement logoutaction={handleLogout}/>}/>
              <Route path='/adminmessage' element={<AdminMessage logoutaction={handleLogout}/>}/>
              <Route path='/RespondedMessage' element={<RespondedMessage logoutaction={handleLogout}/>}/>
              <Route path='/AdminProfile' element = {<AdminProfile logoutaction={handleLogout}/>}/>
              <Route path='/AddBannerText' element = {<AddBannerText logoutaction={handleLogout}/>}/>
              <Route path='/VlogUpload' element = {<VlogUpload logoutaction={handleLogout}/>}/>
              <Route path='/managevlogs' element = {<ManageVlogs logoutaction={handleLogout}/>}/>

              <Route path='/editvlogs' element = {<EditVlogs logoutaction={handleLogout}/>}/>
            </Routes>
          </Container>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20vh' }}>
          <Login loginaction={handleLogin} />
        </div>
      )}
    </Router>
  );
}

export default App;
