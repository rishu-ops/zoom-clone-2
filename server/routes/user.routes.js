const express = require("express");
const {
  userRegister,
  userSignIn,
  userLogout,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", userRegister);

router.post("/signin", userSignIn);

router.get("/logout", userLogout);

module.exports = router;
