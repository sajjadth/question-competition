const router = require("express").Router();
const user = require("../controllers/userController.js");
const auth = require("../auth/auth.js");

router.post("/register", user.register);
router.post("/login", user.login);
router.get("/auth", auth, user.auth);

module.exports = router;
