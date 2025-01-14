const express = require("express");
const router = express.Router();
const auth = require("../auth");

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const result = await auth.signup(username, password);
  res.json(result);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await auth.login(username, password);
  res.json(result);
});

module.exports = router;
