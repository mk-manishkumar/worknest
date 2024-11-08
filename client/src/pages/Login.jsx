import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputForm from "../Components/Shared/InputForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // form function
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className="text-center text-white bg-primary reg-header">
        <h2 className="mb-5 register-header">WorkNest</h2>
      </header>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <InputForm htmlFor="email" labelText={"Email"} type={"email"} value={email} handleChange={(e) => setEmail(e.target.value)} name="email" />

          <InputForm htmlFor="password" labelText={"Password"} type={"password"} value={password} handleChange={(e) => setPassword(e.target.value)} name="password" />
          <div className="d-flex">
            <p>
              Not an User?{" "}
              <Link to="/register" className="text-decoration-none">
                Register Here
              </Link>{" "}
            </p>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
