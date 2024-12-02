import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import Model from "../Model";
import Cart from "./Cart";
import { useCart } from "./contextReducer";
import { CheckCookieLogin, ClearCookieLogout } from "../utils/APIRoutes";

export default function NavBar() {
  const data = useCart();
  const [cartView, setcartView] = useState(false);
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();
  const [isAuthenticated, setisAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const FoodUserData = await JSON.parse(
        localStorage.getItem("FoodAppUserData")
      );
      if (FoodUserData) {
        if (FoodUserData.roles == "Admin" || FoodUserData.roles == "ADMIN") {
          setAdmin(true);
        }
      }
      try {
        const response = await axios.get(CheckCookieLogin, {
          withCredentials: true,
        });
        // console.log(response);
        setisAuthenticated(response.data[0]);
        const userData = await JSON.parse(
          localStorage.getItem("FoodAppUserData")
        );
        if (userData) {
          if (userData.roles === "Admin") {
            setAdmin(true);
          }
        }
        // console.log("useEffect isLogin:", isAuthenticated);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };
    checkAuth();
  }, []);

  const userlogout = async () => {
    try {
      const response = await axios.get(ClearCookieLogout, {
        withCredentials: true,
      });
      setisAuthenticated(response.data[0]);
      localStorage.removeItem("FoodAppUserData");
      navigate("/");
    } catch (error) {
      console.error("error clearing cookies", error);
    }
  };
  return (
    <div>
      {/* {console.log("useEffect isLogin from return:", isAuthenticated)} */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            Food
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/Signpp"
                >
                  signinnn
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/Signuup"
                >
                  signuppp
                </Link>
              </li> */}
              {isAuthenticated ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {isAuthenticated ? (
              <div>
                <div
                  className="btn bg-white text-success mx-1 me-auto mb-2 mb-lg-0"
                  onClick={() => {
                    setcartView(true);
                  }}
                >
                  My Cart
                  {data.length > 0 && (
                    <Badge pill bg="danger" className="mx-2">
                      {data.length}
                    </Badge>
                  )}
                </div>
                {cartView && (
                  <Model
                    onClose={() => {
                      setcartView(false);
                    }}
                  >
                    <Cart></Cart>
                  </Model>
                )}
                {admin ? (
                  <div className="btn bg-white text-success mx-1 me-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown list-unstyled">
                      <a
                        className="nav-link dropdown-toggle"
                        href="/"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Edit
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <a className="dropdown-item" href="/UpdateDetails">
                            Edit Business Details
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/UpdateInfo">
                            Privacy and Security
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a className="dropdown-item" href="/">
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </li>
                  </div>
                ) : (
                  <div className="btn bg-white text-success mx-1 me-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown list-unstyled">
                      <a
                        className="nav-link dropdown-toggle"
                        href="/"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Edit
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <a className="dropdown-item" href="/UpdateDetails">
                            Edit Details
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/UpdateInfo">
                            Privacy and Security
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a className="dropdown-item" href="/">
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </li>
                  </div>
                )}
                <div
                  className="btn bg-white text-danger mx-1 me-auto mb-2 mb-lg-0"
                  onClick={userlogout}
                >
                  Logout
                </div>
              </div>
            ) : (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link
                  className="btn bg-white text-success mx-1"
                  to="/createAccount"
                >
                  Signup
                </Link>
              </div>
              //whenever i logout and i go to the login page it still shows the my order and logout
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
