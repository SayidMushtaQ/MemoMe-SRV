import { asynHandler } from "../../util/asynHandler.js";
import { ApiError } from "../../util/apiError.js";
import { ApiResponse } from "../../util/apiResponse.js";
import { User } from "../../modules/user.module.js";
import jwt from "jsonwebtoken";
export const setNewPassword = asynHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  if (newPassword === "") {
    throw new ApiError(400, "New password is required", [
      "Please fill up all necessary fields"
    ]);
  }
  if (newPassword.length < 6) {
    throw new ApiError(400, "At least set a 6 character password");
  }
  if (!token) {
    throw new ApiError(500, "Internal server error");
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);

  const { user } = await User.findUserByEmailOrUserName(decode.id);

  if (!user) {
    throw new ApiError(404, "User does not exist", ["Not Found"]);
  }

  user.password = newPassword;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { id: user.id }, "User password reset successfully"));
});
