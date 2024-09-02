const { Router } = require("express");
const { login } = require("../services/user.service");
const { register } = require("../services/user.service");
const { createToken, verifyToken } = require("../services/jwt.service");
const { getRecent } = require("../services/expense.service");
const { isGuest } = require("../middlewares/guards");
const { isUser } = require("../middlewares/guards");
const { parseError } = require("../util");
const { validationResult, body } = require("express-validator");

//TODO: Add home controller
const userRouter = Router();

userRouter.post(
  "/users/register",
  isGuest(),
  body("email")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Email must be at least 10 characters long!")
    .bail()
    .isEmail()
    .withMessage("Email must be a valid email address!"),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long!"),
  body("repass")
    .custom((value, { req }) => value == req.body.password)
    .withMessage("Passwords don't match!"),
  async (req, res) => {
    const { email, password, repass } = req.body;
    console.log("My body", req.body);

    try {
      const validation = validationResult(req);
      if (validation.errors.length) {
        throw validation.errors;
      }

      const result = await register(email, password);
      const token = createToken(result);
      res.cookie("token", token);
      const response = {
        email: result.email,
        _id: result._id,
        accessToken: token,
      };
      res.send(response).status(200);
    } catch (error) {
      console.log(error);
      res
        .send({
          errors: parseError(error).errors,
          data: { email },
        })
        .status(400);
    }
  }
);

userRouter.post(
  "/users/login",
  isGuest(),
  body("email").trim(),
  body("password").trim(),
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await login(email, password);
      const token = createToken(result);
      res.cookie("token", token);
      const response = {
        email: result.email,
        _id: result._id,
        accessToken: token,
      };
      res.send(response).status(200);
    } catch (error) {
      console.log(error);
      res
        .send({
          errors: parseError(error).errors,
          data: { email },
        })
        .status(400);
    }
  }
);

userRouter.get("/users/logout", (req, res) => {
  res.clearCookie("token");
  res.send([]).status(200);
});

module.exports = { userRouter };
