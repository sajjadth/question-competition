const router = require("express").Router();
const user = require("../controllers/userController.js");

router.post("/register", user.register);
router.post("/login", user.signin);

module.exports = router;
