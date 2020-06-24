const User = require("../services/user");
const asyncHandler = require("express-async-handler");

module.exports = asyncHandler(async function auth(req, res, next) {
  const userID = req.session.userId;
  res.locals.currentUser = null;
  if (!userID) {
    return next();
  }
  const user = await User.findUserById(userID);
  if (!userID) {
    return next();
  }
  req.currentUser = user;
  res.locals.currentUser = user;
  next();
});
