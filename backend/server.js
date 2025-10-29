/*
import dotenv from "dotenv";
dotenv.config(); 


// backend/server.js
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";

import applicantRoutes from "./routes/applicantRoutes.js";




// Connect to MongoDB Atlas
connectDB();

const app = express();



app.use("/api/payments", paymentRoutes);


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS (allow frontend)
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true, // allow cookies/authorization headers
  })
);

//  Base API routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/applicants", applicantRoutes);

app.use("/api/committees", adminRoutes);




//  Root route
app.get("/", (_, res) => {
  res.send("School Management API running successfully!");
});

//  Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

//  Global error handler (optional but good practice)
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

//  Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  //console.log(`Frontend allowed origin: ${CLIENT_URL}`);
});



// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables first
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS (Frontend URL)
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true, // allow cookies or auth headers
  })
);

// Route imports
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import applicantRoutes from "./routes/applicantRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";

// Base API routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/applicants", applicantRoutes);
app.use("/api/borrows", borrowRoutes);
app.use("/uploads", express.static("uploads")); // serve uploaded files
app.use("/api/committees", adminRoutes);

// Root route
app.get("/", (_, res) => {
  res.send("School Management API running successfully!");
});


//  FIX FOR EXPRESS 5 – Safe wildcard fallback (no PathError)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  //  Correct wildcard route syntax for Express 5
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
}

// 404 fallback (for API routes)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` Frontend allowed origin: ${CLIENT_URL}`);
});

*/


// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables first
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS (Frontend URL)
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// Route imports
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import applicantRoutes from "./routes/applicantRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/applicants", applicantRoutes);
app.use("/api/borrows", borrowRoutes);
app.use("/uploads", express.static("uploads"));

// Root test route
app.get("/api", (_, res) => {
  res.send(" School Management API running successfully!");
});

// Serve frontend build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  //  Correct wildcard syntax for Express 5
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
}
  */


if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const frontendPath = path.join(__dirname, "../frontend/dist");

  app.use(express.static(frontendPath));

  //  FIX: Use a RegExp instead of "/*"
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
}

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` Frontend allowed origin: ${CLIENT_URL}`);
});

