import mongoose from "mongoose";

async function handleGetFoodCategoryData(req, res) {
  try {
    const fetchedFoodCategoryData =
      mongoose.connection.db.collection("foodCategory");
    const FoodCategoryData = await fetchedFoodCategoryData.find({}).toArray();
    res.json(FoodCategoryData);
    // console.log("from controllers", global.foodItemsData);
    // res.send([global.foodItemsData, global.foodCategoryData]);
  } catch (error) {
    console.log(error);
  }
}

export default handleGetFoodCategoryData;
