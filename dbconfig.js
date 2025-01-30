const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ MONGO_URI is missing! Set it in Netlify environment variables.");
    process.exit(1);
}

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000 // ⏳ Timeout after 10 seconds instead of 30s
})
.then(() => console.log("✅ Successfully connected to MongoDB"))
.catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
});

const db = mongoose.connection;
db.on("error", (error) => console.error("❌ Database Connection Error:", error));

module.exports = db;
