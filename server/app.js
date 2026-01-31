import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import { serve } from "inngest/express";
import { inngest, functions} from "./inngest/index.js"

// Create an Express application instance
const app = express();

await connectDB();

// Middleware to parse incoming JSON requests (req.body)
app.use(express.json());

// Middleware to allow cross-origin requests (frontend ↔ backend)
app.use(cors());

app.get('/', (req, res) => res.send("The server is connected"));

const PORT = process.env.port || 5400;

// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));
// app.listen(PORT, () => console.log(`The server running on port ${PORT}`));
export default app