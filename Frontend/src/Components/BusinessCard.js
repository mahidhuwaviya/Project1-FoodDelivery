import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
import { AdminGeTData } from "../utils/APIRoutes";

export default function BusinessCard() {
  const navigate = useNavigate();
  // const [storePageLoad, setStorePageLoad] = useState(false);
  const [businessCardData, setBusinessCardData] = useState([]);

  useEffect(() => {
    // if (storePageLoad) {
    //   navigate("/BusinessPage");
    // }
    const handleGetAllAdminData = async () => {
      const response = await axios.get(AdminGeTData);
      // console.log(response.data);
      setBusinessCardData(response.data);
      // console.log(businessCardData);
    };
    handleGetAllAdminData();
  }, []);

  // if (businessCardData !== "null") {
  //   console.log(businessCardData);
  //  const imageUrl = `http://localhost:5000${storePageLoad.coverImgURL}`;
  // }

  return (
    <div className="container">
      <hr />
      <div className="row flex-wrap ">
        {businessCardData &&
          businessCardData.map((businessData, index) => {
            return (
              <div
                className="card m-4 "
                key={index}
                style={{ width: "18rem", maxHeight: "480px" }}

                // style={{ width: "18rem" }}
              >
                <div>
                  <img
                    src={businessData.coverImgURL}
                    className="card-img-top img-fluid"
                    alt="Place"
                    style={{
                      // width: "700px",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="card-body">
                    <h5 className="card-title">{businessData.businessName}</h5>
                    <p className="card-text">
                      {businessData.businessDescription}
                    </p>
                    <hr />
                    <a href="/BusinessPage" className="btn btn-primary">
                      visit
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
<div className="m-3">
  {/* {Array.isArray(foodCategorydata) && foodCategorydata.length > 0 ? (
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
  )} */}
  {/*  onClick={setStorePageLoad(true)} */}
</div>;
