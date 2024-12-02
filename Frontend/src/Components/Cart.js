import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { useCart, useDispatchCart } from "./contextReducer";
import axios from "axios";
import { UserOrderData } from "../utils/APIRoutes";
export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className="text-white w-100 text-center fs-3">
          The Cart is Empty!!
        </div>
      </div>
    );
  }
  const totalPrice = data.reduce((total, food) => total + food.finalPrice, 0);

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
    const orderData = {
      Email: userEmail,
      data: data,
      date: new Date(),
    };

    const response = await axios.post(UserOrderData, orderData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      dispatch({ type: "Drop" });
    }
  };
  return (
    <div>
      <div className="container text-success m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className=" fs-4  customTable text-success">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="customTable text-white">
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.data.name}</td>
                <td>{food.quantity}</td>
                <td>{food.size}</td>
                <td>{food.finalPrice}</td>
                <td>
                  <button
                    type="button"
                    className="btn p-0"
                    onClick={() => dispatch({ type: "Remove", index: index })}
                  >
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className="bg-danger rounded100%"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2 text-white">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5 " onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
