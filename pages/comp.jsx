import React from 'react';

const CompPage = ({ computations }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Computation Results</h1>
      
      {/* Total Computations Display */}
      <div className="mb-6 text-lg text-gray-700">
        <p>Total Computations: <span className="font-bold text-teal-600">{computations.length}</span></p>
      </div>

      {/* Check if computations exist */}
      {computations.length === 0 ? (
        <p className="text-center text-gray-500">No computations available.</p>
      ) : (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Computation ID</th>
                <th className="px-6 py-3">A</th>
                <th className="px-6 py-3">B</th>
                <th className="px-6 py-3">Addition</th>
                <th className="px-6 py-3">Subtraction</th>
                <th className="px-6 py-3">Multiplication</th>
                <th className="px-6 py-3">Division</th>
              </tr>
            </thead>
            <tbody>
              {computations.map((comp) => (
                <tr key={comp._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{comp._id}</td>
                  <td className="px-6 py-4">{comp.A}</td>
                  <td className="px-6 py-4">{comp.B}</td>
                  <td className="px-6 py-4">{comp.results.add}</td>
                  <td className="px-6 py-4">{comp.results.subtract}</td>
                  <td className="px-6 py-4">{comp.results.multiply}</td>
                  <td className="px-6 py-4">{comp.results.divide}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Fetch data on the server side
export async function getServerSideProps() {
  const res = await fetch('https://main.d3sojnxjwm1p4o.amplifyapp.com/api/getComputations');
  const computations = await res.json();

  return {
    props: {
      computations, // Pass the data to the page as a prop
    },
  };
}

export default CompPage;
