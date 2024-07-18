import express from "express";
import { createNote } from "../controllers/Notes/create.controller.js";
import { readTodo } from "../controllers/Notes/read.controller.js";
import { updateNote } from "../controllers/Notes/update.controller.js";
import { deleteNote } from "../controllers/Notes/delete.controller.js";

const router = express.Router();

router.route("/create").post(createNote);
router.route("/notes").get(readTodo);
router.route("/update").patch(updateNote);
router.route("/delete").delete(deleteNote);

export default router;
