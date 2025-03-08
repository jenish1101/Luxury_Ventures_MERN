import axios from "axios";
import { useState, useEffect } from "react";
import "./UserQuery.css";
import { useNavigate } from "react-router-dom";

const UserQuery = () => {
    const [queryData, setQueryData] = useState([]);
    const [answers, setAnswers] = useState({});

    const navigate = useNavigate();

    // Handle input change based on ObjectId (_id)
    const handleInputChange = (id, value) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [id]: value, // Store answer using _id as key
        }));
    };

    useEffect(() => {
        const token = sessionStorage.getItem("AdminAccessToken");
        if (!token) {
            navigate("/");
            alert("Please Login To Proceed...");
            return;
        }

        const fetchUserQueryData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/userquery", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setQueryData(response.data.UserQueryData);
            } catch (error) {
                console.error("Error fetching user query data:", error);
            }
        };

        fetchUserQueryData();
    }, [navigate]);

    // Handle answer submission using _id
    const handleSubmitAnswer = async (id) => {
        if (!answers[id]) {
            alert("Please Enter an Answer!");
            return;
        }

        const token = sessionStorage.getItem("AdminAccessToken");

        try {
            await axios.post(
                `http://localhost:3001/userquery/answer`,
                { id, answer: answers[id] }, // Use _id instead of email
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Answer submitted successfully!");
        } catch (error) {
            console.error("Error submitting answer:", error);
            alert("Failed to submit the answer.");
        }
    };

    return (
        <section className="user-query-section">
            <h1>User Queries</h1>
            <div className="query-list">
                {queryData.length > 0 ? (
                    queryData.map((query) => (
                        <div key={query._id} className="query-item">
                            <h3>Name: <span>{query.name}</span></h3>
                            <h3>Email: <span>{query.email}</span></h3>
                            <p>Message: <span>{query.msg}</span></p>
                            {/* If User Questioned Answer Is Already Given By me  */}
                            {query.answer ? (
                                <p>Answered: <span>{query.answer}</span></p>
                            ) : 
                            // If Answer Is Pending
                            (
                                <>

                                    <p>Answered: <span>Not yet</span></p>
                                    <div className="answer-section">
                                        <textarea
                                            style={{ resize: "none" }}
                                            placeholder="Write your answer here..."
                                            value={answers[query._id] || ""}
                                            onChange={(event) => handleInputChange(query._id, event.target.value)}
                                            className="answer-textbox"
                                        ></textarea>

                                        <button
                                            onClick={() => handleSubmitAnswer(query._id)}
                                            className="submit-answer-button"
                                        >
                                            Submit Answer
                                        </button>
                                    </div>
                                </>

                            )}
                        </div>
                    ))
                ) : (
                    <p className="no-queries">No queries available.</p>
                )}
            </div>
        </section>
    );
};

export default UserQuery;
