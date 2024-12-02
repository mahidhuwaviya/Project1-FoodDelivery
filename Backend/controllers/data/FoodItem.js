import mongoose from "mongoose";

async function handleGetFoodItemsData(req, res) {
  try {
    const fetchedFoodItemData = mongoose.connection.db.collection("foodItems");
    const FoodItemData = await fetchedFoodItemData.find({}).toArray();
    res.json(FoodItemData);
    // console.log("from controllers", global.foodItemsData);
    // res.send([global.foodItemsData, global.foodCategoryData]);
  } catch (error) {
    console.log(error);
  }
}

export default handleGetFoodItemsData;
