import { Schema, model } from "mongoose";

const AdminSchema = new Schema(
  {
    name: {
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
    businessName: {
      type: String,
      required: true,
    },
    businessLocation: {
      type: String,
      required: true,
    },
    businessDescription: {
      type: String,
      required: true,
    },
    coverImgURL: {
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
  },
  { timestamps: true }
);
const Admin = model("ADMIN", AdminSchema);

export default Admin;
