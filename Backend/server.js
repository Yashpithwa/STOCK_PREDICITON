import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import "./config/passport.js";
import nodemailer from "nodemailer";
import stockRoutes from "./routes/stocks.js";
import Price from "./routes/Price.js";
import watchlist from "./routes/watchlist.js";
import news from "./routes/news.js";
import ai from "./routes/ai.js";
import compareRoutes from "./routes/compare.js";
import profile from "./routes/Profile.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// -------------------- MIDDLEWARES --------------------

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend (Vite/React dev server)
      "https://stock-prediciton-frontend.onrender.com" // deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// ✅ Parse JSON requests
app.use(express.json());

// -------------------- ROUTES --------------------
app.use("/auth", authRoutes);
app.use(stockRoutes);
app.use(Price);
app.use("/api", watchlist); 
app.use("/api/news", news);
app.use(ai);
app.use("/api/compare", compareRoutes);
app.use("/api", profile);

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
