export const state = () => {
  return {
    login: false,
    questions: []
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
  logout(state) {
    state.login = false;
  },
  setQuestions(state, payload) {
    state.questions = payload;
  }
};
