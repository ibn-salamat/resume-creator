const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.json({ work: true });
});

module.exports = router;
