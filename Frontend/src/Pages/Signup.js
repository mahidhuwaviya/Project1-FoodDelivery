// import React, { useEffect, useState } from "react";
// import NavBar from "../Components/NavBar";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Signup() {
//   const navigate = useNavigate();

//   const [signupData, setsignupData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     location: "",
//   });

//   const [loginError, setloginError] = useState(null);

//   const handlesubmit = async (e) => {
//     e.preventDefault();
//     if (signupData.name.length <= 5 || signupData.password.length <= 5) {
//       setloginError({
//         success: false,
//         msg: "Name and password must be a maximum of 5 characters.",
//       });
//       return;
//     }
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/user/createAccount",
//         signupData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("Server Response:", response);
//       const reply = await response.data;
//       console.log("success?", reply);
//       if (reply.success) {
//         setloginError(reply);
//         console.log("reply", reply);
//       }
//     } catch (error) {
//       console.log("Error-----", error);

//       if (error.response) {
//         console.log("Response Error:", error.response.data);
//         setloginError(error.response.data);
//       } else {
//         console.log("Error", error.message);
//         setloginError({ success: false, msg: "Unknown error occurred." });
//       }
//     }
//   };

//   const handlechange = (event) => {
//     setsignupData({
//       ...signupData,
//       [event.target.name]: event.target.value,
//     });
//   };

//   useEffect(() => {
//     if (localStorage.getItem("userEmail")) navigate("/login");
//   }, []);
//   return (
//     <>
//       <NavBar />
//       <div className="container">
//         <form onSubmit={handlesubmit}>
//           <div className="form-group mb-3">
//             {loginError &&
//               (loginError.msg === "User Created Successfully!" ? (
//                 <div className="container mt-4">
//                   <div className="success alert-success">{loginError.msg}</div>
//                 </div>
//               ) : (
//                 <div className="container mt-4">
//                   <div className="alert alert-danger" role="alert">
//                     {loginError.msg}
//                   </div>
//                 </div>
//               ))}
//             <label htmlFor="exampleInputName">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={signupData.name}
//               onChange={handlechange}
//               className="form-control"
//               id="exampleInputName"
//             />
//           </div>
//           <div className="form-group mb-3">
//             <label htmlFor="exampleInputEmail">Email address</label>
//             <input
//               type="email"
//               name="email"
//               value={signupData.email}
//               onChange={handlechange}
//               className="form-control"
//               id="exampleInputEmail"
//               aria-describedby="emailHelp"
//             />
//             <small id="emailHelp" className="form-text text-muted">
//               We'll never share your email with anyone else.
//             </small>
//           </div>
//           <div className="form-group mb-3">
//             <label htmlFor="exampleInputPassword">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={signupData.password}
//               onChange={handlechange}
//               className="form-control"
//               id="exampleInputPassword"
//             />
//           </div>
//           <div className="form-group mb-3">
//             <label htmlFor="exampleInputAddress">Address</label>
//             <input
//               type="pasword"
//               name="location"
//               value={signupData.location}
//               onChange={handlechange}
//               className="form-control"
//               id="exampleInputAddress"
//             />
//           </div>
//           <button type="submit" className="btn btn-success">
//             Submit
//           </button>
//           <Link to="/login" className="m-3 btn btn-danger">
//             Already a User
//           </Link>
//         </form>
//       </div>
//     </>
//   );
// }
