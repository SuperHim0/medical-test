import React, { useState, useEffect } from 'react';

const UpdateSubTestValue = () => {
  const [tests, setTests] = useState([]);
  const [subTests, setSubTests] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState('');
  const [selectedSubTestId, setSelectedSubTestId] = useState('');
  const [subTestValue, setSubTestValue] = useState('');

  // Fetch tests from API
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch('https://pahology-lab-production.up.railway.app/api/tests');
        if (!response.ok) {
          throw new Error('Error fetching tests');
        }
        const data = await response.json();
        setTests(data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };
    fetchTests();
  }, []);

  // Fetch subtests when a test is selected
  useEffect(() => {
    if (selectedTestId) {
      const fetchSubTests = async () => {
        try {
          const response = await fetch('https://pahology-lab-production.up.railway.app/api/subtest');
          if (!response.ok) {
            throw new Error('Error fetching subtests');
          }
          const data = await response.json();
          const filteredSubTests = data.filter(subTest => subTest.testId === selectedTestId);
          setSubTests(filteredSubTests);
        } catch (error) {
          console.error('Error fetching subtests:', error);
        }
      };
      fetchSubTests();
    } else {
      setSubTests([]);
    }
  }, [selectedTestId]);

  const handleTestChange = (e) => {
    setSelectedTestId(e.target.value);
  };

  const handleSubTestChange = (e) => {
    setSelectedSubTestId(e.target.value);
  };

  const handleValueChange = (e) => {
    setSubTestValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSubTestId || !subTestValue) {
      alert('Please select a subtest and provide a value.');
      return;
    }

    try {
      const response = await fetch(`https://pahology-lab-production.up.railway.app/api/subtest/setValue/${selectedSubTestId}/${subTestValue}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to update subtest value');
      }

      const data = await response.json();
      console.log('SubTest value updated:', data);
      alert('SubTest value updated successfully!');
    } catch (error) {
      console.error('Error updating subtest value:', error);
      alert('Failed to update subtest value.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-300 p-8">
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold text-center mb-6">Update SubTest Value</h2>

        {/* Select Test */}
        <select
          value={selectedTestId}
          onChange={handleTestChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="">Select Test</option>
          {tests.map((test) => (
            <option key={test.testId} value={test.testId}>
              {test.testName}
            </option>
          ))}
        </select>

        {/* Select SubTest */}
        {selectedTestId && (
          <select
            value={selectedSubTestId}
            onChange={handleSubTestChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          >
            <option value="">Select SubTest</option>
            {subTests.map((subTest) => (
              <option key={subTest.subTestId} value={subTest.subTestId}>
                {subTest.subTestName}
              </option>
            ))}
          </select>
        )}

        {/* Enter New Value */}
        {selectedSubTestId && (
          <div className="mb-4">
            <label htmlFor="subTestValue" className="block text-sm font-semibold">New Value</label>
            <input
              id="subTestValue"
              type="text"
              value={subTestValue}
              onChange={handleValueChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}
        {/* <div> */}
        {/* <label className="block mb-2 font-semibold">Range Reference:</label>
            <input
              type="text"
              className="w-full p-2 border rounded bg-gray-100"
              value={selectedSubTestId.rangeValue}
              disabled
            />
        </div> */}
        


        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Update SubTest Value
        </button>

        
      </div>
      
    </div>
  );
};

export default UpdateSubTestValue;
