import cors from "cors";
import cookieParser from "cookie-parser";
import checkcookies from "./middleware/checkCookies.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

const app = express();
const PORT = 5000;
dotenv.config();

// import Connecttomongodb from "./connection.js";

import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";
import dataRoutes from "./routes/data.js";
import forCookieRoutes from "./routes/checkCookies.js";
import orderRoutes from "./routes/userOrder.js";

//Connecttomongodb(); //using connection because data is also fetched there
mongoose
  .connect(process.env.Mongo_URL)
  .then(() => {
    console.log("Connected TO MongoAtlas");
  })
  .catch(console.error(error));

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000", // Your frontend's domain
  credentials: true, // Allow credentials (cookies) to be sent
};

app.use(express.static(path.resolve("./public")));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(checkcookies("FoodAppToken"));

// app.get("/", (req, res) => {
//   res.end("Hello from server");
// });

import { fileURLToPath } from "url";
// import e from "cors";
import { error } from "console";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// app.use("/public", express.static(path.resolve("./public")));

//Configuration
cloudinary.config({
  cloud_name: "dbcnne0ud",
  api_key: "349893859253312",
  api_secret: "FgrK3lPdNUuoE9Lbo413LnL_9UI", // Click 'View API Keys' above to copy your API secret
});

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/cookie", forCookieRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/data", dataRoutes);
app.use("/order", orderRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server started on PORT ${process.env.PORT}`)
);
