import { asynHandler } from "../util/asynHandler.js";
import { AuthToken } from "../util/authTokenHandler.js";
import { ApiError } from "../util/apiError.js";
import { excludedAuthPaths } from "../constants.js";

export const requreAuthentication = asynHandler(async (req, res, next) => {
  const userToken = new AuthToken();
  if (excludedAuthPaths.includes(req.path)) return next();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjYzZWNmNGY1ZThhMzM3OTQ4ZjIwYyIsInVzZXJOYW1lIjoibXVzdGFrMDA5MzIiLCJlbWFpbCI6Im1zazU4MDQ5QGdtYWlsLmNvbSIsImlzVmVyaWZpZWQiOnRydWUsImlhdCI6MTcyMzM1MTg3MCwiZXhwIjoxNzIzOTU2NjcwfQ.8dw7AV4JtGjGeDP5lNQ-k1gpBvTxZLa9IPS3oeCIA5I";
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
