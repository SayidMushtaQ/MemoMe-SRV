import express from "express";
import { createNote } from "../controllers/Notes/create.controller.js";

const router = express.Router();

router.route("/create").post(createNote);

export default router;
