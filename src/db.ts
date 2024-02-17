import { config } from "dotenv";
import mongoose from "mongoose";
config()
mongoose.connect(process.env.DB_HOST || 'mongodb://127.0.0.1:27017/test')
export default mongoose