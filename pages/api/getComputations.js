
import client from '../../lib/mongodb'; // Import MongoDB client

export default async function handler(req, res) {
  // Only handle GET requests for retrieving data
  if (req.method === 'GET') {
    try {
      await client.connect(); // Connect to MongoDB

      const db = client.db(); // Get the default database
      const collection = db.collection('FinalComputations'); // Get the collection

      // Fetch all computations from the collection
      const computations = await collection.find({}).toArray();

      // Return the computations
      res.status(200).json(computations);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching computations from database' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
