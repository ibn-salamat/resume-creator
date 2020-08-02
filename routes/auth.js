const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, name, lastname } = req.body;
    const newUser = { email, password, name, lastname };

    const candidate = await User.findOne({ email });

    if (candidate) {
      res
        .status(400)
        .json({ message: "User has been created with this email." });
    } else {
      const user = new User(newUser);
      await user.save();
      res.status(200).json({ message: "User has been created successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something has happened. Try again." });
  }
});

module.exports = router;
