// connect routes to app.js
const express = require("express");
const authRoutes = require("./routes/auth.routes");

const app = express();

// middleware

app.use(express.json());

// Routes
app.use("/api/v1/auth",authRoutes);

module.exports = app;