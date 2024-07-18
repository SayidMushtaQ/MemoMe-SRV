import { asynHandler } from "../../util/asynHandler.js";
import { ApiError } from "../../util/apiError.js";
import { EMAIL_REGEX } from "../../constants.js";
import { User } from "../../modules/user.module.js";
import { ApiResponse } from "../../util/apiResponse.js";
export const userRegister = asynHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if ([userName, email, password].some(val => val === "")) {
    throw new ApiError(400, "All fields are required", [
      "Please fill up all necessary fields"
    ]);
  }
  if (!EMAIL_REGEX.test(email)) {
    throw new ApiError(400, "Please enter a valid email address", [
      "Email should be contained standard pattern"
    ]);
  }
  const isUserExist = await User.findOne({
    $or: [{ userName }, { email }]
  });
  if (isUserExist) {
    throw new ApiError(409, "User already exists", ["Conflict"]);
  }
  const newUser = await User.create({
    userName,
    email,
    password
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { userName: newUser.userName, email: newUser.email },
        "Data received sucessfully"
      )
    );
});
