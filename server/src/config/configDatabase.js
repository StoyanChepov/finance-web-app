const mongoose = require("mongoose");

async function configDatabase() {
  //Set database connection
  await mongoose.connect("mongodb://localhost:27017/PersonalFinanceDB");

  console.log("Database connected!");
}

module.exports = { configDatabase };
