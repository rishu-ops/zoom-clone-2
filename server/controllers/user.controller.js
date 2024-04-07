const Users = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userRegister = async (req, res) => {
  try {
    const payload = req.body;

    const userExist = await Users.findOne({ email: payload.email });

    if (userExist) {
      return res.status(409).send({
        message: "This email is already exist",
        success: false,
      });
    }
    // Hashing the Password
    const hashedValue = bcrypt.hashSync(payload.password, 10);

    payload.hashedPassword = hashedValue;
    delete payload.password;
    const newUser = new Users(payload);

    newUser
      .save()
      .then((data) => {
        res.status(201).send({
          message: "User registered successfully",
          success: true, 
          user: data,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "error while creating user",
          success: false,
          error: error,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      success: false,
      Error: error.message,
    });
  }
};

exports.userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await Users.findOne({ email: email });

    if (!userExist) {
      return res.status(404).send({
        message: "This email is not registered",
      });
    }

    if (bcrypt.compareSync(password, userExist.hashedPassword)) {
      let token = jwt.sign({ _id: userExist._id }, process.env.SECRET_KEY);
      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 86400000),

      });
      res.status(200).send({
        message: "User logged in successfully",
        success: true ,
        user: userExist,
        token ,
      });
    } else {
      return res.status(401).send({
        message: "Incorrect password",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      Error: error.message,
      success: false,
    });
  }
};

exports.userLogout = async (req, res) => {
  try {
    await res.clearCookie("accessToken");
    res.status(200).send({
      message: "User logged out",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      success: false,
      Error: error.message,
    });
  }
};
