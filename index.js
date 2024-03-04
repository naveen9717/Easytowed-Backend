import express from "express";
const app = express();
import authRoutes from "./routes/auth.js";
import likeRoutes from "./routes/likes.js";
import userRoutes from "./routes/users.js";
import photographerRoutes from "./routes/photographers.js";
import venuesRoutes from "./routes/venues.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config()
// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: `https://easytowed-frontend.onrender.com`,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/photographers", photographerRoutes);
app.use("/api/venues", venuesRoutes);

app.listen(process.env.PORT, () => {
  console.log("SERVER is working",process.env.PORT);
});
