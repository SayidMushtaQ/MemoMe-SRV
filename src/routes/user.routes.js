import express from "express";
import { userRegister } from "../controllers/User/userRegister.controller.js";
import { userLogin } from "../controllers/User/userLogin.controller.js";
import { sentVerifyCode } from "../controllers/User/sendVerificationCode.controller.js";
import { verifyOTP } from "../controllers/User/verifyOtp.controller.js";
import { forgotPassword } from "../controllers/User/forgotPassword.controller.js";

const route = express.Router();

route.route("/register").post(userRegister);
route.route("/login").post(userLogin);
route.route("/sentVerifyCode").post(sentVerifyCode);
route.route("/veifyotp").post(verifyOTP);
route.route("/forgotPassword").post(forgotPassword);

export default route;
