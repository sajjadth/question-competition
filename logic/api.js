const axios = require("axios").default;

class api {
  static register(user) {
    axios({
      method: "post",
      url: "http://localhost:5000/api/v1/users/register",
      data: user
    }).then(result => {
      if (result.status === 200) {
        return result.data;
      } else {
        console.log("error in register user");
      }
    });
  }
}

export default api;
