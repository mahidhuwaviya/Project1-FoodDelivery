import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { UserMyOrder } from "../utils/APIRoutes";

export default function MyOrder() {
  const [orderData, setMyOrderData] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      const userEmail = localStorage.getItem("userEmail");
      const email = {
        Email: userEmail,
      };
      try {
        const response = await axios.post(UserMyOrder, email, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setMyOrderData(response.data);
      } catch (error) {
        console.log("ERORR___---", error);
      }
    };
    fetchOrderData();
  }, []);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="container">
        <div className="row"></div>
        <div className="row">
          {orderData.length !== 0 ? (
            Object.keys(orderData).map((key) => {
              const date = new Date(orderData[0][0].order_date);
              const daysOfWeek = [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
              ];
              const months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ];

              const monthName = months[date.getMonth()];
              const dayName = daysOfWeek[date.getDay()];
              return (
                <div className="container">
                  <div>{`${monthName} ${dayName} ${date.getDate()} ${date.getFullYear()}`}</div>
                  {orderData[key].slice(1).map((item, index) => (
                    <>
                      <div key={index}>
                        <hr />
                        <div
                          className="card mt-3"
                          style={{ width: "17rem", maxHeight: "480px" }}
                        >
                          <img
                            src={item.data.img}
                            className="card-img-top"
                            alt="..."
                            style={{ height: "180px", objectFit: "fill" }}
                          />
                          <div className="card-body p-0 m-3">
                            <h5 className="card-title m-1">{item.data.name}</h5>
                            <div
                              className="container w-100 p-0"
                              style={{ height: "38px" }}
                            >
                              <span className="m-1">
                                Quantity:{item.quantity}
                              </span>
                              <span className="m-1">size:{item.size}</span>
                              <div className="d-inline ms-2 h-100 w-20 fs-5">
                                Rs.{item.finalPrice}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                  <div className="m-2">
                    Total Price:
                    {` ${orderData[key]
                      .slice(1)
                      .reduce(
                        (totalPrice, item) => totalPrice + item.finalPrice,
                        0
                      )}`}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="m-auto mt-5">No orders found</div>
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
