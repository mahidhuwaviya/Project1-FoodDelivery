import admin from "../models/Admin.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { setUserToken } from "../service/auth.js";
import { v2 as cloudinary } from "cloudinary";
import Admin from "../models/Admin.js";

async function handleAdminCreateAccount(req, res) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ error: result.array() });
  }
  const file_name = req.file.path;
  // console.log(file_name);
  const salt = await bcrypt.genSalt(10);
  const secPAssword = await bcrypt.hash(req.body.password, salt);

  // Upload an image
  const uploadFile = await cloudinary.uploader
    .upload(file_name, { resource_type: "auto" })
    .catch((error) => {
      console.log("some error occured", error);
    });

  // console.log(uploadFile);

  try {
    await admin.create({
      name: req.body.name,
      password: secPAssword,
      email: req.body.email,
      roles: req.body.role,
      businessName: req.body.businessName,
      businessLocation: req.body.businessLocation,
      businessDescription: req.body.businessDescription,
      coverImgURL: uploadFile.url,
    });
    // coverImgURL: `/uploads/BusinessImage/${req.file.filename}`
    res.json({ success: true, msg: "Admin Created Successfully!" });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate email error
      return res
        .status(400)
        .json({ success: false, msg: "Email already exists." });
    }
    console.error("ERRORRRRRR::---", error);
    res.status(400).json({ success: false, error: error.message });
  }
}

async function handleAdminLogin(req, res) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ error: result.array() });
  }
  // console.log(req.body);
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  try {
    const logginUser = await admin.findOne({ email: userEmail });
    // console.log(logginUser);
    if (!logginUser) {
      return res.status(400).json({ success: false, error: "Wrong Email!!" });
    }
    // if (!logginUser.roles === req.body.role) {
    //   return res
    //     .status(400)
    //     .json({ success: false, error: " UnAuthenticated!!" });
    // }
    const pwdcompare = await bcrypt.compare(userPassword, logginUser.password);
    if (!pwdcompare) {
      return res
        .status(400)
        .json({ success: false, error: "Wrong Password!!" });
    }
    const authtoken = await setUserToken(logginUser);
    res.cookie("FoodAppToken", authtoken, {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: "Strict",
    });

    const { password, ...userWithoutPassword } = logginUser.toObject();

    return res.json({
      success: true,
      error: "Logged In Successfully",
      userWithoutPassword,
    });
  } catch (error) {
    console.error("ERRORRRRRR::---", error);
    res.status(400).json({ success: false, error: error.message });
  }
}

async function handleGetAdminData(req, res) {
  try {
    const allAdmins = await admin
      .find({})
      .select(["businessName", "businessDescription", "coverImgURL"]);
    return res.json(allAdmins);
  } catch (error) {
    console.error("ERRORRRRRR::---", error);
    res.status(400).json({ success: false, error: error.message });
  }
}

async function handleAdminDataUpdate(req, res) {
  // console.log("running", req.body);

  try {
    // console.log(req.body);
    const { name, email, businessDescription, businessLocation, businessName } =
      req.body;
    const updateData = {
      name,
      businessDescription,
      businessLocation,
      businessName,
    };
    const New_file_name = req.file ? req.file.path : null;
    // console.log("FILEPATH:  ", New_file_name);
    if (New_file_name !== null) {
      const uploadFile = await cloudinary.uploader
        .upload(New_file_name, { resource_type: "auto" })
        .catch((error) => {
          console.log("some error occured", error);
        });
      updateData.coverImgURL = uploadFile.url;
    }
    // console.log(updateData);

    const UpdateAdminData = await Admin.findOneAndUpdate(
      { email: email },
      updateData,
      { new: true }
    );
    // console.log(UpdateAdminData);
    const { password, ...userWithoutPassword } = UpdateAdminData.toObject();

    // console.log(UpdateAdminData);
    // console.log(userWithoutPassword);
    res.status(200).json({
      success: true,
      msg: "Successfully updated data",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("ERRORRRRRR::---", error);
    res.status(400).json({ success: false, error: error.message });
  }
}

async function handleAdminUpdateEmail(req, res) {
  console.log("inworking");

  try {
    // console.log(req.body);
    // console.log(req.body.AdminData.email);
    // console.log(req.body.localStoredData.email);
    const passwordbyadmin = req.body.AdminData.password;
    const OldEmail = req.body.localStoredData.email;
    const UpdatedEmail = req.body.AdminData.email;
    if (OldEmail !== UpdatedEmail) {
      const AdminData = await admin.findOne({ email: OldEmail });
      const pwdcompare = await bcrypt.compare(
        passwordbyadmin,
        AdminData.password
      );
      if (!pwdcompare) {
        return res.json({ success: false, msg: "Wrong Password!!" });
      }
      // return res.json({ success: true, error: "password Matched" });

      const UpdateAdminEmail = await Admin.findOneAndUpdate(
        { email: OldEmail },
        { email: UpdatedEmail },
        { new: true }
      );
      // console.log(UpdateAdminEmail);
      const { password, ...userWithoutPassword } = UpdateAdminEmail.toObject();
      // console.log(UpdateAdminEmail);
      // console.log(userWithoutPassword);
      res.status(200).json({
        success: true,
        msg: "Successfully updated data",
        user: userWithoutPassword,
      });
    }
  } catch (error) {
    console.error("ERRORRRRRR::---", error);
    res.status(400).json({ success: false, error: error.message });
  }
}
async function handleAdminUpdatePassword(req, res) {
  try {
  } catch (error) {
    console.error("ERRORRRRRR::---", error);
    res.status(400).json({ success: false, error: error.message });
  }
}
export {
  handleAdminCreateAccount,
  handleAdminLogin,
  handleGetAdminData,
  handleAdminDataUpdate,
  handleAdminUpdateEmail,
  handleAdminUpdatePassword,
};
// { _id: { $ne: req.params.id } }
