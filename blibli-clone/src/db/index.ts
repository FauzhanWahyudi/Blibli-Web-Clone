import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MongoDB_URI;
// console.log("🚀 ~ uri:", uri);

if (!uri) throw new Error("MongoDB_URI env variable is required");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const db = client.db("Blibli_clone");
