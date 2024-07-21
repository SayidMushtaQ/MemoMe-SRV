import { ApiError } from "../../util/apiError.js";
import { User } from "../../modules/user.module.js";
import { asynHandler } from "../../util/asynHandler.js";
import { ApiResponse } from "../../util/apiResponse.js";
import { userIdentifierHandler } from "../../util/userIdentifierHandler.js";
import { sendEmailVerification } from "../../util/sendEmailVerification.js";

export const forgotPassword = asynHandler(async (req, res) => {
  const { userIdentifier } = req.body;
  if (!userIdentifier) {
    throw new ApiError(400, "Email or userName is required", [
      "Please fill up all necessary fields"
    ]);
  }
  const { email, userName } = userIdentifierHandler(userIdentifier);
  const user = await User.findOne({
    $or: [{ userName }, { email }]
  }).select("id isVerified");
  if (!user) {
    throw new ApiError(404, "User does not exist", ["Not Found"]);
  }
  if (!user.isVerified) {
    throw new ApiError(403, "User not verified");
  }
  const { OTP } = await user.generateOTP();
  const sentEmail = await sendEmailVerification(email, userName, OTP);
  if (!sentEmail.success) {
    throw new ApiError(500, "Something went wrong..!!", ["Internal Server Error"]);
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
