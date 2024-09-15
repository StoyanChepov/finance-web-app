const { Position } = require("../models/Position");
const { Attachment } = require("../models/Attachment");
const { Category } = require("../models/Category");
const { Item } = require("../models/Item");

const mongoose = require("mongoose");
const { ItemType } = require("../models/ItemType");
const { ItemPosition } = require("../models/ItemPosition");
// TODO replace with your own data service

async function getAll(userId) {
  return await Position.find({ userId }).populate({
    path: "category",
    select: "name",
  });
}

async function getAllByCategory(userId) {
  console.log("userId in agg", userId);
  return await Position.aggregate([
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
  return await Position.aggregate([
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
        positions: { $push: "$$ROOT" }, // Optionally push the entire document into the result
      },
    },
    {
      $project: {
        _id: 0, // Remove the _id field
        date: "$_id.date", // Include the grouped date
        category: "$_id.category", // Include the grouped category name
        total: 1, // Include the total amount for each group
        positions: 1, // Optionally include the individual positions in each group
      },
    },
    { $sort: { date: 1 } }, // Sort the results by date in ascending order
  ]).exec();

  */
}

async function getAllByDate(userId) {
  console.log("userId in agg", userId);
  return await Position.aggregate([
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
          month: { $dateToString: { format: "%Y-%m", date: "$date" } },
          category: "$categoryInfo.name",
        }, // Group by month and category
        total: { $sum: "$amount" }, // Sum the total amount per month and category
      },
    },
    {
      $project: {
        _id: 0, // Remove the _id field
        date: "$_id.month", // Include the grouped month
        category: "$_id.category", // Include the grouped category name
        total: 1, // Include the total amount for each group
      },
    },
    { $sort: { date: 1 } }, // Sort the results by month in ascending order
  ]).exec();
}

async function getRecent() {
  return await Position.find().sort({ $natural: -1 }).limit(3).lean();
}

async function getById(id) {
  return await Position.findById(id)
    .populate({
      path: "category",
      select: "name",
    })
    .lean()
    .exec()
    .then(async (position) => {
      if (position) {
        console.log("Position", position);

        // Find all ItemPositions that reference this Position via positionId
        const itemPositions = await ItemPosition.find({
          positionId: position._id,
        }).populate({
          path: "itemId",
          select: "name",
        });
        return { ...position, itemPositions };
      }
      return null; // Position not found
    });
}

async function getAttachments(positionId) {
  return await Attachment.find({ positionId }).lean();
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

async function getItems(userId) {
  return await Item.find({ userId }).lean();
}

async function getItemTypes() {
  return await ItemType.find().lean();
}

async function addItem(name, type, userId) {
  console.log("Add item", name, type, userId);
  const newItem = new Item({
    name: name,
    createdOn: new Date().toISOString()?.split("T")[0],
    itemTypeId: type,
    userId: userId,
  });

  await newItem.save();

  return newItem;
}

async function addAttachment(positionId, url, name) {
  const attachment = new Attachment({
    name,
    url,
    createdOn: new Date().toISOString()?.split("T")[0],
    positionId,
  });

  await attachment.save();
  return attachment;
}

async function create(data, authorId) {
  //TODO: Extract data from request
  const newPosition = new Position({
    title: data.title,
    description: data.description,
    amount: data.amount,
    date: data.date.split("T")[0],
    category: data.category,
    userId: authorId,
  });
  await newPosition.save();

  return newPosition;
}

async function createLine(data, authorId) {
  //TODO: Extract data from request
  const newPosition = new ItemPosition({
    amount: data.amount,
    price: data.price,
    quantity: data.quantity,
    itemId: data.item,
    positionId: data.positionId,
    userId: authorId,
    createdOn: new Date().toISOString()?.split("T")[0],
  });
  await newPosition.save();

  return newPosition;
}

async function update(id, data, userId) {
  const existing = await Position.findById(id);
  if (!existing) {
    throw new Error("Position not found");
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

  await existing.save();

  return existing;
}

async function deleteById(id, userId) {
  const existing = await Position.findById(id);
  if (!existing) {
    throw new Error("Position not found" + id);
  }
  if (existing.userId.toString() !== userId) {
    throw new Error("User is not the author");
  }
  const result = await Position.findByIdAndDelete(id);
  return result;
}

async function searchPosition(title) {
  const query = {};

  if (title) {
    query.title = { $regex: title, $options: "i" };
  }

  return await Position.find(query).lean();
}

module.exports = {
  getAll,
  getById,
  getAttachments,
  create,
  createLine,
  update,
  deleteById,
  getRecent,
  searchPosition,
  addAttachment,
  addCategory,
  getCategories,
  getAllByCategory,
  getAllByDate,
  getItems,
  getItemTypes,
  addItem,
};
