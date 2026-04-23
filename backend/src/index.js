import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

const PORT = process.env.PORT||3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});