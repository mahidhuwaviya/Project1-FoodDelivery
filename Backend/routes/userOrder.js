import express from "express";
import {
  handleUserOrder,
  handleuserMyOrderData,
} from "../controllers/userOrder.js";
const router = express.Router();

router.post("/userOrderData", handleUserOrder);
router.post("/userMyOrder", handleuserMyOrderData);

export default router;
