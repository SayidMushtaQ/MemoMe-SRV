import express from "express";
import { userRegister } from "../controllers/User/userRegister.controller.js";
import { userLogin } from "../controllers/User/userLogin.controller.js";
import { sentVerifyCode } from "../controllers/User/sendVerificationCode.controller.js";

const route = express.Router();

route.route("/register").post(userRegister);
route.route("/login").post(userLogin);
route.route("/sentVerifyCode").post(sentVerifyCode);

export default route;
