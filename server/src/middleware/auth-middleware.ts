export function isAuthorized(req, res, next) {
  if (req.session.authenticated !== true) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  }
  next();
}

export function isNotAuthenticated(req, res, next) {
  if (req.session.authenticated) {
    return res.status(400).json({
      status: "error",
      message: "Already authenticated",
    });
  }

  next();
}