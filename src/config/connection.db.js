import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
export const connectDB = async () => {
  try {
    const connectionInstence = await mongoose.connect(
      `${process.env.MONGODB_SRC}/${DB_NAME}`
    );
    console.log("MongoDB Connected..!! DB HOST: ", connectionInstence.connection.host);
  } catch (err) {
    console.log("MongoDB connection FAILED: ", err);
    process.exit(1);
  }
};
