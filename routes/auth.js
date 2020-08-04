const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password, name, lastname, gender } = req.body;
    const newUser = { email, password, name, lastname, gender };

    const candidate = await User.findOne({ email });

    if (candidate) {
      res
        .status(400)
        .json({
          message: "User has been created with this email.",
          error: true,
        });
    } else {
      const user = new User(newUser);
      await user.save();
      res.status(200).json({ message: "User has been created successfully." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something has happened. Try again.", error });
  }
});

module.exports = router;
