import mongoose from "mongoose";

const USERNAME = process.env.MONGODB_USERNAME;
const PASSWORD = process.env.MONGODB_PASSWORD;

const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.gc1hith.mongodb.net/?appName=Cluster0`;

export async function connectToMongoDB() {
  try {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(uri, { dbName: process.env.MONGODB_DB });
  } catch (err) {
    console.dir(err);
    throw err;
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await mongoose.disconnect();
}
