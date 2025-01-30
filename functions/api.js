const express = require("express");
const serverless = require("serverless-http");
require("dotenv").config();
const path = require("path");
const cors = require("cors");

require("../Models/user-model");
require("../Models/portfolio-model");

const app = express();
app.use(express.json());

// ✅ Configure CORS
app.use(cors({
  origin: '*'
}));

// ✅ Import Database Configuration
const dbconfig = require("../dbconfig");

// ✅ Import Routes
const portfolioRoutes = require("../Routes/portfolioRoutes");
app.use("/api", portfolioRoutes); // Prefix all routes with /api

// ✅ Fix: Correctly Serve React Frontend (Only in Production)
const frontendPath = path.join(__dirname, "../front-end/build");
console.log(frontendPath);
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"), (err) => {
    if (err) {
        console.log(err);
      res.status(500).send("Error loading frontend.");
    }
  });
});

// ✅ Fix: Remove Keep-Alive Function (Not Needed in Netlify)

// ✅ Export Serverless Handler for Netlify
module.exports.handler = serverless(app);
