import app from "./app.js";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";

async function server() {
  try {
    app.listen(env.PORT, () => {
      connectDb() // connect db
      console.log(`Server is running on ${env.PORT}`);
    });
  } catch (error) {
    console.log("Unable to connect server", error);
  }
}

server();