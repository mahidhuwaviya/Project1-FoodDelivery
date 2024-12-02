// import React, { useState } from "react";
// import NavBar from "../Components/NavBar";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// export default function Login() {
//   const [signupData, setsignupData] = useState({ email: "", password: "" });
//   const [loginError, setloginError] = useState(null);
//   const navigate = useNavigate();

//   const handlesubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/user/login",
//         signupData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       const reply = await response.data;
//       if (reply.success) {
//         localStorage.setItem("userEmail", signupData.email);
//         setloginError(reply);
//         navigate("/", { state: { showToast: true } });
//       }
//     } catch (error) {
//       console.log("Error-----", error);
//       if (error.response) {
//         console.log("Response Error:", error.response.data);
//         setloginError(error.response.data);
//       } else if (error.request) {
//         console.log("Request Error:", error.request);
//         setloginError({
//           success: false,
//           msg: "Network error, please try again.",
//         });
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

//   return (
//     <>
//       <div>
//         <NavBar />
//         <div className="container ">
//           <form onSubmit={handlesubmit}>
//             <div className="form-group mb-3">
//               {loginError && (
//                 <div className="container mt-4">
//                   <div className="alert alert-danger" role="alert">
//                     {loginError.error}
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="form-group mb-3">
//               <label htmlFor="exampleInputEmail">Email address</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={signupData.email}
//                 onChange={handlechange}
//                 className="form-control"
//                 id="exampleInputEmail"
//                 aria-describedby="emailHelp"
//               />
//               <small id="emailHelp" className="form-text text-muted">
//                 We'll never share your email with anyone else.
//               </small>
//             </div>
//             <div className="form-group mb-3">
//               <label htmlFor="exampleInputPassword">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={signupData.password}
//                 onChange={handlechange}
//                 className="form-control"
//                 id="exampleInputPassword"
//               />
//             </div>
//             <button type="submit" className="btn btn-success">
//               Submit
//             </button>
//             <Link to="/createAccount" className="m-3 btn btn-danger">
//               Create Account
//             </Link>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }
