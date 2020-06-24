module.exports = function requireLoggedln(req, res, next) {
  if (!req.currentUser) {
    res.redirect("/");
  } else {
    next();
  }
};
