import UserOrder from "../models/userOrder.js";
import { validationResult } from "express-validator";

async function handleUserOrder(req, res) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ error: result.array() });
  }
  try {
    const { data, date, Email } = req.body;

    if (!Array.isArray(data)) {
      return res
        .status(400)
        .json({ success: false, msg: "Data must be an array" });
    }

    data.splice(0, 0, { order_date: date });
    const userEmail = await UserOrder.findOne({ email: Email });

    if (!userEmail) {
      try {
        await UserOrder.create({
          email: req.body.Email,
          order_data: [data],
        }).then(() => {
          res.json({ success: true, msg: "New User Created In UserOrder" });
        });
        return;
      } catch (error) {
        console.log(error.message);
        res.send("serverError: from userORder", error.message);
      }
    } else {
      try {
        await UserOrder.findOneAndUpdate(
          { email: Email },
          { $push: { order_data: data } }
        ).then(() => {
          res.json({ success: true, msg: "User Updated In UserOrder" });
        });
        return;
      } catch (error) {}
    }
  } catch (error) {
    console.error("Error handling user order:", error.message);
    res.status(500).send("serverError: from userOrder", error.message);
  }
}

async function handleuserMyOrderData(req, res) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ error: result.array() });
  }
  const Email = req.body.Email;
  try {
    const userMyOrderData = await UserOrder.findOne({ email: Email });
    if (!userMyOrderData) {
      return res
        .status(404)
        .json({ success: false, msg: "No orders found for this user" });
    }
    const orders = userMyOrderData.order_data;

    res.send(orders);
  } catch (error) {
    console.log(error.message);
    res.send("serverError: from userORder", error.message);
  }
}

export { handleUserOrder, handleuserMyOrderData };
