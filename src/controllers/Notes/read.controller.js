import { Note } from "../../modules/notes.module.js";
import { asynHandler } from "../../util/asynHandler.js";
import { ApiResponse } from "../../util/apiResponse.js";
import { ApiError } from "../../util/apiError.js";

export const readTodo = asynHandler(async (req, res) => {
  const { userId } = req.body; //TODO: Change According token

  if (!userId) {
    //For safety
    throw new ApiError(404, "User NOT Found!!", ["Something went wrong ..!!"]);
  }
  const notes = await Note.find({ createdBy: userId });

  return res
    .status(200)
    .json(new ApiResponse(200, { notes }, "All notes  have been fetched successfully"));
});
