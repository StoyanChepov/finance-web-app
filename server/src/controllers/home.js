const { Router } = require("express");
const {
  getAll,
  getRecent,
  getById,
  searchExpense,
} = require("../services/expense.service");

//TODO: Add home controller
const homeRouter = Router();

homeRouter.get("/expenses", async (req, res) => {
  //console.log(req.user);
  const expenses = await getAll();
  res.send(expenses).status(200);
});

homeRouter.get("/expenses/:id", async (req, res) => {
  //console.log(req.user);
  const expense = await getById(req.params.id);

  if (!expense) {
    res.status(404);
    return;
  }
  res.send(expense).status(200);
  /*
  const isOwner = req.user && req.user._id == expense.createdBy.toString();
  const hasLiked = Boolean(
    req.user && expense.recommendList.find((l) => l.toString() == req.user._id)
  );
  const recommendations = expense.recommendList.length;
  res.render("details", { expense, isOwner, hasLiked, recommendations });
  */
});

homeRouter.get("/search", async (req, res) => {
  const { search } = req.query;
  let expenses = [];
  expenses = await searchExpense(search);

  res.render("search", { data: { search }, expenses });
});

module.exports = { homeRouter };
