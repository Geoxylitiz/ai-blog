import mongoose from "mongoose";
import { env, isEnvValid } from "./env";

let cachedConnection = null;

export const connectToDB = async () => {
    // Check if environment variables are valid
    if (!isEnvValid()) {
        throw new Error("Invalid environment variables. Check your .env file.");
    }
    
    // If we already have a connection, use it
    if (cachedConnection) {
        return cachedConnection;
    }
    
    try {
        const connection = await mongoose.connect(env.MONGO_DB_URI);
        console.log("✅ Connected to MongoDB");
        cachedConnection = connection;
        return connection;
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message);
        throw error;
    }
}

export default connectToDB;
