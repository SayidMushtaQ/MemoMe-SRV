import { asynHandler } from "../../util/asynHandler.js";
import { ApiError } from "../../util/apiError.js";
import { ApiResponse } from "../../util/apiResponse.js";
import { User } from "../../modules/user.module.js";
import { verifyOTP } from "../../util/verifyOTP.js";
export const resetPassword = asynHandler(async (req, res) => {
  /**
   * Reset Password
   * 1) Get Data
   * 2) Validate DAta and new password
   * 3) Find user - For security
   * 4) Check OTP
   * 5) Save the data
   */
  const { userIdentifier, newPassword, otp } = req.body;
  if ([newPassword, otp].some(val => val === "")) {
    throw new ApiError(400, "OTP and new password is required", [
      "Please fill up all necessary fields"
    ]);
  }
  if (!userIdentifier) {
    throw new ApiError(500, "Internal server error");
  }
  if (newPassword.length < 6) {
    throw new ApiError(400, "At least set a 6 character password");
  }
  const { user } = await User.findUserByEmailOrUserName(userIdentifier);
  if (!user) {
    throw new ApiError(404, "User does not exist", ["Not Found"]);
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
  user.password = newPassword;
  user.verifyCode = null;
  user.verifyCodeExpiry = null;
  user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, { id: user.id }, "User password reset successfully"));
});
