import Header from './components/Header';
import Signup from './Pages/Signup';
import Footer from './components/Footer';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import User from './Pages/User';
import SideBar from './Pages/SideBar';
import './components/style.css'
import AuthRoute from './components/AuthRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './components/style/style.css'
///import './components/style/bootstrap.min.css'
// import './components/style/boxicons.min.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './Pages/sidestyle.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        {/* <Route path="sidebar" element={<SideBar />} /> */}

        {/* <Route path="admin" element={<Admin/>} /> */}
        <Route path="/admin" element={<AuthRoute allowedRole="1"><Admin /></AuthRoute>} />
        <Route path="/user" element={<AuthRoute allowedRole="0"><User /></AuthRoute>} />
      </Routes>
      <Footer />
      <ToastContainer />
    </BrowserRouter>

  );
}
export default App;
