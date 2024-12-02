import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
// import Carousel from "../../Components/Carousel";
// import { ToastContainer } from "react-toastify";
// import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";
import BusinessCard from "../Components/BusinessCard";
import { FoodCategory, FoodItems } from "../utils/APIRoutes";

export default function Home() {
  const [Img, setImg] = useState([]);
  const [search, setSearch] = useState(" ");
  const [foodItemdata, setfoodItemdata] = useState([]);
  const [foodCategorydata, setfoodCategorydata] = useState([]);

  // useEffect(() => {
  //   const CheckCookies = () => {
  //     const cookie = Cookies.get("FoodAppToken");
  //     console.log(cookie);
  //   };
  //   CheckCookies();
  // }, []);

  const fooddata = async () => {
    try {
      const FoodItemsResponse = await axios.post(FoodItems, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const FoodCategoryResponse = await axios.post(FoodCategory, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setfoodItemdata(FoodItemsResponse.data);
      setfoodCategorydata(FoodCategoryResponse.data);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };
  // const location = useLocation();

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const resp = await axios.get(
          "https://api.unsplash.com/photos/random?count=3&query=indian+thali=food",
          {
            headers: {
              Authorization: `Client-ID VraLQPXAUPeyEPhzYaFohMOjLIQvmSNCbfKmUZmlxLg`,
            },
          }
        );

        setImg(resp.data);
      } catch (error) {
        console.error("Error fetching images from upslash", error);
      }
    };
    fetchImg();
    fooddata();
  }, []);

  // useEffect(() => {
  //   checkAuth
  // });
  // useEffect(() => {
  //   if (location.state?.showToast) {
  //     toast.success("Logged in Successfully!!");
  //   }
  // }, [location]);

  return (
    <div>
      <div className="">
        <NavBar />
        <div>
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
            style={{
              objectFit: "contain !important",
            }}
          >
            <div
              className="carousel-inner"
              style={{
                maxHeight: "600px",
              }}
            >
              <div
                className="carousel-caption "
                style={{ zIndex: "10", filter: "brightness(70%)" }}
              >
                <div className="d-flex justify-contenent-center">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  {/* <button
                    className="btn btn-outline-success text-white bg-success"
                    type="submit"
                  >
                    Search
                  </button> */}
                </div>
              </div>
              {Img.map((images, i) => (
                <div
                  className={`carousel-item ${i === 0 ? "active" : ""} `}
                  key={i}
                  style={{ filter: "brightness(30%)" }}
                >
                  <img
                    src={images.urls.regular}
                    className="d-block w-100"
                    alt={images.alt_description || "foodImg 1"}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="foodData">
          {Array.isArray(foodCategorydata) && foodCategorydata.length > 0 ? (
            foodCategorydata.map((category) => {
              return (
                <div key={category._id} className="row mb-3">
                  <div className="m-3 fs-3">{category.CategoryName}</div>
                  <hr />
                  {Array.isArray(foodItemdata) && foodItemdata.length > 0 ? (
                    foodItemdata
                      .filter(
                        (item) =>
                          item.CategoryName === category.CategoryName &&
                          item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((filterItem) => {
                        return (
                          <div
                            key={filterItem._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card foodItems={filterItem} />
                          </div>
                        );
                      })
                  ) : (
                    <div>No fooddata categories available</div>
                  )}
                </div>
              );
            })
          ) : (
            <div>No food categories available</div>
          )}
        </div>
        <BusinessCard />
        <Footer />
      </div>
    </div>
  );
}
