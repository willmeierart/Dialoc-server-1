const jwt = require("jsonwebtoken");
const token_secret = "french_toast";

function checkTokenSetUser(req, res, next) {
  const tokenHeader = req.get("Authorization");
  if (tokenHeader) {
    const token = tokenHeader.split(" ")[1];
    jwt.verify(token, token_secret, (err, decoded) => {
      if (err) {
        next();
      } else {
        console.log(decoded);
        req.user = decoded;
        next();
      }
    });
  } else {
    next();
  }
}

function ensureLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(401);
    next(new Error("Un-Authorized"));
  }
}

function allowAccess(req, res, next) {
  if (req.user.id == req.params.id) {
    next();
  } else {
    res.status(401);
    next(new Error("Un-Authorized"));
  }
}

module.exports = {
  ensureLoggedIn,
  allowAccess,
  checkTokenSetUser
};