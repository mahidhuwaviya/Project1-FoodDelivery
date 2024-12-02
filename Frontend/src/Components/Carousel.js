import React, { useEffect, useState } from "react";
import axios from "axios";
import { UnsplashCarouselImages } from "../utils/APIRoutes";
import { Unsplash_API_KEY } from "../utils/APIKEY";
export default function Carousel() {
  const [Img, setImg] = useState([]);
  useEffect(() => {
    async function fetchImg(params) {
      try {
        const resp = await axios.get(UnsplashCarouselImages, {
          headers: {
            Authorization: `Client-ID ${Unsplash_API_KEY}`,
          },
        });
        console.log(resp.data);
        setImg(resp.data);
      } catch (error) {
        console.error("Error fetching images from upslash", error);
      }
    }
    fetchImg();
  }, []);
  return (
    <div>
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
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button>
              </form>
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
    </div>
  );
}
