import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const SingleVilla = () => {
  const { id } = useParams();
  const numericId = Number(id); // The ID from the URL
  const navigate = useNavigate();

  const [villa, setVilla] = useState(null); // Store the fetched villa details
  const [loading, setLoading] = useState(true); // Loading state
  // const [error, setError] = useState(null); // Error state

  const handleBookNow = () => {
    navigate(`/book-now/${id}`);
  };

  useEffect(() => {
    const fetchVillaData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/villasapi");
        // console.log("Single Villas: ", res.data.AdminSideVillas);

        const villaData = res.data.AdminSideVillas.find((villa) => villa.id === numericId);
        if (villaData) {
          setVilla(villaData); // Set the villa that matches the ID
        }
        //  else {
        //   setError("Villa not found"); // Handle if villa with the given ID is not found
        // }
      } 
      catch (error) 
      {
        // setError("Error fetching villa data");
        console.error("SingleVilla API Error:", error);
      } 
      finally {
        setLoading(false); // Stop loading when the API call is complete
      }
    };

    fetchVillaData();
  }, [numericId]);

  if (loading) return <p>Loading...</p>; // Show loading state
  // if (error) return <p>{error}</p>; // Show error state

  return (
    <section id="singleVilla" className="page">
      <div className="container">
        <h3>{villa.name}</h3>

{/* Image Block  */}
        <div className="images">

          <div className="villaImg">
            <img src={`http://localhost:3001/Images/${villa.image}`} alt={villa.name} />
          </div>

          <div className="otherImgs">
            <div>
              <img src="/landing.jpg" alt="villa" />
              <img src="../../../public/Home/people.jpg" alt="villa" />
            </div>
            <div>
              <img src="../../../public/Home/people2.jpg" alt="villa" />
              <img src="../../../public/villas/villa10.png" alt="villa" />
            </div>
          </div>

        </div>

{/* Location Block And Button */}
        <div id="location" style={{ display: "flex", alignItems: "center" }}>
          <h4><CiLocationOn />{villa.location}</h4>

          <div className="booking" style={{ margin: "0px 20px" }}>
            <form>
              <input 
                type="button" 
                value="Book Now"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#008CBA",
                  color: "white",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
                onClick={handleBookNow}
              />
            </form>
          </div>
          
        </div>

{/* Avaliable Rooms  */}
        <p>
          {villa.bedrooms} Bedrooms / {villa.guests} Guests / {villa.bathrooms} Bathrooms / {villa.squareMeter} sq. meters
        </p>
        
{/* Times  */}
        <div className="checkin_out">
          <h5>Check In: <span>9:00 AM</span></h5>
          <h5>Check Out: <span>11:00 PM</span></h5>
        </div>

{/* Map Location  */}
        <div className="location">
          <h4>LOCATION</h4>
          <iframe
            src={villa.src}
            style={{ width: "100%", height: "400px", border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </section>
  );
};

export default SingleVilla;
