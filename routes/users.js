const { Router } = require("express");

const User = require("../models/user");

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  // const user = new User({
  //   name: "alex",
  // });

  // const test = await user.save();

  res.send(users);
});

module.exports = router;
