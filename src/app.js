// connect routes to app.js
const express = require("express");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

// middleware

app.use(express.json());

// Routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/users", userRoutes);

module.exports = app;