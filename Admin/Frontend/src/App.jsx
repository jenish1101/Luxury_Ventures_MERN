import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Signup from "./components/Signup/Signup"
import Booking from './components/booking/Booking';
import UserQuery from './components/UserQuery/UserQuery';
import Home from './components/Home/Home';
import AboutUs from './components/About/AboutUs';
import Terms_Condition from './components/Terms_Condition/Terms_Condition';

import AddVillas from './components/AddVillas/AddVillas';
import { ShowVillas } from './components/AddVillas/ShowVillas/ShowVillas';
import { UpdateVilla } from './components/AddVillas/ShowVillas/UpdateVilla/UpdateVilla';

// Context API 
import { AuthProvider } from "./Context/AuthContext";

const App = () => {
  
  return (
   <>
   <AuthProvider>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/adminlogin" element={<Login />} />
        <Route path="/adminsignup" element={<Signup />} />
        <Route path="/userbooking" element={<Booking />} />
        <Route path="/userquery" element={<UserQuery />} />
        <Route path="/adminabout" element={<AboutUs/>} />
        <Route path="/adminterms" element={<Terms_Condition/>}/>
        <Route path='/addvillas' element={<AddVillas/>} />
        <Route path='/showvillas' element={<ShowVillas/>}/>
        <Route path="/update-villa/:id" element={<UpdateVilla/>} /> {/* Route for updating villa */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    </AuthProvider>
   </>
  )
}

export default App
