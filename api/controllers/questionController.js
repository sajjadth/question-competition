const Trivia = require("open-trivia-db");
const bcrypt = require("bcrypt");

const getQuestions = async (req, res) => {
  const amount = req.body.amount;
  const category = req.body.category;
  const difficulty = req.body.difficulty;
  const token = req.body.token;
  const type = req.body.type;

  const options = {
    amount: amount,
    category: category,
    difficulty: difficulty,
    type: type,
    token: token
  };

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

module.exports = { getQuestions };
