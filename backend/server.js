require("dotenv").config();

const dns = require("dns");

// Use Google DNS only during local development
if (process.env.NODE_ENV !== "production") {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("CampusFix backend is running!");
});

// Start server
const PORT = process.env.PORT || 5000;


async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
}

startServer();