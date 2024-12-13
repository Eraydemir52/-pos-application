const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: { type: String, require: true }, //string  ve zorunlu bir alan olucak
    email: { type: String, require: true },
    password: { type: String, require: true },
  },
  { timestamps: true } //oluştrulduğu zaman
);

//veri tabanında categories adında yer açıcam şemada bu olucak UserSchema
const User = mongoose.model("users", UserSchema);

module.exports = User;
