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
    },
    verifyCode: String,
    verifyCodeExpiry: Date
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcryptjs.compare(password, this.password);
};
userSchema.statics.generateOTP = async function (email) {
  const OTP = Math.floor(10000 + Math.random() * 90000).toString();
  const expireTime = new Date();
  expireTime.setMinutes(expireTime.getMinutes() + 5); //Add 5 minutes
  await this.findOneAndUpdate(
    { email },
    {
      verifyCode: OTP,
      verifyCodeExpiry: expireTime
    }
  );

  return { OTP };
};

export const User = mongoose.model("User", userSchema);
