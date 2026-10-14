import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://sotith1998_db_user:HOW33oNWLAJYYVFC@cluster0.gc1hith.mongodb.net/?appName=Cluster0",
);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client.db("seksaa");
  } catch (err) {
    console.dir(err);
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}
