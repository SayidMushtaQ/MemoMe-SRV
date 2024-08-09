import { asynHandler } from "../../util/asynHandler.js";
import { ApiResponse } from "../../util/apiResponse.js";
export const userProfile = asynHandler(async (req, res) => {
  const user = {
    id: req.user.id,
    userName: req.user.userName,
    email: req.user.email,
    isVerified: req.user.isVerified
  };
  res.status(200).json(new ApiResponse(200, { user }, "Data fetched sucessfully"));
});
