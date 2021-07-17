const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("auth-token");
  if (!token) res.send("access denied!");

  jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
    if (err) {
      if (err.message === "jwt expired" || err.message === "invalid signature") {
        req.error = { success: false, message: err.message };
        next();
      } else {
        console.log("twt error");
      }
    } else {
      req.user = data;
      next();
    }
  });
};
