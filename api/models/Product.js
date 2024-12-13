const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: { type: String, require: true }, //string  ve zorunlu bir alan olucak
    img: { type: String, require: true },
    price: { type: Number, require: true },
    category: { type: String, require: true },
  },
  { timestamps: true } //oluştrulduğu zaman
);

//veri tabanında categories adında yer açıcam şemada bu olucak ProductSchema
const Product = mongoose.model("products", ProductSchema);

module.exports = Product;
