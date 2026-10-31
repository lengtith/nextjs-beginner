import { MongoClient } from "mongodb";

const USERNAME = process.env.MONGODB_USERNAME;
const PASSWORD = process.env.MONGODB_PASSWORD;

const client = new MongoClient(
  `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.gc1hith.mongodb.net/?appName=Cluster0`,
);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client.db("seksaa");
  } catch (err) {
    console.dir(err);
    // Re-throw so the route's catch returns a 500 instead of using an undefined db.
    throw err;
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}
