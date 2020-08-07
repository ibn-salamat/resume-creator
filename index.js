const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");

const app = express();
app.use(express.json({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server error", error);
    process.exit(1);
  }
}

start();
