import React from 'react';
import { Card } from './Card';

const CreateTest = () => {
  const [formData, setFormData] = React.useState({
    testName: '',
    testPrice: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://your-api-endpoint.com/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Test Data Saved:', data);
      alert('Test data saved successfully!');
    } catch (error) {
      console.error('Error saving test data:', error);
      alert('Failed to save test data.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-300 p-8">
      <Card className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Create Test</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Test Name"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.testName}
              onChange={(e) => setFormData({ ...formData, testName: e.target.value })}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Test Price"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.testPrice}
              onChange={(e) => setFormData({ ...formData, testPrice: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-200 hover:bg-gray-300 p-2 rounded"
          >
            Submit
          </button>
        </form>
      </Card>
    </div>
  );
};

export default CreateTest;
