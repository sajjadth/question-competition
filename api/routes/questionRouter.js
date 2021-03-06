const router = require("express").Router();
const auth = require("../auth/auth.js");
const questions = require("../controllers/questionController.js");

router.post("/get", auth, questions.getQuestions);
router.post("/compare", auth, questions.compareAnswers);

module.exports = router;
