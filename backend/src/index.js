import express from 'express';
import authRoutes from './auth.route.js';
const app = express();

app.use("/api/auth",authRoutes);

app.listen(3005, () => {
  console.log('Server is running on port 3005');
});