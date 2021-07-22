export const state = () => {
  return {
    login: false,
    questions: [],
    userAnswers: []
  };
};

export const mutations = {
  loginCheck(state) {
    const tokenCheck = localStorage.getItem("token")
      ? true
      : sessionStorage.getItem("token")
      ? true
      : false;
    state.login = tokenCheck;
  },
  setQuestions(state, payload) {
    state.questions = payload;
  },
  getUserAnswers(state, payload) {
    state.userAnswers = payload;
    state.questions = [];
  }
};
