import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { app, server } from './lib/socket.js';
import { fileURLToPath } from 'url';

dotenv.config();

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
app.use(express.json({ limit: "10mb" }));
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT||3005;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});