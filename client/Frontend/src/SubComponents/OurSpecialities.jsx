import { useState } from "react";
import { SiWeightsandbiases } from "react-icons/si";
import { MdFitnessCenter, MdElectricCar, MdOutlinePets } from "react-icons/md";
import { FaSailboat } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";

const OurSpecialities = () => {
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);

  const specialities = [
    {
      id: 1,
      title: "Seafront",
      icon: <SiWeightsandbiases />,
      subText: "Have a look",
      content: {
        text: "Experience the serene beauty of our seafront properties with breathtaking views of the ocean.",
        images: [
          "../../public/ourSpecialities/sea1.jpg",
          "../../public/ourSpecialities/sea2.jpg",
          "../../public/ourSpecialities/sea3.jpg",
        ],
      },
    },
    {
      id: 2,
      title: "Pet Friendly",
      icon: <MdOutlinePets />,
      subText: "Pets allowed",
      content: {
        text: "Enjoy your vacation with your furry friends at our pet-friendly properties.",
        images: [
          "../../public/ourSpecialities/pet1.jpg",
          "../../public/ourSpecialities/pet3.jpg",
          "../../public/ourSpecialities/pet2.jpg",
        ],
      },
    },
    {
      id: 3,
      title: "Electric Car",
      icon: <MdElectricCar />,
      subText: "Change your car",
      content: {
        text: "Stay at our properties equipped with electric car charging facilities.",
        images: [
          "../../public/ourSpecialities/car1.jpg",
          "../../public/ourSpecialities/car2.jpg",
          "../../public/ourSpecialities/car3.jpg",
        ],
      },
    },
    {
      id: 4,
      title: "Fitness/Gym",
      icon: <MdFitnessCenter />,
      subText: "Work out",
      content: {
        text: "Maintain your fitness routine with our on-site gym and fitness facilities.",
        images: [
          "../../public/ourSpecialities/gym1.jpg",
          "../../public/ourSpecialities/gym2.jpg",
          "../../public/ourSpecialities/gym3.jpg",
        ],
      },
    },
    {
      id: 5,
      title: "Boat Morning",
      icon: <FaSailboat />,
      subText: "Take a trip",
      content: {
        text: "Start your mornings with a peaceful boat ride at our properties.",
        images: [
          "../../public/ourSpecialities/boat1.jpg",
          "../../public/ourSpecialities/boat2.jpg",
          "../../public/ourSpecialities/boat3.jpg",
        ],
      },
    },
  ];

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        marginBottom: "50px",
      }}
    >
      <h1>OUR PROPERTIES SPECIALITIES</h1>
      <div  
          style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {specialities.map((element) => (
          <div
            key={element.id}
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              padding: "20px",
              margin: "10px",
              transition: "transform 0.3s ease",
              width: "30%",
              textAlign: "center",
              transform: selectedSpeciality === element.id ? "scale(1.05)" : "none",
              borderColor: selectedSpeciality === element.id ? "#007bff" : "#ccc",
            }}
            onClick={() => setSelectedSpeciality(element.id)}
          >
            <div>{element.icon}</div>
            <h2>{element.title}</h2>
            <p>
              {element.subText} <FaLongArrowAltRight />
            </p>
          </div>
        ))}
      </div>
      {selectedSpeciality && (
        <div style={{ marginTop: "20px" }}>
          <h2>{specialities.find((s) => s.id === selectedSpeciality).title}</h2>
          <p>{specialities.find((s) => s.id === selectedSpeciality).content.text}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "baseline",
              paddingTop: "30px",
              cursor: "pointer",
            }}
          >
            {specialities
              .find((s) => s.id === selectedSpeciality)
              .content.images.map((img, index) => (
                <img
                  key={index}
                  src={`/images/${img}`}
                  alt={img}
                  style={{
                    width: "33%",
                    height: "250px",
                    marginRight: "10px",
                    borderRadius: "5px",
                  }}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OurSpecialities;
