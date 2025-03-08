import { useState, useEffect } from "react";
import axios from "axios";
import "./Booking.css";
import { useNavigate } from "react-router-dom";

const YourBooking = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("AdminAccessToken");
        if (!token) {
            navigate("/");
            alert("Please Login To Proceed...");
            return;
        }

        const fetchBookings = async () => {
            try {
                const response = await axios.get("http://localhost:3001/adminbooking", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // console.log(response.data.ClientBooking);
                setBookings(response.data.ClientBooking);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, [navigate]);

    const CancleBooking =async(id)=>{
        // alert("Booking Cancled...");
        // console.log("ID: ", id);
        if(window.confirm("Are you sure you want to cancel this booking?"))
        {
            const res = await axios.delete(`http://localhost:3001/adminbooking/canclebooking/${id}`);
            alert(res.data.message);
            // console.log(res);
            // console.log(res.data.message);
        }

        
    }

    return (
        <section id="yourBooking" className="page your-booking-page">
            <h1>Client Bookings</h1>
            <p>Total Bookings : {bookings.length} </p>
            <div className="cards-container">
                {bookings.length > 0 ? (
                    bookings.map((e, index) => (
                        <div key={e.id || index} className="booking-card">

                            <div className="card-header">
                                <h2>{e.villaName}</h2>
                            </div>
                            <div className="card-body">
                                <p><strong>Name:</strong> {e.name} {e.surname}</p>
                                <p><strong>Email:</strong> {e.email}</p>
                                <p><strong>Mobile:</strong> {e.mobile}</p>
                                <p><strong>Date:</strong> {new Date(e.date).toLocaleDateString("en-GB")}</p>
                                <p><strong>Location:</strong> {e.city}, {e.country}</p>
                                <p><strong>Seats:</strong> {e.numberOfSeats}</p>
                                <p><strong>Days:</strong> {e.numberOfDays}</p>
                                {/* <p><strong>Payment:</strong>
                                    <span className={e.payment ? "paid" : "unpaid"}>
                                        {e.payment ? "Paid" : "Unpaid"}
                                    </span>
                                </p> */}
                            </div>
                            <div className="card-button">
                                <button className="cancle_booking" 
                                    onClick={()=>{CancleBooking(e._id)}}>
                                    Cancle Booking
                                </button>
                            </div>
                        </div>
                    ))
                ) 
                : 
                (
                    <p className="no-bookings">No bookings available.</p>
                )}
            </div>
        </section>
    );
};

export default YourBooking;
