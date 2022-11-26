import express from "express";
import tasksRoutes from "./routes/tasksRoute.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
console.log(process.env.VAR);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/api/task", tasksRoutes);
app.use("/api/auth", authRoutes);

const API_PORT = process.env.API_PORT || 3005;

app.listen(API_PORT, () => {
  console.log("OK");
});
