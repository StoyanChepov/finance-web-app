const { Expense } = require("../models/Expense");
const { Attachment } = require("../models/Attachment");

// TODO replace with your own data service

async function getAll() {
  return await Expense.find().lean();
}

async function getRecent() {
  return await Expense.find().sort({ $natural: -1 }).limit(3).lean();
}

async function getById(id) {
  return await Expense.findById(id).lean();
}

async function getAttachments(expenseId) {
  return await Attachment.find({ expenseId }).lean();
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
    date: data.date,
    category: data.category,
    quantity: data.quantity,
    price: data.price,
    //createdBy: authorId,
  });
  await newExpense.save();

  return newExpense;
}

async function update(id, data, userId) {
  const existing = await Expense.findById(id);
  if (!existing) {
    throw new Error("Expense not found");
  }
  if (existing.owner.toString() !== userId) {
    throw new Error("User is not the author");
  }

  //TODO: Extract data from request
  //existing.prop = data.prop;
  existing.title = data.title;
  existing.description = data.description;
  existing.amount = data.amount;
  existing.date = data.date;
  existing.category = data.category;
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
  if (existing.owner.toString() !== userId) {
    throw new Error("User is not the author");
  }
  await Expense.findByIdAndDelete(id);
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
};