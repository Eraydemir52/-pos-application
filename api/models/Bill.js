const mongoose = require("mongoose");

const BillSchema = mongoose.Schema(
  {
    customerName: { type: String, require: true }, //string  ve zorunlu bir alan olucak
    customerPhoneNumber: { type: String, require: true },
    paymentMode: { type: String, require: true },
    cartItems: { type: Array, require: true },
    subTotal: { type: Number, require: true },
    tax: { type: Number, require: true },
    totalAmount: { type: Number, require: true },
  },
  { timestamps: true } //oluştrulduğu zaman
);

//veri tabanında categories adında yer açıcam şemada bu olucak BillSchema
const Bill = mongoose.model("bills", BillSchema);

module.exports = Bill;
