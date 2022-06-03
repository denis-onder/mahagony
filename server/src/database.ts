import mongoose from "mongoose";
import config from "./config";

export async function connect() {
  try {
    await mongoose.connect(config.mongoDbUri);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
