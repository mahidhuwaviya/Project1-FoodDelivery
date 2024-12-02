import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AdminUpdateEmail, UserUpdateEmail } from "../utils/APIRoutes";

export default function PasswordAndEmail() {
  const [admin, setAdmin] = useState(false);
  //   const [oldImg, setOldImg] = useState("");
  const [isUpdateEmail, setIsUpdateEmail] = useState(false);

  const [localStoredData, setLocalStoredData] = useState(null);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [AdminData, setAdminData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const GetUserData = async () => {
      try {
        const FoodUserData = await JSON.parse(
          localStorage.getItem("FoodAppUserData")
        );
        // console.log(FoodUserData.roles);
        if (FoodUserData) {
          if (
            FoodUserData.roles === "Normal" ||
            FoodUserData.roles === "NORMAL"
          ) {
            setUserData({
              email: FoodUserData.email,
            });
            setLocalStoredData({
              _id: FoodUserData._id,
              email: FoodUserData.email,
            });
          }
          if (
            FoodUserData.roles === "Admin" ||
            FoodUserData.roles === "ADMIN"
          ) {
            setAdmin(true);
            // console.log(FoodUserData);

            setAdminData({
              email: FoodUserData.email,
            });
            setLocalStoredData({
              _id: FoodUserData._id,
              email: FoodUserData.email,
            });
          }
        }
      } catch (error) {
        console.log("Error occured", error);
      }
    };

    GetUserData();
  }, []);

  const handlechange = async (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (admin) {
      setAdminData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleEditEmail = async (e) => {
    e.preventDefault();
    const dataTOsend = { userData, localStoredData };
    try {
      const response = await axios.put(UserUpdateEmail, dataTOsend, {
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
      const { user } = response.data;
      localStorage.setItem("FoodAppUserData", JSON.stringify(user));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleAdminEditEmail = async (e) => {
    e.preventDefault();
    const dataTOsend = { AdminData, localStoredData };
    try {
      // console.log(AdminData);
      const response = await axios.put(AdminUpdateEmail, dataTOsend, {
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
      const { user } = response.data;
      console.log("success", success);
      console.log("msg", msg);
      console.log("user", user);
      localStorage.setItem("FoodAppUserData", JSON.stringify(user));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <div>
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
          {admin ? (
            <div className="container-fluid">
              <div className="card p-4 w-100">
                <div className="image d-flex flex-column justify-content-center align-items-center">
                  <hr />
                  <div className="mb-3 w-100">
                    <label className="form-label">Email</label>
                    <input
                      onChange={handlechange}
                      type="email"
                      name="email"
                      value={AdminData.email}
                      className="form-control"
                    />
                  </div>
                  {isUpdateEmail && (
                    <div className="mb-3 w-100">
                      <label className="form-label">Enter password</label>
                      <input
                        onChange={handlechange}
                        type="password"
                        name="password"
                        value={AdminData.password}
                        className="form-control"
                      />
                      <small>
                        <Link to="/Updatepass"> Forgot Password</Link>
                      </small>
                    </div>
                  )}
                  {!isUpdateEmail ? (
                    <div className="d-flex mt-3 w-100 justify-content-center">
                      <button
                        className="m-3 btn btn-primary"
                        onClick={() => {
                          setIsUpdateEmail(true);
                        }}
                      >
                        Update Email
                      </button>
                      <small>
                        <Link to="/Updatepass"> Forgot Password</Link>
                      </small>
                    </div>
                  ) : (
                    <button
                      className="m-3 btn btn-primary"
                      onClick={handleAdminEditEmail}
                    >
                      Update
                    </button>
                  )}
                  <hr />
                  <div className="d-flex mt-3 w-100 justify-content-center">
                    <Link to={"/UpdateDetails"} className="m-3 btn btn">
                      EditDetails
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="container-fluid">
              <div className="card p-4 w-100">
                <div className=" d-flex flex-column justify-content-center align-items-center">
                  <div className="mb-3 w-100">
                    <label className="form-label">Email</label>
                    <input
                      onChange={handlechange}
                      type="email"
                      name="email"
                      value={userData.email}
                      className="form-control"
                    />
                  </div>
                  {isUpdateEmail && (
                    <div className="mb-3 w-100">
                      <label className="form-label">Enter password</label>
                      <input
                        onChange={handlechange}
                        type="password"
                        name="password"
                        value={userData.password}
                        className="form-control"
                      />
                      <small>
                        <Link to="/Updatepass"> Forgot Password</Link>
                      </small>
                    </div>
                  )}
                  {!isUpdateEmail ? (
                    <div className="d-flex mt-3 w-100 justify-content-center">
                      <button
                        className="m-3 btn btn-primary"
                        onClick={() => {
                          setIsUpdateEmail(true);
                        }}
                      >
                        Update Email
                      </button>
                      <Link to={"/Updatepass"} className="m-3 btn btn-primary">
                        Change Password
                      </Link>
                    </div>
                  ) : (
                    <button
                      className="m-3 btn btn-primary"
                      onClick={handleEditEmail}
                    >
                      Update
                    </button>
                  )}
                  <div className="d-flex mt-3 w-100 justify-content-center">
                    <Link to={"/UpdateDetails"} className="m-3 btn btn">
                      Edit Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
