var express = require("express");
var AuthRouter = express.Router();
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { AppError } = require("../config/app");

/**
 * login using email address and password
 */

/* ARAPI-DOC
{
  path: '/v1/auth/login/email',
  title: 'Create a new - email',
  description: 'It should create a new user using is email',
  body: { email: 'string', password: 'string' },
  responseV1: { firstName: 'string', lastName: 'string', email: 'string', 'emailVerified': 'boolean', remember: 'boolean'},
  responseV2: { code: 'number', message: 'number', name: 'string' },
  cookies: { token: 'string' }
}
*/
AuthRouter.post("/login/email", async (req, res, next) => {
  try {
    const userInfo = req.body;

    const user = await userModel.findOne({
      email: userInfo.email,
    });

    if (!user || !user.validatePassword(userInfo.password)) {
      throw AppError.from({
        code: 400,
        message: 'Invalid email or password!'
      });
    }

    const info = JSON.parse(JSON.stringify(user));

    const token = jwt.sign(info, process.env.SUPER_SECRET_1);
    res.cookie("token", token, {
      expires: userInfo.remember ? new Date(Date.now() + 2592000000) : 0
    });

    res.json(info);
  } catch (err) {
    next(err);
  }
});

/**
 * logout
 */

/* ARAPI-DOC
{
  method: 'post',
  path: '/v1/auth/logout',
  title: 'Logout user',
  description: "Deletes loggedin user's logins",
  body: null,
  responseV1: { done: 'boolean' },
  responseV2: { code: 'number', message: 'number', name: 'string' },
}
*/
AuthRouter.post("/logout", (req, res, next) => {
  try {
    res.clearCookie("token");
    res.json({
      done: true,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = AuthRouter;