import "./Villas_Api.css"
import axios from "axios";

import { useEffect, useState } from "react";
import { IoIosPeople } from "react-icons/io";
import { FaBed } from "react-icons/fa";
import { BiArea } from "react-icons/bi";
import { FaBath } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { FaMountainSun } from "react-icons/fa6";
import { TbBeach } from "react-icons/tb";
import { Link } from "react-router-dom";

export const Villas_Api = () => {
    const [ShowVillas, setShowVillas] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const FetchingVillasData = async () => {
            try {
                const res = await axios.get("http://localhost:3000/villasapi");
                console.log(res.data.AdminSideVillas);
                setShowVillas(res.data.AdminSideVillas);
            } catch (error) {
                console.log("ShowVillas Frontend Admin Side Error", error);
            }
        };

        FetchingVillasData();
    }, []);

    // For Search Vills By Thire Name 
    const filteredVillas = ShowVillas.filter(villa =>
        villa.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="page" id="allVillas">

                <h1>All Villas</h1>
                <p>{ShowVillas.length} Properties</p>

                {/* For Search Villas By Thier Name  */}
                <div className="search_villas">
                    <input
                        type="text"
                        placeholder="Search villas by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                {/* Villas Cards For Display Villas */}
                <div className="villasContainer">
                    {filteredVillas.length > 0 ? (

                        filteredVillas.map((element) => (
                            <>
                                <Link to={`/villa/${element.id}`} className="card" key={element.id}>
                                    <div key={element._id} className="card">
                                        <img src={`http://localhost:3001/Images/${element.image}`} alt={element.name} />
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
                                        <div className="badge">
                                            From <span>${element.dailyRent} / Day</span>
                                        </div>
                                    </div>
                                </Link>
                            </>
                        ))
                    ) : (
                        <p className="no-bookings">No Villas Available.</p>
                    )}
                </div>

            </div>
        </>
    );
};
