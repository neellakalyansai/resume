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




// ✅ Debug Route to List Frontend Files
app.get("/api/debug-frontend", (req, res) => {
    fs.readdir(frontendPath, (err, files) => {
        if (err) {
            console.error("❌ Error reading frontend folder:", err);
            return res.status(500).json({ message: "Frontend folder not found", error: err });
        }
        console.log("✅ Frontend Files:", files);
        res.json({ message: "Frontend files found", files });
    });
});


// ✅ Fix: Correctly Serve React Frontend (Only in Production)
const frontendPath = path.join(process.cwd(), "front-end/build");

console.log(frontendPath);
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"), (err) => {
    if (err) {
        console.log(err);
      res.status(500).send("Error loading frontend." + err);
    }
  });
});

// ✅ Fix: Remove Keep-Alive Function (Not Needed in Netlify)

// ✅ Export Serverless Handler for Netlify
module.exports.handler = serverless(app);
