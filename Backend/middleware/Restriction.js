function RestrictTO(roles) {
  return function (req, res, next) {
    if (!req.user) {
      return res.redirect("/login");
    }
    if (!roles.includes(req.user.roles)) {
      return res.status(403).end("Unauthorized");
    }
    return next();
  };
}
