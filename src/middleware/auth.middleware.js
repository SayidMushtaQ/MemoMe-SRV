import { asynHandler } from "../util/asynHandler.js";
import { AuthToken } from "../util/authTokenHandler.js";
import { ApiError } from "../util/apiError.js";
import { excludedAuthPaths } from "../constants.js";

export const requreAuthentication = asynHandler(async (req, res, next) => {
  const userToken = new AuthToken();
  if (excludedAuthPaths.includes(req.path)) return next();
  const token = req.cookies?.authToken || req.headers["authorization"].split(" ")[1];
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
