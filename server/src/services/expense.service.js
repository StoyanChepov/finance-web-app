const { Expense } = require("../models/Expense");
const { Attachment } = require("../models/Attachment");
const { Category } = require("../models/Category");
const mongoose = require("mongoose");
// TODO replace with your own data service

async function getAll(userId) {
  return await Expense.find({ userId }).populate({
    path: "category",
    select: "name",
  });
}

async function getAllByCategory(userId) {
  console.log("userId in agg", userId);
  return await Expense.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } }, // Filter by userId
    {
      $lookup: {
        from: "categories", // The category collection
        localField: "category",
        foreignField: "_id",
        as: "categoryInfo",
      },
    },
    { $unwind: "$categoryInfo" }, // Unwind the array returned by $lookup
    { $group: { _id: "$categoryInfo.name", total: { $sum: "$amount" } } }, // Group by category name and sum the amounts
    { $project: { _id: 0, category: "$_id", total: 1 } }, // Format the result
    { $sort: { total: -1 } }, // Optionally sort by total in descending order
  ]).exec();
  /*
  return await Expense.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } }, // Filter by userId
    {
      $lookup: {
        from: "categories", // The category collection
        localField: "category",
        foreignField: "_id",
        as: "categoryInfo",
      },
    },
    { $unwind: "$categoryInfo" }, // Unwind the categoryInfo array
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          category: "$categoryInfo.name",
        }, // Group by date and category name
        total: { $sum: "$amount" }, // Sum the total amount per date and category
        expenses: { $push: "$$ROOT" }, // Optionally push the entire document into the result
      },
    },
    {
      $project: {
        _id: 0, // Remove the _id field
        date: "$_id.date", // Include the grouped date
        category: "$_id.category", // Include the grouped category name
        total: 1, // Include the total amount for each group
        expenses: 1, // Optionally include the individual expenses in each group
      },
    },
    { $sort: { date: 1 } }, // Sort the results by date in ascending order
  ]).exec();

  */
  }

async function getAllByDate(userId) {
  console.log("userId in agg", userId);
  return await Expense.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },  // Filter by userId
    {
      $lookup: {
        from: "categories",  // The category collection
        localField: "category",
        foreignField: "_id",
        as: "categoryInfo"
      }
    },
    { $unwind: "$categoryInfo" },  // Unwind the categoryInfo array
    {
      $group: {
        _id: { month: { $dateToString: { format: "%Y-%m", date: "$date" } }, category: "$categoryInfo.name" },  // Group by month and category
        total: { $sum: "$amount" },  // Sum the total amount per month and category
      }
    },
    {
      $project: {
        _id: 0,  // Remove the _id field
        date: "$_id.month",  // Include the grouped month
        category: "$_id.category",  // Include the grouped category name
        total: 1,  // Include the total amount for each group
      }
    },
    { $sort: { date: 1 } }  // Sort the results by month in ascending order
  ])
    .exec()
}

async function getRecent() {
  return await Expense.find().sort({ $natural: -1 }).limit(3).lean();
}

async function getById(id) {
  return await Expense.findById(id).populate({
    path: "category",
    select: "name",
  });
}

async function getAttachments(expenseId) {
  return await Attachment.find({ expenseId }).lean();
}

async function getCategories(userId) {
  return await Category.find({ userId }).lean();
}

async function addCategory(name, userId) {
  const newCategory = new Category({
    name: name,
    createdOn: new Date().toISOString()?.split("T")[0],
    userId: userId,
  });

  await newCategory.save();

  return newCategory;
}

async function addAttachment(expenseId, url, name) {
  const attachment = new Attachment({
    name,
    url,
    createdOn: new Date().toISOString()?.split("T")[0],
    expenseId,
  });

  await attachment.save();
  return attachment;
}

async function create(data, authorId) {
  //TODO: Extract data from request
  const newExpense = new Expense({
    title: data.title,
    description: data.description,
    amount: data.amount,
    date: data.date.split("T")[0],
    category: data.category,
    quantity: data.quantity,
    price: data.price,
    userId: authorId,
  });
  await newExpense.save();

  return newExpense;
}

async function update(id, data, userId) {
  const existing = await Expense.findById(id);
  if (!existing) {
    throw new Error("Expense not found");
  }
  if (existing.userId.toString() !== userId) {
    throw new Error("User is not the author");
  }

  //TODO: Extract data from request
  //existing.prop = data.prop;
  console.log(data);

  existing.title = data.title;
  existing.description = data.description;
  existing.amount = data.amount;
  existing.date = data.date;
  existing.category = data.categoryId;
  existing.quantity = data.quantity;
  existing.price = data.price;

  await existing.save();

  return existing;
}

async function deleteById(id, userId) {
  const existing = await Expense.findById(id);
  if (!existing) {
    throw new Error("Expense not found" + id);
  }
  if (existing.userId.toString() !== userId) {
    throw new Error("User is not the author");
  }
  const result = await Expense.findByIdAndDelete(id);
  return result;
}

async function searchExpense(title) {
  const query = {};

  if (title) {
    query.title = { $regex: title, $options: "i" };
  }

  return await Expense.find(query).lean();
}

module.exports = {
  getAll,
  getById,
  getAttachments,
  create,
  update,
  deleteById,
  getRecent,
  searchExpense,
  addAttachment,
  addCategory,
  getCategories,
  getAllByCategory,
  getAllByDate
};
