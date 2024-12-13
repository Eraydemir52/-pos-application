const User = require("../models/User.js");

const express = require("express");

const router = express.Router();

router.get("/get-all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const userID = req.body.userID;
  try {
    const user = await User.findById(userID);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//serveer içinde çağırmak için
module.exports = router;
