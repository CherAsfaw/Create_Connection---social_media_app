import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();

// Connect to MongoDB
await connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Test root route
app.get('/', (req, res) => res.send("The server is connected"));

// Inngest endpoint
app.use("/api/inngest", serve({ client: inngest, functions }));

// Optional: local dev
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5400;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;  // ✅ Must export for Vercel
