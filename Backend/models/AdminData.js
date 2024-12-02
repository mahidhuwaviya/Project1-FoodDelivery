import { Schema, model } from "mongoose";

const AdminDataSchema = new Schema({
  businessName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // salt: {
  //   type: String,
  // },
  roles: {
    type: String,
    required: true,
  },
});
const AdminData = model("AdminData", AdminDataSchema);

export default Admin;
