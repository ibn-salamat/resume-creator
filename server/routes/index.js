const { Router } = require("express");
const router = Router();
const authRoutes = require("./auth");
const usersRoutes = require("./users");
const resumeRoutes = require("./resume");

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/resume", resumeRoutes);

module.exports = router;
