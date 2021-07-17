export const state = () => {
  return {
    login: false
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
  }
};
