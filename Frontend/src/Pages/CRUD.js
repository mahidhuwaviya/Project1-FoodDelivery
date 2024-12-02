import React, { useEffect, useState } from "react";
import axios from "axios";
import { AdminUpdateData, UserUpdateData } from "../utils/APIRoutes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";

export default function CRUD() {
  const [admin, setAdmin] = useState(false);
  const [oldImg, setOldImg] = useState("");
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [localStoredData, setLocalStoredData] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    location: "",
    email: "",
    // oldEmail: "",
  });
  const [AdminData, setAdminData] = useState({
    name: "",
    businessName: "",
    businessLocation: "",
    businessDescription: "",
    coveImgUrl: "",
    email: "",
    // oldEmail: "",
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
              name: FoodUserData.name,
              email: FoodUserData.email,
              location: FoodUserData.location,
            });
            setLocalStoredData({
              name: FoodUserData.name,
              location: FoodUserData.location,
            });
          }
          if (
            FoodUserData.roles === "Admin" ||
            FoodUserData.roles === "ADMIN"
          ) {
            setAdmin(true);
            console.log(FoodUserData);
            setOldImg(FoodUserData.coverImgURL);
            setAdminData({
              email: FoodUserData.email,
              name: FoodUserData.name,
              businessName: FoodUserData.businessName,
              businessLocation: FoodUserData.businessLocation,
              businessDescription: FoodUserData.businessDescription,
            });
            setLocalStoredData({
              name: FoodUserData.name,
              email: FoodUserData.email,
              businessName: FoodUserData.businessName,
              businessLocation: FoodUserData.businessLocation,
              businessDescription: FoodUserData.businessDescription,
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
    const Email = await JSON.parse(localStorage.getItem("FoodAppUserData"))
      .email;
    console.log(Email);
    if (admin) {
      setAdminData((prevData) => ({
        ...prevData,
        [name]: value,
        email: Email,
      }));
      setIsDataChanged(
        JSON.stringify({ ...AdminData, [name]: value, email: Email }) !==
          JSON.stringify(localStoredData)
      );
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
        email: Email,
      }));
      setIsDataChanged(
        JSON.stringify({ ...userData, [name]: value }) !==
          JSON.stringify(localStoredData)
      );
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    // console.log(isDataChanged);
    try {
      if (isDataChanged) {
        const response = await axios.put(UserUpdateData, userData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        const { success, msg } = response.data;
        if (success) {
          toast.success(msg);
        }
        const { user } = response.data;
        console.log("success", success);
        console.log("msg", msg);
        console.log("user", user);
        localStorage.setItem("FoodAppUserData", JSON.stringify(user));
        setIsDataChanged(false); // Reset the data changed flag
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleFileSubmit = (e) => {
    setAdminData((prevData) => ({
      ...prevData,
      coverImgURL: e.target.files[0],
    }));
    setIsDataChanged(true);
  };
  const handleAdminEditProfile = async (e) => {
    e.preventDefault();
    try {
      if (isDataChanged) {
        // console.log(AdminData);
        const response = await axios.put(AdminUpdateData, AdminData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        const { success, msg } = response.data;
        if (success) {
          toast.success(msg);
        }
        const { user } = response.data;
        console.log("success", success);
        console.log("msg", msg);
        console.log("user", user);
        localStorage.setItem("FoodAppUserData", JSON.stringify(user));
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     if (localStorage.getItem("Role") === "Admin") {
  //       setAdmin(true);
  //     }
  //   };
  //   checkAuth();
  // }, []);
  return (
    <div>
      <NavBar />
      <div>
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
          {admin ? (
            <div className="container-fluid">
              <div className="card p-4 w-100">
                <div className="image d-flex flex-column justify-content-center align-items-center">
                  <div className="mb-3 w-100">
                    <label className="form-label">Name</label>
                    <input
                      onChange={handlechange}
                      type="text"
                      name="name"
                      value={AdminData.name}
                      className="form-control"
                    />
                  </div>
                  {/* <div className="mb-3 w-100">
                      <label className="form-label">Email</label>
                      <input
                        onChange={handlechange}
                        type="email"
                        name="email"
                        value={AdminData.email}
                        className="form-control"
                      />
                    </div>
                   <div className="mb-3 w-100">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="form-control"
                    />
                  </div> */}
                  <div className="mb-3 w-100">
                    <label className="form-label">Business Name</label>
                    <input
                      onChange={handlechange}
                      type="text"
                      name="businessName"
                      value={AdminData.businessName}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 w-100">
                    <label className="form-label">Business Location</label>
                    <input
                      onChange={handlechange}
                      type="text"
                      name="businessLocation"
                      value={AdminData.businessLocation}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 w-100">
                    <label className="form-label">Business Description</label>
                    <input
                      onChange={handlechange}
                      type="text"
                      name="businessDescription"
                      value={AdminData.businessDescription}
                      className="form-control"
                    />
                  </div>
                  <hr />
                  <div className="mb-3 w-100">
                    <img
                      src={oldImg}
                      alt="Image"
                      style={{
                        // width: "700px",
                        height: "180px",
                        objectFit: "cover",
                      }}
                    />
                    <hr />
                    <label className="form-label">Cover Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFileSubmit}
                      name="coverImgUrl"
                    />
                  </div>
                  <div className="d-flex mt-3 w-100 justify-content-center">
                    <button
                      className="btn btn-primary"
                      onClick={handleAdminEditProfile}
                    >
                      Edit Profile
                    </button>
                  </div>
                  <div className="d-flex mt-3 w-100 justify-content-center">
                    <Link to={"/UpdateInfo"} className="m-3 btn btn">
                      Change Password and Email
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
                    <label className="form-label">Name</label>
                    <input
                      onChange={handlechange}
                      type="text"
                      name="name"
                      value={userData.name}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 w-100">
                    <label className="form-label">Location</label>
                    <input
                      onChange={handlechange}
                      type="text"
                      name="location"
                      value={userData.location}
                      className="form-control"
                    />
                  </div>
                  {/* <div className="mb-3 w-100">
                      <label className="form-label">Email</label>
                      <input
                        onChange={handlechange}
                        type="email"
                        name="email"
                        value={userData.email}
                        className="form-control"
                      />
                    </div>
                  <div className="mb-3 w-100">
               <label className="form-label">Password</label>
               <input
                 type="password"
                 placeholder="Enter your password"
                 className="form-control"
               />
             </div> */}
                  <div className="d-flex mt-3 w-100 justify-content-center">
                    <button
                      className="btn btn-primary"
                      onClick={handleEditProfile}
                    >
                      Edit Profile
                    </button>
                  </div>
                  <div className="d-flex mt-3 w-100 justify-content-center">
                    <Link to={"/UpdateInfo"} className="m-3 btn btn">
                      Change Password and Email
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

{
  /* <div className="card p-4 ">
<div className=" image d-flex flex-column justify-content-center align-items-center">
  <div className="">
    {" "}
    <label>Name</label>
    <input
      type="text"
      placeholder="Eleanor Pena"
      class="name mt-3"
    />
  </div>
  <div className="">
    {" "}
    <label>Email</label>
    <input
      type="text"
      placeholder="Eleanor Pena"
      class="name mt-3"
    />
  </div>
  <div className="">
    {" "}
    <label>Password</label>
    <input
      type="text"
      placeholder="Eleanor Pena"
      class="name mt-3"
    />
  </div>
  <div className="">
    {" "}
    <label>businessName</label>
    <input
      type="text"
      placeholder="Eleanor Pena"
      class="name mt-3"
    />
  </div>
  <div className="">
    {" "}
    <label>businessLocation</label>
    <input
      type="text"
      placeholder="Eleanor Pena"
      class="name mt-3"
    />
  </div>
  <div className="">
    {" "}
    <label>businessDescription</label>
    <input
      type="text"
      placeholder="Eleanor Pena"
      class="name mt-3"
    />
  </div>
  <div className="">
    {" "}
    <label>coverImgURL</label>
    <input
      type="file"
      placeholder="Eleanor Pena"
      class="name mt-3"
    />
  </div>
  <div class=" d-flex mt-2">
    <button class="btn1 btn-dark">Edit Profile</button>
  </div>
</div>
</div> */
}
{
  /* <div class="card p-4">
<div class=" image d-flex flex-column justify-content-center align-items-center">
  <div className="">
    {" "}
    <label>Name</label>
    <input
      type="text"
      placeholder="Eleanor Pena"
      class="name mt-3"
    />
  </div>
  <div className="">
    {" "}
    <label>Location</label>
    <input
      type="text"
      placeholder="Eleanor Pena"
      class="name mt-3"
    />
  </div>
  <div className="">
    {" "}
    <label>Email</label>
    <input
      type="text"
      placeholder="Eleanor Pena"
      class="name mt-3"
    />
  </div>
  <div className="">
    {" "}
    <label>Password</label>
    <input
      type="text"
      placeholder="Eleanor Pena"
      class="name mt-3"
    />
  </div>
  <div class=" d-flex mt-2">
    <button class="btn1 btn-dark">Edit Profile</button>
  </div>
</div>
</div> */
}
{
  /* <button class="btn btn-secondary"> 
               <img
                  src="https://i.imgur.com/wvxPV9S.png"
                  height="100"
                  width="100"
                /> 
              </button> 
              <span class="idd">@eleanorpena</span>
              <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                <span class="idd1">Oxc4c16a645_b21a</span>
                <span>
                  <i class="fa fa-copy"></i>
                </span> 
              </div> 
              <div class="d-flex flex-row justify-content-center align-items-center mt-3">
                <span class="number">
                  1069 <span class="follow">Followers</span>
                </span>
              </div>
              
              <div class="text mt-3">
                <span>
                  Eleanor Pena is a creator of minimalistic x bold graphics and
                  digital artwork.
                  <br /> Artist/ Creative Director by Day #NFT minting@ with FND
                  night.{" "}
                </span>

                <div class="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                  <span>
                    <i class="fa fa-twitter"></i>
                  </span>
                  <span>
                    <i class="fa fa-facebook-f"></i>
                  </span>
                  <span>
                    <i class="fa fa-instagram"></i>
                  </span>
                  <span>
                    <i class="fa fa-linkedin"></i>
                  </span>
                </div>
                <div class=" px-2 rounded mt-4 date ">
                  <span class="join">Joined May,2021</span>
                </div>
              </div> */
}
