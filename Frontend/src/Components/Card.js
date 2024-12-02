import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./contextReducer";

export default function Card({ foodItems }) {
  const priceOptions = Object.keys(foodItems.options[0]);
  const Priceref = useRef();

  const dispatch = useDispatchCart();
  const data = useCart();

  const [quantity, setquantity] = useState(1);
  const [size, setsize] = useState("");

  useEffect(() => {
    setsize(Priceref.current.value);
  }, []);
  useEffect(() => {}, [data]);

  const finalPrice = quantity * parseInt(foodItems.options[0][size]);

  const handleAddToCart = async () => {
    const food = data.find((item) => item.id === foodItems._id);
    if (food) {
      if (food.size === size) {
        await dispatch({
          type: "Update",
          id: foodItems._id,
          finalPrice: finalPrice,
          quantity: quantity,
          size: size,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "Add",
          id: foodItems._id,
          data: foodItems,
          quantity: quantity,
          size: size,
          finalPrice: finalPrice,
        });
        return;
      }
    }
    await dispatch({
      type: "Add",
      id: foodItems._id,
      data: foodItems,
      quantity: quantity,
      size: size,
      finalPrice: finalPrice,
    });
    return;
  };

  return (
    <div className="container">
      {" "}
      <div
        className="card m-4"
        style={{ width: "18rem", maxHeight: "480px" }}
        key={foodItems._id}
      >
        <img
          src={foodItems.img}
          className="card-img-top"
          alt="..."
          style={{ height: "180px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{foodItems.name}</h5>
          <p className="card-text">some data</p>
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setquantity(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              ref={Priceref}
              onChange={(e) => {
                setsize(e.target.value);
              }}
            >
              {priceOptions.map((data, index) => {
                return (
                  <option key={index} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5">Rs.{finalPrice}/</div>
          </div>
          <hr></hr>
          <div
            className="btn btn-success justify-center"
            onClick={handleAddToCart}
          >
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
}
