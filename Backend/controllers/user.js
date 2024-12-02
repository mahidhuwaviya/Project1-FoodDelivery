import User from "../models/user.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodmailer from "nodemailer";
import jwt from "jsonwebtoken";
import {
  getUserResetPasswordToken,
  setUserResetPassswordToken,
  setUserToken,
} from "../service/auth.js";

async function handleUserCreateAccount(req, res) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ error: result.array() });
  }
  const salt = await bcrypt.genSalt(10);
  const secPAssword = await bcrypt.hash(req.body.password, salt);
  try {
    await User.create({
      name: req.body.name,
      password: secPAssword,
      email: req.body.email,
      location: req.body.location,
    });
    res.json({ success: true, msg: "User Created Successfully!" });
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

async function handleUserLogin(req, res) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ error: result.array() });
  }
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  try {
    const logginUser = await User.findOne({ email: userEmail });
    if (!logginUser) {
      return res.status(400).json({ success: false, error: "Wrong Email!!" });
    }
    const pwdcompare = await bcrypt.compare(userPassword, logginUser.password);
    if (!pwdcompare) {
      return res
        .status(400)
        .json({ success: false, error: "Wrong Password!!" });
    }

    const authtoken = await setUserToken(logginUser);
    res.cookie("FoodAppToken", authtoken);
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

async function handleUserDataUpdate(req, res) {
  const { name, email, location } = req.body;
  // console.log(req.body);
  try {
    const UpdateUserData = await User.findOneAndUpdate(
      { email: email },
      {
        name,
        location,
      },
      { new: true }
    );
    const { password, ...userWithoutPassword } = UpdateUserData.toObject();

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

async function handleUserUpdateEmail(req, res) {
  console.log("inworking");

  try {
    // console.log(req.body);
    // console.log(req.body.userData.email);
    // console.log(req.body.localStoredData.email);
    const passwordbyuser = req.body.userData.password;
    const OldEmail = req.body.localStoredData.email;
    const UpdatedEmail = req.body.userData.email;
    if (OldEmail !== UpdatedEmail) {
      const UserData = await User.findOne({ email: OldEmail });
      const pwdcompare = await bcrypt.compare(
        passwordbyuser,
        UserData.password
      );
      if (!pwdcompare) {
        return res.json({ success: false, msg: "Wrong Password!!" });
      }
      // return res.json({ success: true, error: "password Matched" });

      const UpdateUSerEmail = await User.findOneAndUpdate(
        { email: OldEmail },
        { email: UpdatedEmail },
        { new: true }
      );
      // console.log(UpdateUSerEmail);
      const { password, ...userWithoutPassword } = UpdateUSerEmail.toObject();
      // console.log(UpdateUSerEmail);
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

async function handleUserEmailVerification(req, res) {
  console.log("running");
  try {
    const emailFromUser = req.body.email;
    // console.log(emailFromUser);
    const UserData = await User.findOne({ email: emailFromUser });
    // console.log(UserData);
    if (!UserData) {
      return res.status(422).json({
        success: false,
        msg: "Email Address Not Found",
      });
    } else {
      const randomNumber = crypto.randomInt(0, 1000);
      const OTP = String(randomNumber).padStart(4, "5");
      console.log(OTP);
      const resetToken = await setUserResetPassswordToken({
        email: emailFromUser,
        OTP,
      });
      const emailProvider = nodmailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
          user: "mahi.dhuwaviya.04@gmail.com",
          pass: "rsqw dyra vvfj itmc",
        },
        tls: { rejectUnauthorized: false },
      });
      const receiver = {
        from: "mahi.dhuwaviya.04@gmail.com", //"Food.Delivery.App@gmail.com",
        to: emailFromUser,
        subject: "OTP Verification",
        text: `Your One Time Password (OTP) is ${OTP}`,
      };
      emailProvider.sendMail(receiver, (error, emailResponse) => {
        if (error) {
          res.status(422).json({
            success: false,
            msg: "Email Invalid or Network Issue Try again Later",
          });
        } else {
          const options = {
            expire: new Date(Date.now() + 60 * 1000),
            httpOnly: true,
            secure: true,
          };
          res.cookie("ResetPasswordToken", resetToken, options);
          return res.status(200).json({
            success: true,
            msg: "OTP send successfully on provided gmail",
          });
        }
      });
    }
  } catch (error) {
    console.error("ERRORRRRRR::---", error);
    res.status(400).json({ success: false, error: error.message });
  }
}

async function handleUserOtpVerification(req, res) {
  try {
    const OTPFromUser = req.body.OTP;
    const ResetPasswordTokenfromcookie = req.cookies["ResetPasswordToken"];
    if (!ResetPasswordTokenfromcookie) {
      res.json({ success: false, msg: "Token expired verify email again" });
    } else {
      const userDetails = await getUserResetPasswordToken(
        ResetPasswordTokenfromcookie
      );
      const ToCheckOTP = userDetails.OTP;
      if (OTPFromUser === ToCheckOTP) {
        res.status(200).json({ success: true, msg: "OTP Verified" });
      } else {
        res.json({ success: false, msg: "OTP InValid" });
      }
    }
  } catch (error) {
    console.error("ERRORRRRRR::---", error);
    res.status(400).json({ success: false, error: error.message });
  }
}

async function handleUserUpdatePassword(req, res) {
  try {
    const ResetPassword = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(ResetPassword, salt);
    const ResetPasswordTokenfromcookie = req.cookies["ResetPasswordToken"];
    if (!ResetPasswordTokenfromcookie) {
      res.json({ success: false, msg: "Token expired verify email again" });
    } else {
      const checkToken = await getUserResetPasswordToken(
        ResetPasswordTokenfromcookie
      );
      const email = checkToken.email;
      if (!email) {
        res.json({ success: false, msg: "Email Invalid verify email again" });
      } else {
        const user = await User.findOne({ email });
        user.password = hashPassword;
        await user.save();
        res
          .clearCookie("ResetPasswordToken")
          .status(200)
          .json({ success: true, msg: "Password Changed" });
      }
    }
  } catch (error) {
    console.error("ERRORRRRRR::---", error);
    res.status(400).json({ success: false, error: error.message });
  }
}

export {
  handleUserCreateAccount,
  handleUserLogin,
  handleUserDataUpdate,
  handleUserUpdateEmail,
  handleUserUpdatePassword,
  handleUserEmailVerification,
  handleUserOtpVerification,
};
