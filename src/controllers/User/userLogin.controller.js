import { asynHandler } from "../../util/asynHandler.js";
import { ApiError } from "../../util/apiError.js";
import { User } from "../../modules/user.module.js";
import { ApiResponse } from "../../util/apiResponse.js";
import { AuthToken } from "../../util/authTokenHandler.js";
import { userIdentifierHandler } from "../../util/userIdentifierHandler.js";

export const userLogin = asynHandler(async (req, res) => {
  const { userIdentifier, password } = req.body;
  const userToken = new AuthToken();

  if ([userIdentifier, password].some(val => val === "")) {
    throw new ApiError(400, "Email or userName ans password is required", [
      "Please fill up all necessary fields"
    ]);
  }
  const { email, userName } = userIdentifierHandler(userIdentifier.toLowerCase());
  const user = await User.findOne({
    $or: [{ userName }, { email }]
  });
  if (!user) {
    throw new ApiError(404, "User does not exist", ["Not Found"]);
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Wrong credentials", ["Unauthorized"]);
  }
  const userInfo = {
    id: user.id,
    userName: user.userName,
    email: user.email,
    isVerified: user.isVerified
  };

  const token = userToken.setUser(userInfo);
  return res
    .status(200)
    .cookie("authToken", token, {
      // secure: true,
      // httpOnly: true,
      // sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .json(
      new ApiResponse(
        200,
        { ...userInfo, token, redirectURI: "/user" },
        "Login successful"
      )
    );
});
