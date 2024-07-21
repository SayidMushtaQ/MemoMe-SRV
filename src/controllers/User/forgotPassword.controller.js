import { asynHandler } from "../../util/asynHandler.js";
import { ApiError } from "../../util/apiError.js";
import { userIdentifierHandler } from "../../util/userIdentifierHandler.js";
import { User } from "../../modules/user.module.js";
import { sendEmailVerification } from "../../util/sendEmailVerification.js";

export const forgotPassword = asynHandler(async (req, res) => {
  /**
   * Forgot password
   * 1) Get email
   * 2) Validate email
   * 3) Verify is verify or not
   * 4) Send verify OTP email
   * 5) Send Res
   */
  const { userIdentifier } = req.body;
  console.log(userIdentifier);
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
  // const sendEmail = sendEmailVerification()
  // const isUserExist = await User.findOne({ email });
  // if (isUserExist) {
  //   throw new ApiError(409, "User already exists", ["Conflict"]);
  // }
  res.send("ok");
});
