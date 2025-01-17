import { MongoClient } from "mongodb";

const options = {};
const uri = process.env.NEXT_PUBLIC_BASE_URL1;

let client;

// In production, create a new client instance
client = new MongoClient(uri, options);

// Function to test the connection and log the result
const connectToDatabase = async () => {
  try {
    await client.connect();  // Try to connect to MongoDB
    console.log("Connected to MongoDB successfully!"); // Log success message
  } catch (error) {
    console.error("Error connecting to MongoDB:", error); // Log error message if connection fails
  }
};

// Run the function to test the connection
connectToDatabase();

// Export the MongoClient instance
export default client;
