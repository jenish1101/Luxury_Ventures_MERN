
const Regions = () => {
  return (
    <>
      <section id='regions'>
        <h1>OUR REGIONS</h1>
        <p>Explore our regions, each offering distinct character and amenities, from vibrant cityscapes to peaceful retreats, ensuring you find the perfect place to call home.</p>
        <div className="region_container">
        <div className="card">
         <img src="Home/region1.jpg" alt="mountains" />
         <h2>Mountains</h2>
         <p><span>90</span> Properties</p> 
        </div>
        <div className="card">
        <img src="Home/region2.jpg" alt="coastline" />
         <h2>Coastline</h2>
         <p><span>52</span> Properties</p> 
        </div>
        </div>
        </section> 
    </>
  )
}

export default Regions
