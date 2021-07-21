const Trivia = require("open-trivia-db");
const bcrypt = require("bcrypt");

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
      : req.body.category
    : null;
  req.body.difficulty
    ? req.body.difficulty === "any"
      ? null
      : req.body.difficulty
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
  let correctAnswers = [];
  let incorrectAnswers = [];
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
        yourAnswer: answer.client_answer
      };
      correctAnswers.push(correctAnswer);
      point++;
    } else {
      const incorrectAnswer = {
        question: answer.question,
        yourAnswer: answer.client_answer
      };
      incorrectAnswers.push(incorrectAnswer);
    }
  }
  await res.json({
    point: point,
    correct_answers: correctAnswers,
    incorrect_answers: incorrectAnswers
  });
};

module.exports = { getQuestions, compareAnswers };
