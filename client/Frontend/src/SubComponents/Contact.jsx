import { useState } from "react";
import axios from "axios";

const SubContact = () => {

  axios.defaults.withCredentials = true;

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [msg, setmsg] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem('AccessToken');
    if (!token) {
      alert("Please Login To Proceed...");
      return
    }

    try {

      const res = await axios.post("http://localhost:3000/contact", {
        name, email, msg
      }, 
      { headers: 
        { Authorization: `Bearer ${token}` } 
      }
    );
      // console.log(res);

      if (res.data.message === "Contact Details Send...") {
        alert("Details Send Successfully...")
      }
    } catch (error) {
      console.error("contact error", error);
    }
  }

  return (
    <>
      <section id="contact_Mini">
        <div className="super_container">

          <div className="container_1">
            <h3>Let's connect</h3>
            <div>
              <p>Phone</p>
              <span>+1234567897</span>
            </div>
            <div>
              <p>Email</p>
              <span>Luxury@gmail.com</span>
            </div>
            <div>
              <p>Address</p>
              <span>House No.123 Sector A-1</span>
            </div>
            <ul>
            </ul>
          </div>

          <div className="container_2">
            <h3>We'd love to hear from you</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <input type="text" placeholder="Your Name"
                  onChange={(e) => setname(e.target.value)}
                  required
                />
                <input type="email" placeholder="Email"
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </div>
              <textarea rows="4" placeholder="Your Message..."
                style={{ resize: "none" }}
                onChange={(e) => setmsg(e.target.value)}
                required
              />
              <button type="submit" style={{cursor:"pointer"}}>SEND</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SubContact;
