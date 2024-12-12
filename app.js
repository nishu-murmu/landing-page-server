import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sendEmail } from "./routes/email.js"; // Update the import path if needed

dotenv.config({ path: `./.env` });

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API route
app.post("/api/email", sendEmail);

// Simple home route
app.get("/", (req, res) => res.send("Hello World!"));

// Export app for Vercel to handle as serverless function
export default app;
