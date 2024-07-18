import express from "express";
import { userRegister } from "../controllers/User/userRegister.controller.js";
import { userLogin } from "../controllers/User/userLogin.controller.js";

const route = express.Router();

route.route("/register").post(userRegister);
route.route("/login").post(userLogin);

export default route;
