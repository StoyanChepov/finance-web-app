// TODO import routes

const { homeRouter } = require("../controllers/home");
const { userRouter } = require("../controllers/user");
const { expenseRouter } = require("../controllers/expense");

function configRoutes(app) {
  app.use(homeRouter);
  // TODO use routes
  app.use(userRouter);
  app.use(expenseRouter);
  app.get("*", (req, res) => res.status(404));
}
module.exports = { configRoutes };
