// /pages/api/addComputation.js

import client from '../../lib/mongodb'; // Import MongoDB client

export default async function handler(req, res) {
  // Only handle POST requests for adding data
  if (req.method === 'POST') {
    const { A, B } = req.body;

    if (!A || !B) {
      return res.status(400).json({ error: 'Please provide values for A and B' });
    }

    try {
      await client.connect(); // Connect to MongoDB

      const db = client.db(); // Get the default database
      const collection = db.collection('FinalComputations'); // Get the collection

      // Create a new computation record
      const newComputation = {
        A,
        B,
        results: {
          add: A + B,
          subtract: A - B,
          multiply: A * B,
          divide: B !== 0 ? A / B : 'Cannot divide by zero',
        },
        createdAt: new Date(),
      };

      // Insert the new computation into the collection
      const result = await collection.insertOne(newComputation);

      // Return the inserted computation record
      res.status(200).json({ id: result.insertedId, ...newComputation });
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'Error during computation insertion' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
