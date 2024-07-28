import { asynHandler } from "../../util/asynHandler.js";
import { ApiError } from "../../util/apiError.js";
import { ApiResponse } from "../../util/apiResponse.js";
import { sendEmailVerification } from "../../util/sendEmailVerification.js";
import { User } from "../../modules/user.module.js";
export const userVerificaiton = asynHandler(async (req, res) => {
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

  const { OTP } = await user.generateOTP();

  const sentEmail = await sendEmailVerification(user.email, user.userName, OTP);
  if (!sentEmail.success) {
    throw new ApiError(
      500,
      "Something went wrong During Sending Email Verification...!!",
      ["Internal Server Error"]
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { message: sentEmail.message },
        "OTP has been sent to your email."
      )
    );
});
