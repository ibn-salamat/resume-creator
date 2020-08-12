const { Router } = require("express");

const User = require("../models/user");

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id }).select("-password");
    res.json({
      message: "Success",
      data: user,
    });
  } catch (error) {
    res.status(404).json({ message: "User is not found", error: error.stack });
  }
});

module.exports = router;
