import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../Components/Shared/InputForm";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import Spinner from "../Components/Shared/Spinner.jsx";
import Header from "../Components/Shared/Header.jsx";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const { loading } = useSelector((state) => state.alerts);

  // Form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      dispatch(hideLoading());
      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success("Login Successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid Credentials, Please try again!");
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
            <InputForm htmlFor="email" labelText="Email" type="email" value={email} handleChange={(e) => setEmail(e.target.value)} name="email" />

            <InputForm htmlFor="password" labelText="Password" type="password" value={password} handleChange={(e) => setPassword(e.target.value)} name="password" />
            <div className="d-flex">
              <p>
                Not a User?{" "}
                <Link to="/register" className="text-decoration-none">
                  Register Here
                </Link>
              </p>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
