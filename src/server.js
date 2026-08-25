// connecting mongodb to start the server
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

// Explicitly target the root .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Matched to MONGODB_URI (with DB) from your .env file
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MONGODB is connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();