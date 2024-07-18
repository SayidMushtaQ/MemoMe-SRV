import mongoose from "mongoose";
import { BAD_WORD_REGEX } from "../constants.js";
const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [10, "Title must be at least 10 characters long"],
      maxlength: [90, "Title cannot be more than 90 characters long"],
      match: [
        BAD_WORD_REGEX,
        "The content cannot include offensive or inappropriate language."
      ]
    },
    description: {
      type: String,
      required: true,
      minlength: [10, "Description must be at least 20 characters long"],
      maxlength: [500, "Description cannot be more than 500 characters long"],
      match: [
        BAD_WORD_REGEX,
        "The content cannot include offensive or inappropriate language."
      ]
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", notesSchema);
