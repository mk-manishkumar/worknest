import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <header className="text-center text-white bg-primary reg-header">
        <h2 className="mb-5 register-header">WorkNest</h2>
      </header>
      <div className="form-container">
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" name="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input type="email" className="form-control" name="password" />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input type="text" className="form-control" name="location" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" name="password" />
          </div>
          <div className="d-flex">
            <p>
              Already Registered?{" "}
              <Link to="/login" className="text-decoration-none">
                Login
              </Link>{" "}
            </p>
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
