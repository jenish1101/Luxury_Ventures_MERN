import { useState } from 'react';
import "./AddVillas.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VillaForm = () => {

  const navigate = useNavigate();

  const [villa, setVilla] = useState({
    id: '',
    name: '',
    location: '',
    category: "Mountains",
    guests: '',
    bedrooms: '',
    bathrooms: '',
    squareMeter: '',
    rating: '',
    dailyRent: '',
    src: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setVilla({ ...villa, [name]: value });
  };

  // For Images 

  const [imageFile, setImageFile] = useState(null); // For storing the image file

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(villa);
    // console.log(imageFile);

    const { id, name, location, category, guests, bedrooms, bathrooms, squareMeter, rating, dailyRent, src} = villa

    if(!id || !name || !location || !category || !guests || !bedrooms || !bathrooms || !squareMeter || !rating || !dailyRent || !src){
      alert("Enter All Filleds!");
      return
    }


    const formData = new FormData();
    formData.append('id', villa.id);
    formData.append('name', villa.name);
    formData.append('location', villa.location);
    formData.append('category', villa.category);
    formData.append('guests', villa.guests);
    formData.append('bedrooms', villa.bedrooms);
    formData.append('bathrooms', villa.bathrooms);
    formData.append('squareMeter', villa.squareMeter);
    formData.append('rating', villa.rating);
    formData.append('dailyRent', villa.dailyRent);
    formData.append('src', villa.src);
    formData.append('image', imageFile);  // Append image file

    try {
      const response = await axios.post("http://localhost:3001/addvillas", formData);
      console.log(response.data);

      if (response.data.message) {
        alert(response.data.message);
      }
      if(response.data.message === "Villa Added..."){
        // alert("Villa Added...");
        navigate("/showvillas");
      }
    } catch (error) {
      console.error("Error adding villa:", error);
    }
  };

  return (
    <>

      <div className="villa-form-container">
        <h1>Add New Villa</h1>
        <form className="villa-form" onSubmit={handleSubmit}>

          {/* File input for image upload */}
          <div className="form-group">
            <label>Image</label>
            <input type="file" name="image" onChange={handleFileChange} />
          </div>

          <div className="form-group">
            <label>Villa ID</label>

            <input
              type="text"
              name="id"
              value={villa.id}
              onChange={handleChange}

            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={villa.name}
              onChange={handleChange}

            />
          </div>

          {/* Name Of Country  */}
          <div className="form-group">
            <label>Location(Country)</label>
            <input
              type="text"
              name="location"
              value={villa.location}
              onChange={handleChange}

            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={villa.category} onChange={handleChange} >
              <option value="Mountains">Mountains</option>
              <option value="Seaside">Seaside</option>
            </select>
          </div>
          <div className="form-group">
            <label>Guests</label>
            <input
              type="number"
              name="guests"
              value={villa.guests}
              onChange={handleChange}

            />
          </div>
          <div className="form-group">
            <label>Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={villa.bedrooms}
              onChange={handleChange}

            />
          </div>
          <div className="form-group">
            <label>Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={villa.bathrooms}
              onChange={handleChange}

            />
          </div>
          <div className="form-group">
            <label>Square Meter</label>
            <input
              type="text"
              name="squareMeter"
              value={villa.squareMeter}
              onChange={handleChange}

            />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <input
              type="number"
              step="0.1"
              name="rating"
              value={villa.rating}
              onChange={handleChange}

            />
          </div>

          <div className="form-group">
            <label>Daily Rent</label>
            <input
              type="text"
              name="dailyRent"
              value={villa.dailyRent}
              onChange={handleChange}

            />
          </div>

          {/* Google Map Location  */}
          <div className="form-group">
            <label>Map Embed URL</label>
            <input
              type="text"
              name="src"
              value={villa.src}
              onChange={handleChange}

            />
          </div>

          <button type="submit" className="submit-button">Add Villa</button>
        </form>
      </div>
    </>
  );
};

export default VillaForm;
