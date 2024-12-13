const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    title: { type: String, require: true }, //string  ve zorunlu bir alan olucak
  },
  { timestamps: true } //oluştrulduğu zaman
);

//veri tabanında categories adında yer açıcam şemada bu olucak CategorySchema
const Category = mongoose.model("categories", CategorySchema);

module.exports = Category;
