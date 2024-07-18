import { asynHandler } from "../../util/asynHandler.js";
import { ApiError } from "../../util/apiError.js";
import { CONTENT_FILTER_REGEX } from "../../constants.js";
import { Note } from "../../modules/notes.module.js";
import { ApiResponse } from "../../util/apiResponse.js";

export const updateNote = asynHandler(async (req, res) => {
  const { title, description, noteID } = req.body;
  if ([title, description].some(val => val === "")) {
    throw new ApiError(
      400,
      "The title or description fields are required and cannot be left empty",
      ["Please fill up all necessary fields"]
    );
  }
  if (CONTENT_FILTER_REGEX.test(`${title} ${description}`)) {
    throw new ApiError(400, "Content contains inappropriate or sexual context.", [
      "Please follow the guidelines"
    ]);
  }
  if (!noteID) {
    throw new ApiError(400, "An error has occurred. Please try again.");
  }
  const note = await Note.findById(noteID);
  if (note.title === title && note.description === description) {
    return res.status(200).json(
      new ApiResponse(200, note, {
        message: "Note updated successfully",
        noteID: note._id
      })
    );
  }
  const updatedNote = await Note.findByIdAndUpdate(
    noteID,
    { title, description },
    { new: true }
  );
  return res.status(200).json(
    new ApiResponse(200, updatedNote, {
      message: "Note updated successfully",
      noteID: updatedNote._id
    })
  );
});
