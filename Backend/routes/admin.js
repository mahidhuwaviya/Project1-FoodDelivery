import express from "express";
const router = express.Router();
import multer from "multer";
import path from "path";
import { body } from "express-validator";
import {
  handleAdminCreateAccount,
  handleAdminDataUpdate,
  handleAdminLogin,
  handleAdminUpdateEmail,
  handleAdminUpdatePassword,
  handleGetAdminData,
} from "../controllers/admin.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/BusinessImage`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}--${file.originalname}`;
    // console.log("StorageRunning");
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/createAccount",
  [
    upload.single("coverImgURL"),
    body("email").isEmail(),
    body("password", "Password must be a maximum of 5 characters.").isLength({
      min: 5,
    }),
    body("name", "Name must be a maximum of 5 characters.").isLength({
      min: 5,
    }),
  ],
  handleAdminCreateAccount
);

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "Password must be a maximum of 5 characters.").isLength({
      min: 5,
    }),
  ],
  handleAdminLogin
);

router.get("/getAdminData", handleGetAdminData);

router.put(
  "/AdminUpdateData",
  upload.single("coverImgURL"),
  handleAdminDataUpdate
);

router.put("/AdminUpdateEmail", handleAdminUpdateEmail);
router.put("/AdminUpdatePassword", handleAdminUpdatePassword);

export default router;
