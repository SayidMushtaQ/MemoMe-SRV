import { asynHandler } from "../util/asynHandler.js";
import { AuthToken } from "../util/authTokenHandler.js";
import { ApiError } from "../util/apiError.js";
import { excludedAuthPaths } from "../constants.js";

export const requreAuthentication = asynHandler(async (req, res, next) => {
  const userToken = new AuthToken();
  console.log(req.path);
  if (excludedAuthPaths.includes(req.path)) {
    console.log("Exclude paths");
    return next();
  }
  const token = req.cookies?.authToken;
  console.log("Autho token", req.cookies.authToken);
  req.user = null;
  if (!token)
    throw new ApiError(
      401,
      "Access denied. No token provided. Please log in to obtain a token.",
      ["Unauthorized"]
    );
  const localUser = userToken.getUser(token);
  if (!localUser)
    throw new ApiError(401, "Access denied. Please log in to continue.", [
      "Unauthorized"
    ]);
  req.user = localUser;
  return next();
});
