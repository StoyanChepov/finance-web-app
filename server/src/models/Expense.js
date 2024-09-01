//TODO replace with your own data
const { Schema, Types, model } = require("mongoose");

//TODO: Create a user schema

const expenseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  createdBy: { type: Types.ObjectId, ref: "User", required: false },
});

const Expense = model("Expense", expenseSchema);

module.exports = { Expense };
