import './App.css'

import {BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom';

import Home from './components/Home/Home';
import AboutUs from './components/AboutUs/AboutUs';
import Contact from './components/Contact/Contact';
import Villas from './components/Villa/Villas';
import SingleVilla from './components/Villa/SingleVilla';
import TermsAndConditions from './components/TermsAndConditions/TermsAndConditions';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Logout from './components/Logout/Logout';
import Booknow from "./components/Villa/Booknow";
import Answer from './components/Answer/Answer';
import YourBooking from './components/YourBooking/YourBooking';

import { AuthProvider } from './Context/AutnContext';


// For Visitors 

import VisitorHome from "./components/Visitors/Home/VisitorHome";
import Faq from './components/Visitors/FAQ/Faq';

const App = () => {
  return (
    <>
      <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/termsandconditions' element={<TermsAndConditions/>}/>
          <Route path='/villas' element={<Villas/>}/>
          <Route path='/villa/:id' element={<SingleVilla/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path="/book-now/:id" element={<Booknow />} />
          <Route path="/your-booking" element={<YourBooking />} />
          <Route path="/answer" element={<Answer />} />
          <Route path="*" element={<Navigate to="/" replace />} />

          <Route path="/visitorhome" element={<VisitorHome />} />
          <Route path="/visitorfaq" element={<Faq />} />
        </Routes>
        <Footer/>
      </Router>
      </AuthProvider>
    </>
  )
}

export default App
