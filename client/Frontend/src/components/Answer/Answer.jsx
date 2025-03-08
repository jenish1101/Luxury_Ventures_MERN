import "./Answer.css"
import { useState, useEffect } from "react"
import axios from "axios"

const Answer = () => {
    const [qanswer, setqanswer] = useState([]);
    const [LoginUser, setLoginUser] = useState("");


    useEffect(() => {

        const token = sessionStorage.getItem('AccessToken');
        if (!token) {
          alert("Please Login To Proceed...");
          return
        }
        
        // Fetching answers from the server
        const answer = async () => {
            const res = await axios.get("http://localhost:3000/contact/answer",{
                headers: 
                    { Authorization: `Bearer ${token}` } 
            });
            // console.log("Res: ", res.data.question_answer);
            setqanswer(res.data.question_answer)
            // console.log(res.data.question_answer);
            
            // LoginUser(EmailID)
            // console.log(res.data.LoginUser);
            setLoginUser(res.data.LoginUser);

            
            
        }

        answer()
    }, [])


    return (
        <>
            <div className="Answer-UserQuery">
                <div className="aq-box">
                    <h5>ANSWERS OF ALL QUESTIONS WHICH IS ASKED BY YOU.</h5>
                    <div>
                    {/* && LoginUser === e.email  */}
                    {qanswer.map((e, index) => (
                            e.answer && e.answer.length > 0  && LoginUser === e.email ? (
                                <div key={e.id || `answer-${index}`} className="aq-main">
                                    <table>
                                        <tr>
                                            <th>Question:</th>
                                            <td>{e.msg}</td>
                                        </tr>
                                        <tr>
                                            <th>Answer:</th>
                                            <td>{e.answer}</td>
                                        </tr>
                                    </table>
                                </div>
                            ) : (
                                ""
                            )
                        )
                        )}      
                    </div>                  
                    
                </div>
            </div>
        </>
    )
}

export default Answer