import React from 'react';
import { Card } from './Card';

const CreatePatient = () => {
  const [formData, setFormData] = React.useState({
    srName: '',
    name: '',
    fatherName: '',
    age: '',
    gender: '',
    mobile: '',
    address: '',
    refBy: '',
    reportingDate: '',
    collectionDate: '',
    uhid: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://pahology-lab-production.up.railway.app/api/patients', {
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
      console.log('Patient Data Saved:', data);
      alert('Patient data saved successfully!');
    } catch (error) {
      console.error('Error saving patient data:', error);
      alert('Failed to save patient data.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-300 p-8">
      <Card className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Create Patient</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((field) => (
            <input
              key={field}
              type={field.includes('date') ? 'date' : 'text'}
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

export default CreatePatient;

  