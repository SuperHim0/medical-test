import React, { useEffect, useState } from 'react';
// import { Card } from './Card';


const Assigntest = () => {
  const [tests, setTests] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('');

  // Fetch tests and patients on component mount
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch('https://pahology-lab-production.up.railway.app/api/tests');
        if (!response.ok) throw new Error('Failed to fetch tests');
        const data = await response.json();
        setTests(data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    const fetchPatients = async () => {
      try {
        const response = await fetch('https://pahology-lab-production.up.railway.app/api/patients');
        if (!response.ok) throw new Error('Failed to fetch patients');
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchTests();
    fetchPatients();
  }, []);

  const handleAssign = async () => {
    if (!selectedTestId || !selectedPatientId) {
      alert('Please select both a Test and a Patient!');
      return;
    }

    const url = `https://pahology-lab-production.up.railway.app/api/tests/setTest/${selectedPatientId}/${selectedTestId}`;
    try {
      const response = await fetch(url, { method: 'GET' });
      if (response.status === 426) { // HttpStatus.UPGRADE_REQUIRED
        const message = await response.text();
        alert(`Success: ${message}`);
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error assigning test to patient:', error);
      alert('Failed to assign test to patient.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-300 p-8">
      <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Assign Test to Patient</h2>
        <div className="space-y-4">
          <select
            value={selectedTestId}
            onChange={(e) => setSelectedTestId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Test</option>
            {tests.map((test) => (
              <option key={test.testId} value={test.testId}>
                {test.testName} {/* Assumes the test object has `id` and `name` properties */}
              </option>
            ))}
          </select>
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient.patientId} value={patient.patientId}>
                {patient.name} {/* Assumes the patient object has `id` and `name` properties */}
              </option>
            ))}
          </select>
          <button
            onClick={handleAssign}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Assign Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assigntest;
