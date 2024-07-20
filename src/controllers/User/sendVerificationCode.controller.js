import { asynHandler } from "../../util/asynHandler.js";
import { ApiError } from "../../util/apiError.js";
import { ApiResponse } from "../../util/apiResponse.js";
import { sendEmailVerification } from "../../util/sendEmailVerification.js";
import { User } from "../../modules/user.module.js";
export const sentVerifyCode = asynHandler(async (req, res) => {
  const { email, userName } = req.body;
  if ([email, userName].some(val => val === ""))
    throw new ApiError(
      400,
      "Invalid request. Please check the provided email address and try again."
    );
  const OTP = Math.floor(10000 + Math.random() * 90000).toString();
  if (!OTP) {
    throw new ApiError(500, "Something went wrong..!!", ["Internal Server Error"]);
  }
  const sentEmail = await sendEmailVerification(email, userName, OTP);
  console.log(sentEmail);
  console.log(email);
  if (!sentEmail.success) {
    throw new ApiError(500, "Something went wrong..!!", ["Internal Server Error"]);
  }
  const expire = new Date();
  expire.setMinutes(expire.getMinutes() + 10);

  const userID = await User.findOneAndUpdate(
    { email },
    {
      verifyCode: OTP,
      verifyCodeExpiry: expire
    }
  ).select("id");
  console.log(userID);
  if (!userID) {
    throw new ApiError(
      500,
      "An error occurred while sending the OTP. Please try again later."
    );
  }
  return res
    .status(201)
    .json(new ApiResponse(200, userID, "OTP has been sent to your email."));
});
