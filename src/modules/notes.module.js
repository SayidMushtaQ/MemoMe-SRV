import mongoose from "mongoose";
import { CONTENT_FILTER_REGEX } from "../constants.js";
const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [10, "Title must be at least 10 characters long"],
      maxlength: [90, "Title cannot be more than 90 characters long"],
      validate: {
        validator: function (v) {
          return !CONTENT_FILTER_REGEX.test(v);
        },
        message: props => `Content contains prohibited sexual material: ${props.value} `
      }
    },
    description: {
      type: String,
      required: true,
      minlength: [10, "Description must be at least 20 characters long"],
      maxlength: [500, "Description cannot be more than 500 characters long"],
      validate: {
        validator: function (v) {
          return !CONTENT_FILTER_REGEX.test(v);
        },
        message: props => `Content contains prohibited sexual material: ${props.value} `
      }
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", notesSchema);
