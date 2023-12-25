import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import cors from "cors";
import categoryRoutes from "./routes/CategoryRoute.js"
import productRoutes from "./routes/ProductRoute.js"
dotenv.config();
connectDB();
const app=express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productRoutes);

const PORT=process.env.PORT||8080;
if ( process.env.NODE_ENV == "production"){
 app.use(express.static("frontend/build"));
 const path = require("path");
 app.get("*", (req, res) => {
res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
})
}

app.listen(PORT,()=>{
    console.log(`server is running ${process.env.DEV_MODE} on PORT ${PORT}`.bgCyan.white);
})