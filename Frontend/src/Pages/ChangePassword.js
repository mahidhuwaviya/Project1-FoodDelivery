import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import {
  AdminUpdatePassword,
  AdminUpdatePasswordEmailVerification,
  AdminUpdatePasswordOptVerification,
  UserUpdatePassword,
  UserUpdatePasswordEmailVerification,
  UserUpdatePasswordOptVerification,
} from "../utils/APIRoutes";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
// import { Link } from "react-router-dom";

export default function ChangePassword() {
  const [admin, setAdmin] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [userEmailVerification, setUserEmailVerification] = useState({
    email: "",
  });
  const [userOTPVerification, setUserOTPVerification] = useState({
    OTP: "",
  });
  const [userResetPassword, setUserResetPassword] = useState({
    password: "",
  });
  const [AdminEmailVerification, setAdminEmailVerification] = useState({
    email: "",
  });
  const [AdminOTPVerification, setAdminOTPVerification] = useState({
    OTP: "",
  });
  const [AdminResetPassword, setAdminResetPassword] = useState({
    password: "",
  });
  const handlechange = async (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (admin) {
      setAdminEmailVerification((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setUserEmailVerification((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleOTPchange = async (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (admin) {
      setAdminOTPVerification((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setUserOTPVerification((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleResetPasswordchange = async (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (admin) {
      setAdminResetPassword((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setUserResetPassword((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleEmailVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        UserUpdatePasswordEmailVerification,
        userEmailVerification,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      const { success, msg } = response.data;
      if (success) {
        toast.success(msg);
      } else {
        toast.error(msg);
      }
      setIsEmailVerified(success);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleOTPVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        UserUpdatePasswordOptVerification,
        userOTPVerification,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      const { success, msg } = response.data;
      if (success) {
        toast.success(msg);
      } else {
        toast.error(msg);
      }
      setIsOTPVerified(success);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(UserUpdatePassword, userResetPassword, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response.data);
      const { success, msg } = response.data;
      if (success) {
        toast.success(msg);
      } else {
        toast.error(msg);
      }
      setIsOTPVerified(success);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleAdminEmailVerification = async (e) => {
    e.preventDefault();
    try {
      // console.log(AdminData);
      const response = await axios.post(
        AdminUpdatePasswordEmailVerification,
        AdminEmailVerification,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      const { success, msg } = response.data;
      if (success) {
        toast.success(msg);
      } else {
        toast.error(msg);
      }
      setIsEmailVerified(success);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleAdminOTPVerification = async (e) => {
    e.preventDefault();
    try {
      // console.log(AdminData);
      const response = await axios.post(
        AdminUpdatePasswordOptVerification,
        AdminOTPVerification,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      const { success, msg } = response.data;
      if (success) {
        toast.success(msg);
      } else {
        toast.error(msg);
      }
      setIsOTPVerified(success);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleAdminResetPassword = async (e) => {
    e.preventDefault();
    try {
      // console.log(AdminData);
      const response = await axios.post(
        AdminUpdatePassword,
        AdminResetPassword,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      const { success, msg } = response.data;
      if (success) {
        toast.success(msg);
      } else {
        toast.error(msg);
      }
      setIsOTPVerified(success);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    const GetUserData = async () => {
      try {
        const FoodUserData = await JSON.parse(
          localStorage.getItem("FoodAppUserData")
        );
        if (FoodUserData) {
          if (
            FoodUserData.roles === "Admin" ||
            FoodUserData.roles === "ADMIN"
          ) {
            setAdmin(true);
          }
        }
      } catch (error) {
        console.log("Error occured", error);
      }
    };

    GetUserData();
  }, []);
  return (
    <div>
      <NavBar />
      <div>
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
          {admin ? (
            <div className="container-fluid">
              <div className="card p-4 w-100">
                {!isOTPVerified ? (
                  <div className="image d-flex flex-column justify-content-center align-items-center">
                    <div className="mb-3 w-100">
                      <label className="form-label">Email</label>
                      <input
                        onChange={handlechange}
                        type="email"
                        name="email"
                        placeholder="Enter Your Email Address"
                        value={AdminEmailVerification.email}
                        className="form-control"
                      />
                    </div>
                    {isEmailVerified && (
                      <div className="mb-3 w-100">
                        <label className="form-label">Email</label>
                        <input
                          onChange={handleOTPchange}
                          type="text"
                          name="OTP"
                          placeholder="Enter OTP"
                          value={AdminOTPVerification.OTP}
                          className="form-control"
                        />
                      </div>
                    )}
                    {!isEmailVerified ? (
                      <div className="d-flex mt-3 w-100 justify-content-center">
                        <button
                          className="m-3 btn btn-primary"
                          onClick={handleAdminEmailVerification}
                        >
                          Next
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex mt-3 w-100 justify-content-center">
                        <button
                          className="m-3 btn btn-primary"
                          onClick={handleAdminOTPVerification}
                        >
                          Verify OTP
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="mb-3 w-100">
                      <label className="form-label">Reset Password</label>
                      <input
                        onChange={handleResetPasswordchange}
                        type="password"
                        name="password"
                        placeholder="Enter new password"
                        value={AdminResetPassword.password}
                        className="form-control"
                      />
                    </div>
                    <div className="d-flex mt-3 w-100 justify-content-center">
                      <button
                        to={"/UpdateDetails"}
                        className="m-3 btn btn-primary"
                        onClick={handleAdminResetPassword}
                      >
                        Reset Password
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="container-fluid">
              <div className="card p-4 w-100">
                {!isOTPVerified ? (
                  <div className=" d-flex flex-column justify-content-center align-items-center">
                    <div className="mb-3 w-100">
                      <label className="form-label">Email</label>
                      <input
                        onChange={handlechange}
                        type="email"
                        name="email"
                        placeholder="Enter Your Email Address"
                        value={userEmailVerification.email}
                        className="form-control"
                      />
                    </div>
                    {isEmailVerified && (
                      <div className="mb-3 w-100">
                        <label className="form-label">Otp</label>
                        <input
                          onChange={handleOTPchange}
                          type="text"
                          name="OTP"
                          placeholder="Enter OTP"
                          value={userOTPVerification.OTP}
                          className="form-control"
                        />
                      </div>
                    )}
                    {!isEmailVerified ? (
                      <div className="d-flex mt-3 w-100 justify-content-center">
                        <button
                          className="m-3 btn btn-primary"
                          onClick={handleEmailVerification}
                        >
                          Next
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex mt-3 w-100 justify-content-center">
                        <button
                          className="m-3 btn btn-primary"
                          onClick={handleOTPVerification}
                        >
                          Verify OTP
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="mb-3 w-100">
                      <label className="form-label">Reset Password</label>
                      <input
                        onChange={handleResetPasswordchange}
                        type="password"
                        name="password"
                        placeholder="Enter new password"
                        value={userResetPassword.password}
                        className="form-control"
                      />
                    </div>
                    <div className="d-flex mt-3 w-100 justify-content-center">
                      <button
                        to={"/UpdateDetails"}
                        className="m-3 btn btn-primary"
                        onClick={handleResetPassword}
                      >
                        Reset Password
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
