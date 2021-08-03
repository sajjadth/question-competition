const Trivia = require("open-trivia-db");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const getQuestions = async (req, res) => {
  const amount = req.body.amount;
  const token = req.body.token;

  let options = {
    amount: amount,
    token: token
  };
  req.body.category
    ? req.body.category === "any"
      ? null
      : (options.category = req.body.category)
    : null;
  req.body.difficulty
    ? req.body.difficulty === "any"
      ? null
      : (options.difficulty = req.body.difficulty)
    : null;
  req.body.type
    ? req.body.type === "any"
      ? null
      : (options.type = req.body.type)
    : null;

  const Questions = await Trivia.getQuestions(options);
  const clientResponse = [];
  const clientResult = [];
  const salt = bcrypt.genSaltSync(15);
  if (amount === 1 || amount === "1") {
    const question = Questions;
    const correctAnswerHashed = bcrypt.hashSync(question.correct_answer, salt);
    const responseContent = {
      category: question.category,
      type: question.type,
      difficulty: question.difficulty,
      question: question.question,
      answers: question.all_answers
    };
    const resultContent = {
      category: question.category,
      type: question.type,
      difficulty: question.difficulty,
      question: question.question,
      answers: question.all_answers,
      correct_answer: question.correct_answer,
      incorrect_answers: question.incorrect_answers,
      correct_answer_hashed: correctAnswerHashed
    };
    clientResponse.push(responseContent);
    clientResult.push(resultContent);
    res.json(clientResult);
  } else {
    for (question of Questions) {
      const correctAnswerHashed = bcrypt.hashSync(
        question.correct_answer,
        salt
      );
      const responseContent = {
        category: question.category,
        type: question.type,
        difficulty: question.difficulty,
        question: question.question,
        answers: question.all_answers
      };
      const resultContent = {
        category: question.category,
        type: question.type,
        difficulty: question.difficulty,
        question: question.question,
        answers: question.all_answers,
        correct_answer: question.correct_answer,
        incorrect_answers: question.incorrect_answers,
        correct_answer_hashed: correctAnswerHashed
      };
      clientResponse.push(responseContent);
      clientResult.push(resultContent);
    }
    res.json(clientResult);
  }
};

const compareAnswers = async (req, res) => {
  let point = 0;
  let results = [];
  const answers = req.body;
  for (answer of answers) {
    if (
      await bcrypt.compareSync(
        answer.client_answer,
        answer.correct_answer_hashed
      )
    ) {
      const correctAnswer = {
        question: answer.question,
        yourAnswer: answer.client_answer,
        correct: true
      };
      results.push(correctAnswer);
      point++;
    } else {
      const incorrectAnswer = {
        question: answer.question,
        yourAnswer: answer.client_answer,
        correct: false
      };
      results.push(incorrectAnswer);
    }
  }
  await User.findOneAndUpdate(
    { username: req.user.username, _id: req.user._id },
    { $inc: { point: point } }
  )
    .then(async r => {
      await res.json({
        point: point,
        results: results,
        result: `${point}/${answers.length}`
      });
    })
    .catch(e => console.log("Error in updating data"));
};

module.exports = { getQuestions, compareAnswers };
