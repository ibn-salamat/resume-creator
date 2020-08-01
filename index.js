const express = require("express");
const path = require("path");
const config = require("config");
const authRoutes = require("./routes/auth");

const app = express();

const PORT = config.get("port") || 5000;

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
