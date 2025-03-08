import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateVilla.css"

export const UpdateVilla = () => {
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();

  const [villaData, setVillaData] = useState({
    // Add other fields as needed
    id: "",
    name: '',
    location: '',
    category: '',
    guests: '',
    bedrooms: "",
    bathrooms: "",
    squareMeter: "",
    rating: "",
    dailyRent: "",
    src: ""
  });

  const [imageFile, setImageFile] = useState(null);  // To store image file

  // Handle image file input separately
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // For Fetch Old Data
  useEffect(() => {
    const FetchData = async () => {
      const res = await axios.get(`http://localhost:3001/adminupdate/${id}`);
      console.log(res.data.UpdateData);
      setVillaData(res.data.UpdateData);
    }
    FetchData()
  }, [id])


  // For Update Data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVillaData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

       // Append other villa data
       Object.keys(villaData).forEach((key) => {
        formData.append(key, villaData[key]);
      });
      
      // Append the image file if selected
      if (imageFile) {
        formData.append("image", imageFile);
      }

      
    try {
      const res = await axios.put(`http://localhost:3001/adminupdate/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
      });
      // console.log("Result : ", res);

      alert(res.data.message);

      // alert("Villa updated successfully!");
      navigate("/showvillas"); // Redirect after update
    } catch (error) {
      console.log("Error updating villa: ", error);
    }

  };

  return (

    <div style={{ marginTop: "100px", marginBottom: "100px" }}>

      <div className="head">
        <h1 style={{ margin: "30px 0px" }}>Update Villa - {villaData.name}</h1>

        <div className="Update_image">
          <img src={`http://localhost:3001/Images/` + villaData.image} alt={villaData.name} />
        </div>
      </div>

      <form className="villa-form" onSubmit={handleSubmit}>

        {/* File input for image upload */}
        <div className="form-group">
          <label>Image</label>
          <input type="file" name="image" onChange={handleImageChange} />
        </div>

        <div className="form-group">
          <label>Villa ID</label>

          <input
            type="number"
            name="id"
            value={villaData.id}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={villaData.name}
            onChange={handleChange}

          />
        </div>

        {/* Name Of Country  */}
        <div className="form-group">
          <label>Location(Country)</label>
          <input
            type="text"
            name="location"
            value={villaData.location}
            onChange={handleChange}

          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={villaData.category} onChange={handleChange} >
            <option value="Mountains">Mountains</option>
            <option value="Seaside">Seaside</option>
          </select>
        </div>

        <div className="form-group">
          <label>Guests</label>
          <input
            type="number"
            name="guests"
            value={villaData.guests}
            onChange={handleChange}

          />
        </div>

        <div className="form-group">
          <label>Bedrooms</label>
          <input
            type="number"
            name="bedrooms"
            value={villaData.bedrooms}
            onChange={handleChange}

          />
        </div>
        <div className="form-group">
          <label>Bathrooms</label>
          <input
            type="number"
            name="bathrooms"
            value={villaData.bathrooms}
            onChange={handleChange}

          />
        </div>
        <div className="form-group">
          <label>Square Meter</label>
          <input
            type="text"
            name="squareMeter"
            value={villaData.squareMeter}
            onChange={handleChange}

          />
        </div>
        <div className="form-group">
          <label>Rating</label>
          <input
            type="number"
            step="0.1"
            name="rating"
            value={villaData.rating}
            onChange={handleChange}

          />
        </div>

        <div className="form-group">
          <label>Daily Rent</label>
          <input
            type="text"
            name="dailyRent"
            value={villaData.dailyRent}
            onChange={handleChange}

          />
        </div>

        {/* Google Map Location  */}
        <div className="form-group">
          <label>Map Embed URL</label>
          <input
            type="text"
            name="src"
            value={villaData.src}
            onChange={handleChange}

          />
        </div>

        <button type="submit" className="submit-button">Update Villa</button>
      </form>
    </div>
  );
}
