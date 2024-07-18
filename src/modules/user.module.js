import mongoose from "mongoose";
import { EMAIL_REGEX } from "../constants.js";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [EMAIL_REGEX, "Please enter a valid email address"]
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "At least set 6 character password"]
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
