import { asynHandler } from "../../util/asynHandler.js";
import { ApiError } from "../../util/apiError.js";
import { CONTENT_FILTER_REGEX } from "../../constants.js";
import { User } from "../../modules/user.module.js";
import { Note } from "../../modules/notes.module.js";
import { ApiResponse } from "../../util/apiResponse.js";

export const createNote = asynHandler(async (req, res) => {
  const { title, description } = req.body;
  const { id: userID } = req.user;
  if ([title, description, userID].some(val => val === "")) {
    throw new ApiError(400, "All fields are required", [
      "Please fill up all necessary fields"
    ]);
  }

  if (CONTENT_FILTER_REGEX.test(`${title} ${description}`)) {
    throw new ApiError(400, "Content contains inappropriate or sexual context.", [
      "Please follow the guidelines"
    ]);
  }
  const user = await User.findById({ _id: userID }).select("_id");
  if (!user) {
    throw new ApiError(404, "User does not exist.");
  }
  const newNote = await Note.create({
    title,
    description,
    createdBy: user.id
  });

  return res
    .status(201)
    .json(new ApiResponse(200, newNote, "Note created successfully."));
});
