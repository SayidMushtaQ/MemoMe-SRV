import { asynHandler } from "../../util/asynHandler.js";
export const resetPassword = asynHandler(async (req, res) => {
  res.send("ok");
});
