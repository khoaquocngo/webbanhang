module.exports = function requireAdmin(req, res, next) {
    if (req.currentUser.Decentralize === true) {
      res.redirect("/");
    } else {
      next();
    }
  };
  