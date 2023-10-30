const express = require("express");
const router = express.Router();
const User = require("../models/User");

// create a using POST "/api/auth/". Doesn't require Auth
router.post("/", (req, res) => {
  // res.json(obj);
  console.log(req.body);

  const user = User(req.body);
  user.save();
  // res.send('hello')
  res.send(req.body);
});

module.exports = router;
