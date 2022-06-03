import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 9000,
  mongoDbUri: process.env.MONGO_DB_URI || "mongodb://localhost:27017/test",
  secret: process.env.SECRET || "secret",
};

export default config;
