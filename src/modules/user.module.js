import mongoose from "mongoose";
import { EMAIL_REGEX } from "../constants.js";
import bcryptjs from "bcryptjs";
import { userIdentifierHandler } from "../util/userIdentifierHandler.js";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
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
userSchema.methods.generateOTP = async function () {
  const OTP = Math.floor(10000 + Math.random() * 90000).toString();
  const expireTime = new Date();
  expireTime.setMinutes(expireTime.getMinutes() + 5); //Add 5 minutes

  this.verifyCode = OTP;
  this.verifyCodeExpiry = expireTime;
  this.save();
  return { OTP };
};
userSchema.statics.findUserByEmailOrUserName = async function (userIdentifier) {
  const { email, userName } = userIdentifierHandler(userIdentifier);
  const user = await this.findOne({
    $or: [{ userName }, { email }]
  }).select("-password");
  return { user };
};

export const User = mongoose.model("User", userSchema);
