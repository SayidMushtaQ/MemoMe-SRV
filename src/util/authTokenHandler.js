import jwt from "jsonwebtoken";
import { ApiError } from "./apiError.js";
export class AuthToken {
  setUser(user) {
    try {
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });
      return token;
    } catch (err) {
      console.log(err);
      throw new ApiError(500, "Caused Error while Generationg TOKEN:", [err]);
    }
  }
  getUser(token) {
    try {
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      return verify;
    } catch (err) {
      console.log(err);
      throw new ApiError(500, "Error Occurred While Retrieving TOKEN:", [err]);
    }
  }
}
