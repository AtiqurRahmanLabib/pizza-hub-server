import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient } from "mongodb";

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Pizza Hub Server is Running!");
});

// mongodb connection

const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const mongoClient = await connectToMongoDB();
const db = mongoClient.db("pizzaHub");
const menuItemsCollection = db.collection("menu");

// Menu Api

app.get("/menu-items", async (req, res) => {
  const result = await menuItemsCollection.find().toArray();
  res.send(result);
});

// Server
app.listen(port, () => {
  console.log(`Pizza Hub Server running on port ${port}`);
});
