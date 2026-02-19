import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    console.error(
      "Hint: If using MongoDB Atlas, ensure your IP is whitelisted in Network Access."
    );
    console.error("WARNING: Server is running without a database connection. API calls requiring DB will fail.");
  }
};
