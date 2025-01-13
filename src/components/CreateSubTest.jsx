import { Card } from './Card';
import React from 'react';

const CreateSubTest = () => {
  const [formData, setFormData] = React.useState({
    testName: '',
    subtestName: '',
    units: '',
    value: '',
    range: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://your-api-endpoint.com/subtests', {
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
      console.log('SubTest Data Saved:', data);
      alert('SubTest data saved successfully!');
    } catch (error) {
      console.error('Error saving subtest data:', error);
      alert('Failed to save subtest data.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-300 p-8">
      <Card className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Create SubTest</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.testName}
            onChange={(e) => setFormData({ ...formData, testName: e.target.value })}
          >
            <option value="">Select Test Name</option>
            <option value="test1">Test 1</option>
            <option value="test2">Test 2</option>
          </select>
          {['subtestName', 'units', 'value', 'range'].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full p-2 border border-gray-300 rounded"
              value={formData[field]}
              onChange={(e) =>
                setFormData({ ...formData, [field]: e.target.value })
              }
            />
          ))}
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

export default CreateSubTest;
