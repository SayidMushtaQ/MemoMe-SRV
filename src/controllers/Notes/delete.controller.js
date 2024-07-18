import { asynHandler } from "../../util/asynHandler.js";
import { ApiError } from "../../util/apiError.js";
import { Note } from "../../modules/notes.module.js";
export const deleteNote = asynHandler(async (req, res) => {
  const { noteID } = req.body;

  if (!noteID) {
    //For safety
    throw new ApiError(404, "Note does not found!!", ["Something went wrong ..!!"]);
  }
  await Note.findByIdAndDelete(noteID);
  res.status(204).send();
});
