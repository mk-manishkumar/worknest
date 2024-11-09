import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/HomePage.css";

const HomePage = () => {
  return (
    <>
      <video autoPlay muted loop id="myVideo">
        <source src="bg.mp4" type="video/mp4" />
      </video>
      <div className="content">
        <div className="card w-25">
          <h2 className="text-primary text-center mt-2">WorkNest</h2>
          <hr />
          <div className="card-body">
            <h5 className="card-title">Indias No #1 Carrer Platform</h5>
            <p className="card-text">Search and manage your jobs with ease. free and open source job ortal application by techinfoyt</p>
            <div className="d-flex justify-content-between mt-5">
              <p>
                Not a user?{" "}
                <Link to="/register" className="text-decoration-none">
                  Register Here !
                </Link>{" "}
              </p>
              <p>
                <Link to="/login" className="myBtn">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
