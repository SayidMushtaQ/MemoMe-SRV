import { ApiError } from "../../util/apiError.js";
import { User } from "../../modules/user.module.js";
import { asynHandler } from "../../util/asynHandler.js";
import { ApiResponse } from "../../util/apiResponse.js";
import { sendEmailVerification } from "../../util/sendEmailVerification.js";
import jwt from "jsonwebtoken";
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
  const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "10m"
  });
  console.log({ resetToken });

  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
  console.log(resetUrl);
  const resEmail = await sendEmailVerification(user.email, user.userName, resetUrl);
  if (!resEmail.success) {
    throw new ApiError(500, "Something went wrong..!!", ["Internal Server Error"]);
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { message: resEmail.message },
        "Fortgot password URI has been sent to your email."
      )
    );
});
