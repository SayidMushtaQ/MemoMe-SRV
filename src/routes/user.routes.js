import express from "express";
import { userRegister } from "../controllers/User/userRegister.controller.js";

const route = express.Router();

route.route("/login").post(userRegister);

export default route;
