import { User } from "../../modules/user.module.js";
import { asynHandler } from "../../util/asynHandler.js";
import { ApiError } from "../../util/apiError.js";
import { ApiResponse } from "../../util/apiResponse.js";
import { verifyOTP } from "../../util/verifyOTP.js";
export const userVerifyOTP = asynHandler(async (req, res) => {
  const { email, otp } = req.body;

  if ([email, otp].some(val => val === "")) {
    throw new ApiError(400, "All fields are required", [
      "Please fill up all necessary fields"
    ]);
  }
  const user = await User.findOne({ email }).select(
    "id isVerified verifyCode verifyCodeExpiry"
  );
  if (!user) {
    throw new ApiError(404, "User does not exist", ["Not Found"]);
  }
  if (user.isVerified) {
    throw new ApiError(400, "User is already verified.");
  }
  const { isCodeValid, isCodeNotExpire } = verifyOTP(
    user.verifyCodeExpiry,
    user.verifyCode,
    otp
  );

  if (!isCodeValid) {
    throw new ApiError(400, "The provided OTP is not valid");
  }
  if (isCodeNotExpire) {
    throw new ApiError(400, "OTP has expired");
  }
  user.isVerified = true;
  user.verifyCode = null;
  user.save();

  return res.status(200).json(new ApiResponse(200, user, "OTP Verified successfully"));
});
