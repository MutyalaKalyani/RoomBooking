import React from "react";
import moment from "moment"
import AOS from 'aos';
import { Link } from "react-router-dom";
AOS.init({
    duration:'2000'
});
function Landingscreen() {
  return (
    <div className="">
      <div className="landing row justify-content-center text-center">
        <div className="col-md-9 my-auto" style={{borderRight:'8px solid white'}}>
          <h2 style={{ color: "white", fontSize: "130px" }} data-aos='zoom-in'>Welcome</h2>
          <h1 style={{ color: "white"}} data-aos='zoom-out' >Feel the difference.</h1>
          <Link to="/home">
             <button className='btn btn-primary'>Get Started</button>
          </Link>
        </div>

        
        
      </div>
     
    </div>
  );
}

export default Landingscreen;
