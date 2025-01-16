import { MongoClient } from "mongodb";

// Check if MONGODB_URI is set in the environment variables
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;

// Use global variable to preserve the MongoClient instance during development
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri, options);
  }
  client = global._mongoClient;
} else {
  // In production, create a new client instance
  client = new MongoClient(uri, options);
}

// Export the MongoClient instance
export default client;
