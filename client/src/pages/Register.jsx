import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../Components/Shared/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import Spinner from "../Components/Shared/Spinner.jsx";
import Header from "../Components/Shared/Header.jsx";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux state
  const { loading } = useSelector((state) => state.alerts);

  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !password) {
        return toast.error("Please Provide All Fields");
      }
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
      });
      dispatch(hideLoading());
      if (data.success) {
        toast.success("Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid Form Details, Please Try Again!");
      console.log(error);
    }
  };

  return (
    <>
      <Header title="WorkNest" />

      {loading ? (
        <Spinner />
      ) : (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <InputForm htmlFor="name" labelText="Name" type="text" value={name} handleChange={(e) => setName(e.target.value)} name="name" />

            <InputForm htmlFor="email" labelText="Email" type="email" value={email} handleChange={(e) => setEmail(e.target.value)} name="email" />

            <InputForm htmlFor="password" labelText="Password" type="password" value={password} handleChange={(e) => setPassword(e.target.value)} name="password" />
            <div className="d-flex">
              <p>
                Already Registered?{" "}
                <Link to="/login" className="text-decoration-none">
                  Login
                </Link>
              </p>
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
