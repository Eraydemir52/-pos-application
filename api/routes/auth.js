const User = require("../models/User.js");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

// router.get("/get-all", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     console.log(error);
//   }
// });

//register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // kendine özel bir şifrleme yapar
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(200).json("A new user created succesfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ error: "User not fount !" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    ); //passwordleri karşılaştırır
    if (!validPassword) {
      res.status(403).json("Invalid password");
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//serveer içinde çağırmak için
module.exports = router;
