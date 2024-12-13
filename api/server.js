const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
//logları görmek için ekliyoruz buraya
const logger = require("morgan");

//routes
const categoryRoute = require("./routes/categories.js");
const productRoute = require("./routes/products.js");
const billRoute = require("./routes/bills.js");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.js");

dotenv.config();
const port = process.env.PORT || 5000; //LOCALDE VEYA CANLIDAKİ SUNUCUDA
dotenv.config();
console.log("Loaded Environment Variables:", process.env); // Tüm ortam değişkenlerini logla
console.log("Mongo URI:", process.env.MONGO_URI); // Sadece MONGO_URI'yi logla

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected MongoDB");
    console.log("Mongo URI:", process.env.MONGO_URI);
  } catch (error) {
    throw error;
  }
};
//middewares
app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/bills", billRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.get("/", (req, res) => res.send("Hello Word !"));
app.listen(port, () => {
  connect();
  console.log(`Example  app listening on port ${port}`);
});

//sürücü kurlumu bu şekilde
