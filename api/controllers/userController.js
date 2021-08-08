const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios").default;

const register = async (req, res) => {
  const salt = bcrypt.genSaltSync(15);
  const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
  const fullName = `${req.body.firstName} ${req.body.lastName}`;
  const user = await new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    fullName: fullName,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  });
  await user
    .save()
    .then(result => {
      res.json({ success: true });
    })
    .catch(err => {
      if (err.code === 11000) {
        res.json({
          success: false,
          message: "username or email already taken."
        });
      } else if (err._message === "users validation failed") {
        res.json({ success: false, message: "users validation failed." });
      }
      // console.log(err. _message)
    });
};

const login = (req, res) => {
  const user = User.findOne({ username: req.body.username });

  user.then(result => {
    if (!result) {
      res.json({
        success: false,
        message: "username or password is incorrect!"
      });
    } else {
      const passwordChehck = bcrypt.compareSync(
        req.body.password,
        result.password
      );
      if (!passwordChehck) {
        res.json({
          success: false,
          message: "username or password is incorrect!"
        });
      } else {
        const token = jwt.sign(
          { username: result.username, _id: result._id },
          process.env.TOKEN_SECRET,
          { expiresIn: "6h" }
        );
        axios({
          method: "get",
          url: "https://opentdb.com/api_token.php?command=request"
        }).then(result => {
          if (result.status === 200) {
            if (result.data) {
              if (result.data.response_code === 0) {
                res.json({
                  success: true,
                  token: token,
                  openToken: result.data.token
                });
              } else {
                console.log("error in get third party api in get request");
              }
            } else {
              console.log("error in get third party api status code");
            }
          } else {
            console.log("error in get third party api");
          }
        });
      }
    }
  });
};

const auth = (req, res) => {
  if (req.error) {
    res.json(req.error);
  } else {
    res.json({ success: true });
  }
};

const getData = (req, res) => {
  const user = User.findOne({ _id: req.user._id, username: req.user.username });

  if (!user) res.json({ success: false, message: "cant find user!" });

  user.then(result =>
    res.json({
      point: result.point,
      email: result.email,
      username: result.username,
      fullName: result.fullName
    })
  );
};
module.exports = { register, login, auth, getData };
