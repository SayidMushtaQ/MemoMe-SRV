import { ApiError } from "../../util/apiError.js";
import { User } from "../../modules/user.module.js";
import { asynHandler } from "../../util/asynHandler.js";
import { ApiResponse } from "../../util/apiResponse.js";
import { sendEmailVerification } from "../../util/sendEmailVerification.js";
import crypto from "crypto-js";
export const resetPassword = asynHandler(async (req, res) => {
  const { userIdentifier } = req.body;
  if (!userIdentifier) {
    throw new ApiError(400, "Email or userName is required", [
      "Please fill up all necessary fields"
    ]);
  }
  const { user } = await User.findUserByEmailOrUserName(userIdentifier.toLowerCase());

  if (!user) {
    throw new ApiError(404, "User does not exist", ["Not Found"]);
  }
  if (!user.isVerified) {
    throw new ApiError(403, "User not verified");
  }
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  const resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  console.log({ resetToken }, { resetPasswordToken }, { resetPasswordExpire });
  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordExpire = resetPasswordExpire;
  await user.save();
  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

  const sentEmail = await sendEmailVerification(user.email, user.userName, resetUrl);
  if (!sentEmail.success) {
    throw new ApiError(500, "Something went wrong..!!", ["Internal Server Error"]);
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { message: sentEmail.message },
        "Fortgot password OTP has been sent to your email."
      )
    );
});
