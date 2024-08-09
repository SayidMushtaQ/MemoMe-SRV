import express from "express";
import { userRegister } from "../controllers/User/userRegister.controller.js";
import { userLogin } from "../controllers/User/userLogin.controller.js";
import { userVerificaiton } from "../controllers/User/userVerificaiton.controller.js";
import { userVerifyOTP } from "../controllers/User/userVerifyOTP.controller.js";
import { forgotPassword } from "../controllers/User/forgotPassword.controller.js";
import { resetPassword } from "../controllers/User/resetPassword.controller.js";
import { userProfile } from "../controllers/User/userProfile.controller.js";

const route = express.Router();

route.route("/register").post(userRegister);
route.route("/login").post(userLogin);
route.route("/user").get(userProfile);
route.route("/sentVerifyCode").post(userVerificaiton);
route.route("/verifyEmail").post(userVerifyOTP);
route.route("/forgotPassword").post(forgotPassword);
route.route("/resetPassword").put(resetPassword);

export default route;
