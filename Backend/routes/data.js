import express from "express";
import handleGetFoodItemsData from "../controllers/data/FoodItem.js";
import handleGetFoodCategoryData from "../controllers/data/FoodCategory.js";
const router = express.Router();

router.post("/foodItems", handleGetFoodItemsData);
router.post("/foodCategory", handleGetFoodCategoryData);

export default router;
