export const state = () => {
  return {
    login: false,
    questions: [],
    userAnswers: [],
    userResults: [],
    status: 0
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
    state.status++;
  },
  getUserAnswers(state, payload) {
    state.userAnswers = payload;
    state.questions = [];
    state.status++;
  },
  getUserResults(state, payload) {
    state.userResults = payload;
    state.userAnswers = [];
  },
  close(state) {
    state.status = 0;
    state.userResults = []
  }
};
