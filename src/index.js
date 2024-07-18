import { connectDB } from "./config/connection.db.js";
import { app } from "./app.js";
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server run at: http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.log("MongoDB connection FAILED: ", err);
  });
