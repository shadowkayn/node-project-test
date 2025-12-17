const mongoose = require("mongoose");
const logger = require("../utils/logger");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: process.env.DB_NAME, // 指定数据库名
      maxPoolSize: 10, // 连接池数量
      serverSelectionTimeoutMS: 5000, // 等待连接超时时间
    });

    logger.info("MongoDB connected successfully");
  } catch (err) {
    logger.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = { connectDB };
