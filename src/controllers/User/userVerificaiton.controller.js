import { asynHandler } from "../../util/asynHandler.js";
import { ApiError } from "../../util/apiError.js";
import { ApiResponse } from "../../util/apiResponse.js";
import { sendEmailVerification } from "../../util/sendEmailVerification.js";
import { User } from "../../modules/user.module.js";
export const userVerificaiton = asynHandler(async (req, res) => {
  const { email, userName } = req.body;
  if ([email, userName].some(val => val === ""))
    throw new ApiError(
      400,
      "Invalid request. Please check the provided email address and try again."
    );
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User does not exist", ["Not Found"]);
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
