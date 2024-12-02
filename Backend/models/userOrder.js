import { Schema, model } from "mongoose";
const userOrderSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  order_data: {
    type: Array,
    required: true,
  },
});

const UserOrder = model("UserOrder", userOrderSchema);

export default UserOrder;
