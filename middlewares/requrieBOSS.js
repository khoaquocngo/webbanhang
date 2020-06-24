module.exports = function requrieBOSS(req, res, next) {
    if (req.currentUser.Username != "admin") {
      res.redirect("/");
    } else {
      next();
    }
  };
  