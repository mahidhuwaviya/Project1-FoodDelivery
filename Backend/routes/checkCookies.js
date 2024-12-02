import express from "express";
const router = express.Router();

import {
  handleIsUserloggedIn,
  handleIsUserloggedOut,
} from "../controllers/checkCookies.js";

router.get("/login", handleIsUserloggedIn);
router.get("/logout", handleIsUserloggedOut);

export default router;
