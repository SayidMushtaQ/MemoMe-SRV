import express from "express";
import { DATA_LIMIT, API_URL } from "./constants.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN, "http://localhost:5173"],
    credentials: true
  })
);

app.use(express.json({ limit: DATA_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: DATA_LIMIT }));
app.use(express.static("public"));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));
app.use(requreAuthentication);

import userRouter from "./routes/user.routes.js";
import noteRoter from "./routes/note.routes.js";
import { requreAuthentication } from "./middleware/auth.middleware.js";

app.use(`${API_URL}/auth`, userRouter);
app.use(`${API_URL}/note`, noteRoter);

export { app };
