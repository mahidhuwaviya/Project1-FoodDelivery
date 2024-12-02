import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AdminCreateAccount, UserCreateAccount } from "../utils/APIRoutes";
import { ToastContainer } from "react-toastify";

export default function SignUP() {
  const [admin, setAdmin] = useState(false);
  // const [user, setUser] = useState(false);

  const navigate = useNavigate();

  const [signupData, setsignupData] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
    businessLocation: "",
    businessDescription: "",
    coverImgURL: null,
    role: "",
  });
  console.log(signupData);

  const [loginError, setloginError] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(UserCreateAccount, signupData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const reply = await response.data;
      if (reply.success) {
        localStorage.setItem("userEmail", signupData.email);
        setloginError(reply);
        navigate("/", { state: { showToast: true } });
      }
    } catch (error) {
      console.log("Error-----", error);
      if (error.response) {
        console.log("Response Error:", error.response.data.error[0].msg);
        setloginError(error.response.data.error[0].msg);
      }
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    console.log(signupData);
    const formData = new FormData();
    // Append each form field to FormData
    for (const key in signupData) {
      formData.append(key, signupData[key]);
    }
    // for (let pair of formData.entries()) {
    //   if (pair[0] === "coverImgURL") {
    //     console.log(pair);
    //   }
    //   console.log(pair[0] + ": " + pair[1]);
    // }
    try {
      const response = await axios.post(AdminCreateAccount, signupData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      const reply = await response.data;
      if (reply.success) {
        localStorage.setItem("userEmail", signupData.email);
        localStorage.setItem("userEmail", signupData.role);

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
  const handleFileSubmit = (e) => {
    setsignupData({ ...signupData, coverImgURL: e.target.files[0] });
  };
  const handlechange = (event) => {
    if (admin) {
      setsignupData({
        ...signupData,
        [event.target.name]: event.target.value,
        role: "Admin",
        // coverImg:event.target.files[0]
      });
    } else {
      setsignupData({
        ...signupData,
        [event.target.name]: event.target.value,
        role: "Normal",
      });
    }
  };

  //   useEffect(() => {
  //     if (localStorage.getItem("userEmail")) navigate("/login");
  //   }, []);
  return (
    <>
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
      <ToastContainer />
      <div className="form-group mb-3">
        {loginError &&
          (loginError === "User Created Successfully!" ? (
            <div className="container mt-4">
              <div className="success alert-success">{loginError}</div>
            </div>
          ) : (
            <div className="container mt-4">
              <div className="alert alert-danger" role="alert">
                {loginError}
              </div>
            </div>
          ))}
      </div>
      {admin ? (
        <div className="container">
          <p> Creating Account as admin</p>
          <form onSubmit={handleAdminSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="exampleInputName">Name</label>
              <input
                type="text"
                name="name"
                value={signupData.name}
                onChange={handlechange}
                className="form-control"
                id="exampleInputName"
              />
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
            <div className="form-group mb-3">
              <label htmlFor="exampleInputBusinessName">Business Name</label>
              <input
                type="pasword"
                name="businessName"
                value={signupData.businessName}
                onChange={handlechange}
                className="form-control"
                id="exampleInputBusinessName"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="exampleInputAddress">Business Address</label>
              <input
                type="pasword"
                name="businessLocation"
                value={signupData.businessLocation}
                onChange={handlechange}
                className="form-control"
                id="exampleInputAddress"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="exampleInputDescription">
                Business Description
              </label>
              <input
                type="pasword"
                name="businessDescription"
                value={signupData.businessDescription}
                onChange={handlechange}
                className="form-control"
                id=""
              />
              <small id="emailHelp" className="form-text text-muted">
                This Description will be shown
              </small>
            </div>
            <div className="mb-3">
              <label htmlFor="coverImg" className="form-label">
                Cover Img
              </label>
              <input
                type="file"
                className="form-control"
                id="coverImgURL"
                aria-describedby="coverImgURL"
                name="coverImgURL"
                onChange={handleFileSubmit}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
            <Link to="/login" className="m-3 btn btn-danger">
              Already a User
            </Link>
          </form>
        </div>
      ) : (
        <div className="container">
          <p> Creating Account as user</p>

          <form onSubmit={handlesubmit}>
            <div className="form-group mb-3">
              <label htmlFor="exampleInputName">Name</label>
              <input
                type="text"
                name="name"
                value={signupData.name}
                onChange={handlechange}
                className="form-control"
                id="exampleInputName"
              />
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
            <div className="form-group mb-3">
              <label htmlFor="exampleInputAddress">Address</label>
              <input
                type="pasword"
                name="location"
                value={signupData.location}
                onChange={handlechange}
                className="form-control"
                id="exampleInputAddress"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
            <Link to="/login" className="m-3 btn btn-danger">
              Already a User
            </Link>
          </form>
        </div>
      )}
    </>
  );
}

{
  /* <div className="form-group mb-3">
{loginError &&
  (loginError.msg === "User Created Successfully!" ? (
    <div className="container mt-4">
      <div className="success alert-success">
        {loginError.msg}
      </div>
    </div>
  ) : (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        {loginError.msg}
      </div>
    </div>
  ))}
</div> */
}
