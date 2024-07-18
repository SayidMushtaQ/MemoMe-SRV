import mongoose from "mongoose";
import { EMAIL_REGEX } from "../constants.js";
import bcryptjs from "bcryptjs";

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

userSchema.pre("save", async function (next) {
  if (!this.isModified(this.password)) return next();
  this.password = await bcryptjs.hash(this.password);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
