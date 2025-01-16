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
        createdAt: new Date(),
      };

      // Perform all operations concurrently using Promise.all
      const [addResult, subtractResult, multiplyResult, divideResult] = await Promise.all([
        new Promise((resolve) => resolve(A + B)),        // Addition
        new Promise((resolve) => resolve(A - B)),        // Subtraction
        new Promise((resolve) => resolve(A * B)),        // Multiplication
        new Promise((resolve) => resolve(B !== 0 ? (A / B).toFixed(2) : 'Cannot divide by zero')), // Division rounded to 2 decimal places
      ]);

      // Add results to computation object
      newComputation.results = {
        add: addResult,
        subtract: subtractResult,
        multiply: multiplyResult,
        divide: divideResult,
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
