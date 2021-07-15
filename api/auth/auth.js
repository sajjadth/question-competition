const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("auth-token");
  if (!token) res.send("access denied!");
  
  jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      req.user = data;
      next();
    }
  });
};
