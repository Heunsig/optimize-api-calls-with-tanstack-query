export function isAuthenticated(req, res, next) {
  if (req.session.authenticated !== true) {
    return res.status(401).json({
      status: "error",
      message: "Unauthenticated",
    });
  }
  next();
}

export function isNotAuthenticated(req, res, next) {
  if (req.session.authenticated) {
    return res.status(403).json({
      status: "error",
      message: "Already authenticated",
    });
  }

  next();
}