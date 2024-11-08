import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputForm from "../Components/Shared/InputForm";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // form function
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(name, email, password);
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
          <InputForm htmlFor="name" labelText={"Name"} type={"text"} value={name} handleChange={(e) => setName(e.target.value)} name="name" />

          <InputForm htmlFor="email" labelText={"Email"} type={"email"} value={email} handleChange={(e) => setEmail(e.target.value)} name="email" />

          <InputForm htmlFor="password" labelText={"Password"} type={"password"} value={password} handleChange={(e) => setPassword(e.target.value)} name="password" />
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
