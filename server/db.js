const mongoose = require("mongoose");
const logger = require("./middleware/logger");
const { DB_URL = "mongodb://127.0.0.1:27017/cars" } = process.env;

logger.info("DB_URL", DB_URL);

main().catch((err) => logger.error(err));

async function main() {
  try {
    await mongoose.connect(DB_URL);
    logger.info("DB Connected");
  } catch (err) {
    logger.error(err);
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
