import './BookNow.css';  // Import the CSS file
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

const BookNow = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const navigate = useNavigate();

  // State for villa details
  const [villa, setVilla] = useState(null);  // Store the fetched villa details
  const [loading, setLoading] = useState(true);  // Handle loading state
  //  const [error, setError] = useState(null);  // Handle error state

  // State for booking details
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    surname: '',
    mobile: '',
    email: '',
    country: '',
    city: '',
    adharCard: '',
    date: '',
    numberOfSeats: '',
    numberOfDays: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
  };

  // Fetch villa data from API
  useEffect(() => {
    const fetchVillaData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/villasapi`);
        // console.log("Single Villas: ", res.data.AdminSideVillas);

        const villaData = res.data.AdminSideVillas.find((villa) => villa.id === numericId);
        if (villaData) {
          setVilla(villaData);
        }
        // else {
        //   setError("Villa not found.");
        // }
      }
      catch (error) {
        // setError("Error fetching villa data.");
        console.error("BookNow API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVillaData();
  }, [numericId]);


  // Submit User Villa Booking Data 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    const {
      name,
      surname,
      mobile,
      email,
      country,
      city,
      date,
      numberOfSeats,
      numberOfDays
    } = bookingDetails;

    // console.log(name);

    if (!name || !surname || !mobile || !email || !country || !city || !date || !numberOfSeats || !numberOfDays) {
      alert('Please fill in all required fields.');
      return;
    }

    if (mobile.length < 10 || mobile.length > 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (numberOfSeats.length < 1) {
      alert('Number Of Seats Should Be More Than 1.');
      return;
    }

    if (numberOfDays.length < 1) {
      alert('Number Of Days Should Be More Than 1.');
      return;
    }

    // Include villa name in booking details
    const detailsWithVillaName = { ...bookingDetails, villaName: villa.name };

    // For Booking Villa 
    try {
      const token = sessionStorage.getItem("AccessToken");
      if (!token) {
        alert("You are not logged in. Please login.");
        navigate("/login");
        return;
      }

      const res = await axios.post("http://localhost:3000/booknow", detailsWithVillaName, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log('Response from server:', res.data);
      alert(res.data.message);
    }
    catch (error) {
      alert('Error during booking:', error)
      console.error('Error during booking:', error);
    }
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];



  if (loading) return <p>Loading villa details...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <section id="bookNow" className="page book-now-page">
      <div className="container" id="booknow-container">

        <h3>Book Now: {villa.name}</h3>
        <form onSubmit={handleSubmit}>

          {/* Gets From Database USing Url Id            */}
          <div>
            <label>Villa Name:</label>
            <input type="text" value={villa.name} readOnly />
          </div>

          {/* User Input Fileds  */}
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={bookingDetails.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Surname:</label>
            <input
              type="text"
              name="surname"
              value={bookingDetails.surname}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Mobile:</label>
            <input
              type="tel"
              name="mobile"
              value={bookingDetails.mobile}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={bookingDetails.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={bookingDetails.country}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={bookingDetails.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={bookingDetails.date}
              onChange={handleChange}
              min={today}  // Prevent selection of past dates
            />
          </div>
          <div>
            <label>Number of Seats(Rooms):</label>
            <input
              type="number"
              name="numberOfSeats"
              value={bookingDetails.numberOfSeats}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Number of Days:</label>
            <input
              type="number"
              name="numberOfDays"
              value={bookingDetails.numberOfDays}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Confirm Booking</button>
        </form>
      </div>
    </section>
  );
};

export default BookNow;
