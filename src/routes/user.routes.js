import express from "express";
import { userRegister } from "../controllers/User/userRegister.controller.js";
import { userLogin } from "../controllers/User/userLogin.controller.js";
import { userVerificaiton } from "../controllers/User/userVerificaiton.controller.js";
import { userVerifyOTP } from "../controllers/User/userVerifyOTP.controller.js";
import { resetPassword } from "../controllers/User/reset-password.controller.js";
import { setNewPassword } from "../controllers/User/new-password.controller.js";
import { userProfile } from "../controllers/User/userProfile.controller.js";

const route = express.Router();

route.route("/register").post(userRegister);
route.route("/login").post(userLogin);
route.route("/user").get(userProfile);
route.route("/sentVerifyCode").post(userVerificaiton);
route.route("/verifyEmail").post(userVerifyOTP);
route.route("/reset-password").post(resetPassword);
route.route("/reset-password/:token").put(setNewPassword);

export default route;
