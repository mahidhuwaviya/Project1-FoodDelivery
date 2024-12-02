import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { AdminLogin, UserLogin } from "../utils/APIRoutes";

export default function SignIN() {
  const [admin, setAdmin] = useState(false);
  const [signupData, setsignupData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [loginError, setloginError] = useState(null);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(UserLogin, signupData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const reply = await response.data;
      if (reply.success) {
        localStorage.setItem(
          "FoodAppUserData",
          JSON.stringify(response.data.userWithoutPassword)
        );
        setloginError(reply);
        navigate("/", { state: { showToast: true } });
      }
    } catch (error) {
      console.log("Error-----", error);
      if (error.response) {
        console.log("Response Error:", error.response.data);
        setloginError(error.response.data);
      } else if (error.request) {
        console.log("Request Error:", error.request);
        setloginError({
          success: false,
          msg: "Network error, please try again.",
        });
      } else {
        console.log("Error", error.message);
        setloginError({ success: false, msg: "Unknown error occurred." });
      }
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(AdminLogin, signupData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response);
      const reply = await response.data;
      if (reply.success) {
        localStorage.setItem(
          "FoodAppUserData",
          JSON.stringify(response.data.userWithoutPassword)
        );
        setloginError(reply);
        navigate("/", { state: { showToast: true } });
      }
    } catch (error) {
      console.log("Error-----", error);
      if (error.response) {
        console.log("Response Error:", error.response.data);
        setloginError(error.response.data);
      } else if (error.request) {
        console.log("Request Error:", error.request);
        setloginError({
          success: false,
          msg: "Network error, please try again.",
        });
      } else {
        console.log("Error", error.message);
        setloginError({ success: false, msg: "Unknown error occurred." });
      }
    }
  };

  const handlechange = (event) => {
    if (admin) {
      setsignupData({
        ...signupData,
        [event.target.name]: event.target.value,
        role: "Admin",
      });
    } else {
      setsignupData({
        ...signupData,
        [event.target.name]: event.target.value,
        role: "Normal",
      });
    }
  };

  return (
    <>
      <div>
        <NavBar />
        <div className="container ">
          <button
            onClick={() => {
              setAdmin(true);
            }}
          >
            Admin
          </button>
          <button
            onClick={() => {
              setAdmin(false);
            }}
          >
            User
          </button>
        </div>
        {admin ? (
          <div className="container ">
            <p>AS admin</p>

            <form onSubmit={handleAdminSubmit}>
              <div className="form-group mb-3">
                {loginError && (
                  <div className="container mt-4">
                    <div className="alert alert-danger" role="alert">
                      {loginError.error}
                    </div>
                  </div>
                )}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={signupData.email}
                  onChange={handlechange}
                  className="form-control"
                  id="exampleInputEmail"
                  aria-describedby="emailHelp"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleInputPassword">Password</label>
                <input
                  type="password"
                  name="password"
                  value={signupData.password}
                  onChange={handlechange}
                  className="form-control"
                  id="exampleInputPassword"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
              <Link to="/createAccount" className="m-3 btn btn-danger">
                Create Account
              </Link>
            </form>
          </div>
        ) : (
          <div className="container ">
            <p>AS user</p>
            <form onSubmit={handlesubmit}>
              <div className="form-group mb-3">
                {loginError && (
                  <div className="container mt-4">
                    <div className="alert alert-danger" role="alert">
                      {loginError.error}
                    </div>
                  </div>
                )}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={signupData.email}
                  onChange={handlechange}
                  className="form-control"
                  id="exampleInputEmail"
                  aria-describedby="emailHelp"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleInputPassword">Password</label>
                <input
                  type="password"
                  name="password"
                  value={signupData.password}
                  onChange={handlechange}
                  className="form-control"
                  id="exampleInputPassword"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
              <Link to="/createAccount" className="m-3 btn btn-danger">
                Create Account
              </Link>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
