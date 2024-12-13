const Bill = require("../models/Bill.js");

const express = require("express");

const router = express.Router();

router.get("/get-all", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add-bill", async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(200).json("Item added succesfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//serveer içinde çağırmak için
module.exports = router;
