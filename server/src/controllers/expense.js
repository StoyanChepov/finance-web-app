const { Router } = require("express");
const { getRecent } = require("../services/expense.service");
const { isUser } = require("../middlewares/guards");
const { validationResult, body } = require("express-validator");
const { parseError } = require("../util");
const {
  create,
  getById,
  update,
  deleteById,
  getAttachments,
  addAttachment,
  like,
} = require("../services/expense.service");
const auth = require("../middlewares/auth");

//TODO: Add home controller
const expenseRouter = Router();

expenseRouter.get("/attachments/:expenseId", async (req, res) => {
  console.log("Attachments", req.params.expenseId);

  const attachments = await getAttachments(req.params.expenseId);

  if (!attachments) {
    res.status(404);
    return;
  }
  res.send(attachments).status(200);
});

expenseRouter.post(
  "/attachments/create",
  isUser(),
  body("url")
    .trim()
    .isLength({ min: 1 })
    .withMessage("URL must be at least 1 character long!"),
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must be at least 1 character long!"),
  async (req, res) => {
    try {
      const validation = validationResult(req);
      if (validation.errors.length) {
        throw validation.errors;
      }
      const result = await addAttachment(
        req.body.expenseId,
        req.body.url,
        req.body.name
      );
      res.send(result).status(200);
    } catch (error) {
      console.log("Error:", error);
      res
        .send({
          errors: parseError(error).errors,
          data: req.body,
        })
        .status(402);
    }
  }
);

expenseRouter.post(
  "/expenses/create",
  auth,
  body("title")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Title must be at least 2 characters long!"),
  body("amount")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Amount must be at least 1 character long!"),
  body("date")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Date must be at least 1 character long!"),
  body("category")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Category must be at least 1 character long!"),
  body("quantity")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Quantity must be at least 1 character long!"),
  body("price")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Price must be at least 1 character long!"),
  async (req, res) => {
    try {
      const validation = validationResult(req);
      if (validation.errors.length) {
        throw validation.errors;
      }
      console.log(req.user);

      /* if (req.user === undefined && req.user._id === undefined) {
        res
          .status(401)
          .send({ message: "You are not authorized to perform this action!" });
      }
          */
      const result = await create(req.body, undefined);
      console.log("Result", result);

      res.send(result).status(200);
    } catch (error) {
      console.log("Error:", error);
      res
        .send({
          errors: parseError(error).errors,
          data: req.body,
        })
        .status(402);
    }
  }
);

expenseRouter.get("/edit/:id", isUser(), async (req, res) => {
  const expense = await getById(req.params.id);

  if (!expense) {
    res.status(404);
    return;
  }

  const isOwner = req.user && req.user._id == expense.owner.toString();

  if (!isOwner) {
    res.redirect("/expenses");
    return;
  }

  res.render("edit", { data: expense });
});

expenseRouter.post(
  "/edit/:id",
  isUser(),
  body("title")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Title must be at least 2 characters long!"),
  body("description")
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage("Description must be between 10 and 100 characters long!"),
  // TODO Add expense columns
  async (req, res) => {
    const expenseId = req.params.id;
    const userId = req.user._id;
    try {
      const validation = validationResult(req);
      if (validation.errors.length) {
        throw validation.errors;
      }
      const result = await update(expenseId, req.body, userId);
      res.redirect("/expenses/" + expenseId);
    } catch (error) {
      console.log("Error:", error);
      res.render("edit", {
        errors: parseError(error).errors,
        data: req.body,
      });
    }
  }
);

expenseRouter.get("/like/:id", isUser(), async (req, res) => {
  const expenseId = req.params.id;
  const userId = req.user._id;
  try {
    const result = await like(expenseId, userId);
    res.redirect("/expenses/" + expenseId);
  } catch (error) {
    console.log("Error:", error);
    res.redirect("/");
  }
});

expenseRouter.get("/delete/:id", isUser(), async (req, res) => {
  const expenseId = req.params.id;
  const userId = req.user._id;
  try {
    const result = await deleteById(expenseId, userId);
    res.redirect("/");
  } catch (error) {
    console.log("Error:", error);
    res.redirect("/catalog/" + expenseId);
  }
});

module.exports = { expenseRouter };
