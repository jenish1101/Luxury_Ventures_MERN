import axios from "axios";
import { useEffect, useState } from "react";
import "./ShowVillas.css";

// React Icons 
import { IoIosPeople } from "react-icons/io";
import { FaBed } from "react-icons/fa";
import { BiArea } from "react-icons/bi";
import { FaBath } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { FaMountainSun } from "react-icons/fa6";
import { TbBeach } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

export const ShowVillas = () => {

    const [ShowVillas, setShowVillas] = useState([]);
    const navigate = useNavigate();
    
    // For Page Pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const villasPerPage = 6; // Show 6 villas per page

    useEffect(() => {
        const token = sessionStorage.getItem("AdminAccessToken");
        if (!token) {
            navigate("/");
            alert("Please Login To Proceed...");
            return;
        }

        const FetchingVillasData = async () => {
            try {
                const res = await axios.get("http://localhost:3001/showvillas", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setShowVillas(res.data.AddedVillas);
            } catch (error) {
                console.log("ShowVillas Frontend Admin Side Error", error);
            }
        };
        FetchingVillasData();
    }, [navigate]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this villa?");
        if (confirmDelete) {
            try {
                const res = await axios.delete(`http://localhost:3001/admindelete/${id}`);
                if (res) {
                    alert(res.data.message);
                    setShowVillas(ShowVillas.filter(villa => villa._id !== id));
                }
            } catch (error) {
                console.log("Error deleting villa", error);
            }
        }
    };

    const handleUpdate = (id) => {
        navigate(`/update-villa/${id}`);
    };

    // Pagination Logic
    const indexOfLastVilla = currentPage * villasPerPage;
    const indexOfFirstVilla = indexOfLastVilla - villasPerPage;
    const currentVillas = ShowVillas.slice(indexOfFirstVilla, indexOfLastVilla);

    const totalPages = Math.ceil(ShowVillas.length / villasPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="page" id='allVillas'>
            <div className="add_villas">
                <span><Link to={"/addvillas"}>Add Villas</Link></span>
            </div>

            <h1>ALL VILLAS</h1>
            <p>{ShowVillas.length} Properties</p>

            <div className="villasContainer">
                {
                    currentVillas.length > 0 ? (
                        currentVillas.map((element) => (
                            <div className="card" key={element._id}>
                                <img src={`http://localhost:3001/Images/` + element.image} alt={element.name} />
                                <div className="location_text">
                                    <span>
                                        <CiLocationOn />
                                        {element.location}
                                    </span>
                                    <span>
                                        {element.category === "Mountains" ? <FaMountainSun /> : <TbBeach />}
                                    </span>
                                    <span>{element.category}</span>
                                </div>
                                <div className="title_text">{element.name}</div>
                                <div className="specifications">
                                    <div className="spec">
                                        <IoIosPeople />
                                        <span>{element.guests}</span> Guests
                                    </div>
                                    <div className="spec">
                                        <FaBed />
                                        <span>{element.bedrooms}</span> Bedrooms
                                    </div>
                                    <div className="spec">
                                        <BiArea />
                                        <span>{element.squareMeter}</span> Area
                                    </div>
                                    <div className="spec">
                                        <FaBath />
                                        <span>{element.bathrooms}</span> Bathrooms
                                    </div>
                                </div>
                                <div className="buttons">
                                    <button
                                        onClick={() => handleDelete(element._id)}
                                        style={{ background: "red" }}
                                    >
                                        Delete
                                    </button>
                                    <button onClick={() => handleUpdate(element._id)}>Update</button>
                                </div>
                                <div className="badge">
                                    From <span>${element.dailyRent} / Day </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-bookings">No Villas Available.</p>
                    )
                }
            </div>

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button className="pagination-button"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    &laquo; Previous
                </button>

                <span className="pagination-span">Page {currentPage} of {totalPages}</span>
                
                <button className="pagination-button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next &raquo;
                </button>
            </div>

        </div>
    );
};












// ---------------------------------------------------------------- Without Pagination ----------------------------------------------------------------
// import axios from "axios"
// import { useEffect, useState } from "react"
// import "./ShowVillas.css"

// // React Icons 
// import { IoIosPeople } from "react-icons/io";
// import { FaBed } from "react-icons/fa";
// import { BiArea } from "react-icons/bi";
// import { FaBath } from "react-icons/fa6";
// import { CiLocationOn } from "react-icons/ci";
// import { FaMountainSun } from "react-icons/fa6";
// import { TbBeach } from "react-icons/tb";
// import { Link, useNavigate } from "react-router-dom";

// export const ShowVillas = () => {

//     const [ShowVillas, setShowVillas] = useState("")
//     const navigate = useNavigate();

//     useEffect(() => {

//         const token = sessionStorage.getItem("AdminAccessToken");
//         if (!token) {
//             navigate("/");
//             alert("Please Login To Proceed...");
//             return;
//         }

//         const FetchingVillasData = async () => {
//             try {
//                 const res = await axios.get("http://localhost:3001/showvillas" , {
//                         headers: { Authorization: `Bearer ${token}` }
//                 });
//                 // console.log(res.data.AddedVillas);
//                 setShowVillas(res.data.AddedVillas)
//             }
//             catch (error) {
//                 console.log("ShowVillas Frontend Admin Side Error", error);
//             }

//         }
//         FetchingVillasData()
//     }, [navigate])


//     // Function to delete villa
//   // Function to delete villa with confirmation pop-up
// const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this villa?");

//     if (confirmDelete) {
//         try {
//             const res = await axios.delete(`http://localhost:3001/admindelete/${id}`);
//             if (res) {
//                 alert(res.data.message);
//             }

//             // Update the state after deletion by filtering out the deleted villa
//             setShowVillas(ShowVillas.filter(villa => villa._id !== id));
//         } catch (error) {
//             console.log("Error deleting villa", error);
//         }
//     } else {
//         // Admin clicked 'No' - don't delete the villa
//         console.log("Villa deletion canceled.");
//     }
// };

// const handleUpdate=async(id)=>{
//     // alert(id);
//     navigate(`/update-villa/${id}`);
// }
//     return (
//         <>

//             <div className="page" id='allVillas'>


//                 <div className="add_villas">
//                     <span><Link to={"/addvillas"}>Add Villas</Link></span>
//                 </div>

//                 <h1>ALL VILLAS</h1>
//                 <p>{ShowVillas.length} Properties</p>
//                 <div className="villasContainer">
//                     {
//                         ShowVillas.length > 0 ? (
//                             ShowVillas.map((element) => {
//                                 return (
//                                     <>
//                                         <div className="card">
//                                             <img src={`http://localhost:3001/Images/` + element.image} alt={element.name} />
//                                             <div className="location_text">
//                                                 <span>
//                                                     <CiLocationOn />
//                                                     {element.location}
//                                                 </span>
//                                                 <span>
//                                                     {element.category === "Mountains" ? <FaMountainSun /> : <TbBeach />}
//                                                     {/* <RxDot /> */}
//                                                 </span>
//                                                 <span>{element.category}</span>
//                                             </div>
//                                             <div className="title_text">{element.name}</div>
//                                             <div className="specifications">
//                                                 <div className="spec">
//                                                     <IoIosPeople />
//                                                     <span>{element.guests}</span>
//                                                     Guests
//                                                 </div>
//                                                 <div className="spec">
//                                                     <FaBed />
//                                                     <span>{element.bedrooms}</span>
//                                                     Bedrooms
//                                                 </div>
//                                                 <div className="spec">
//                                                     <BiArea />
//                                                     <span>{element.squareMeter}</span>
//                                                     Area
//                                                 </div>
//                                                 <div className="spec">
//                                                     <FaBath />
//                                                     <span>{element.bathrooms}</span>
//                                                     Bathrooms
//                                                 </div>
//                                             </div>

//                                             <div className="buttons">
//                                                     <button onClick={() => handleDelete(element._id)}
//                                                     style={{background:"red"}}>Delete</button>
                                                    
//                                                     <button onClick={() => handleUpdate(element._id)}>Update</button>
//                                             </div>


//                                             <div className="badge">
//                                                 From <span>${element.dailyRent} / Day </span>
//                                             </div>
//                                         </div>
//                                     </>
//                                 );
//                             })

//                         ) :
//                             <p className="no-bookings">No Villas Available.</p>
//                     }

//                 </div>
//             </div>
//         </>
//     )
// }
