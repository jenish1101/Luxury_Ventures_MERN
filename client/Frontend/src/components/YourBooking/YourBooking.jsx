import { useState, useEffect } from "react";
import axios from "axios";
import "./YourBooking.css";

import { useNavigate } from "react-router-dom";

const YourBooking = () => {
    const [bookings, setBookings] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = sessionStorage.getItem("AccessToken");
                if (!token) {
                    alert("You are not logged in. Please log in to view your bookings.");
                    navigate("/login");
                    return;
                }
                const response = await axios.get("http://localhost:3000/yourbooking", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // console.log("API Response:", response); // Log the API response
                // console.log("API Response Data:", response.data);
                // console.log(response.data.BookingModelData);
                setBookings(response.data.BookingModelData)
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, []);

    const CancleBooking = async (id) => {
        // alert("CancleBooking");
        // console.log("ID : ", id);

        const confirmDelete = window.confirm("Are you sure you want to delete Your Booking?");

        if (confirmDelete) {
            const res = await axios.delete(`http://localhost:3000/yourbooking/cancle-client/${id}`);
            console.log(res.data.message);
        }
    }

    return (

        <div className="user-booking">
            <section id="yourBooking" className="page your-booking-page" style={{ background: "white" }}>
                <div className="list-container">
                    <h1>Your Bookings</h1> <br />


                    <div className="all_items">
                        {bookings.length > 0 ? (bookings.map((e) => (
                                <div key={e.id} className="booking-item">
                                    <h2><span><h1>VillName:</h1></span>{e.villaName}</h2>
                                    <div className="booking-details">
                                        <p><strong>Name:</strong> {e.name}</p>
                                        <p><strong>Surname:</strong> {e.surname}</p>
                                        <p><strong>Email:</strong> {e.email}</p>
                                        <p><strong>Mobile:</strong> {e.mobile}</p>
                                        <p><strong>Date:</strong> {new Date(e.date).toLocaleDateString()}</p>
                                        <p><strong>Country:</strong> {e.country}</p>
                                        <p><strong>City:</strong> {e.city}</p>
                                        {/* <p><strong>Adhar Card:</strong> {e.adharCard}</p> */}
                                        <p><strong>Number of Seats:</strong> {e.numberOfSeats}</p>
                                        <p><strong>Number of Days:</strong> {e.numberOfDays}</p>
                                        {/* <p><strong>Payment:</strong> <span className={e.payment ? "paid" : "unpaid"}>{e.payment ? "Yes" : "No"}</span></p> */}
                                    </div>

                                    <div className="card-button">
                                        <button
                                            onClick={() => { CancleBooking(e._id) }}
                                            className="delete-booking">DELETE</button>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <p className="no-bookings">No bookings available.</p>
                        )}
                    </div>
                </div>
            </section>
        </div>

    );
};

export default YourBooking;

                            