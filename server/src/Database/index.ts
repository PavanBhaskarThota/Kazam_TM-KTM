import mongoose from "mongoose";
import 'dotenv/config'

export const connectDB = mongoose.connect(process.env.MONGO_URL as string)

