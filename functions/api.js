const express = require("express");
const serverless = require("serverless-http");
require("dotenv").config();
const path = require("path");
const cors = require("cors");

require("../Models/user-model");
require("../Models/portfolio-model");

const app = express();
app.use(express.json());

// Configure CORS
app.use(cors({
  origin: '*'
}));

// Import Database Configuration
const dbconfig = require("../dbconfig");

// Import Routes
const portfolioRoutes = require("../Routes/portfolioRoutes");
app.use("/api", portfolioRoutes); // Prefix all routes with /api

// Deployment Configuration for Serving Frontend
const frontendPath = path.join(__dirname, "..", "front-end", "build");

app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Periodic API Call to Keep Backend Active (REMOVE: Not Needed in Netlify)
const keepAlive = async () => {
  try {
    const response = await fetch("https://your-netlify-site.netlify.app/api");
    console.log("Keep alive response:", response.status);
  } catch (error) {
    console.error("Keep alive error:", error);
  }
};

// Netlify does not need this, so REMOVE setInterval

module.exports.handler = serverless(app);
