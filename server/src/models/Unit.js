//TODO replace with your own data
const { Schema, Types, model } = require("mongoose");

//TODO: Create a unit schema

const unitSchema = new Schema({
  name: { type: String, required: true },
  createdOn: { type: Date, required: true },
  userId: { type: Types.ObjectId, ref: "User" },
});

const Unit = model("Unit", unitSchema);

module.exports = { Unit };