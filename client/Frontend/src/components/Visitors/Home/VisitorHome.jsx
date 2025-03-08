import "./HomeVisitor.css";

const VisitorHome = () => {
  return (
    <>
    {/* For Landing Image  */}
      <div className="image-container">
        <div className="image">
          <img src="/villas/villa6.jpg" alt="Villa" />
          <div className="overlay">
            <h1 className="animate-title">BE OUR GUEST</h1>
            <p className="animate-subtitle">LIVE LIKE A KING IN OUR BEST VILLAS</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisitorHome;
