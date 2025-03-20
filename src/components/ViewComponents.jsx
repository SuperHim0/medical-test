import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { Search } from 'lucide-react';

// Utility function to fetch or fallback to dummy data
const fetchDataWithFallback = async (apiEndpoint, fallbackData) => {
  try {
    const response = await fetch(apiEndpoint);
    if (response.ok) {
      const data = await response.json();
      return data.length ? data : fallbackData;
    }
    return fallbackData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return fallbackData;
  }
};

// View Tests Component
const ViewTests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const dummyTests = [
      { id: 1, testName: 'Blood Test', rate: 1200 },
      { id: 2, testName: 'Urine Analysis', rate: 800 },
      { id: 3, testName: 'Diabetes Test', rate: 1500 },
    ];

    fetchDataWithFallback('https://pahology-lab-production.up.railway.app/api/tests', dummyTests).then(setTests);
  }, []);

  const filteredTests = tests.filter(test =>
    test.testName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-300 p-8">
      <Card className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">View Tests</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search tests..."
              className="pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left border">Test ID</th>
                <th className="p-4 text-left border">Test Name</th>
                <th className="p-4 text-left border">Price</th>
                <th className="p-4 text-left border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.map(test => (
                <tr key={test.id} className="hover:bg-gray-50">
                  <td className="p-4 border">{test.testId}</td>
                  <td className="p-4 border">{test.testName}</td>
                  <td className="p-4 border">₹{test.rate}</td>
                  <td className="p-4 border">
                    <button className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// View SubTests Component
const ViewSubTests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [subTests, setSubTests] = useState([]);

  useEffect(() => {
    const dummySubTests = [
      { id: 1, testName: 'Blood Test', subtestName: 'Hemoglobin', units: 'g/dL', value: '12-15', range: '11-16' },
      { id: 2, testName: 'Blood Test', subtestName: 'WBC Count', units: 'k/µL', value: '4.5-11.0', range: '4.0-11.0' },
      { id: 3, testName: 'Urine Analysis', subtestName: 'pH Level', units: 'pH', value: '6.0', range: '4.5-8.0' },
    ];

    fetchDataWithFallback('https://pahology-lab-production.up.railway.app/api/subtest', dummySubTests).then(setSubTests);
  }, []);

  const filteredSubTests = subTests.filter(subTest =>
    (filter === 'all' || subTest.testName === filter)
  );

  const uniqueTests = [...new Set(subTests.map(st => st.testName))];

  return (
    <div className="min-h-screen bg-blue-300 p-8">
      <Card className="max-w-4xl mx-auto p-6">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">View SubTests</h2>
          <div className="flex gap-4">
            <select 
              className="p-2 border rounded-lg"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Tests</option>
              {uniqueTests.map(test => (
                <option key={test} value={test}>{test}</option>
              ))}
            </select>
            <div className="relative">
              <input
                type="text"
                placeholder="Search subtests..."
                className="pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left border">ID</th>
                <th className="p-4 text-left border">Test Name(id)</th>
                <th className="p-4 text-left border">Subtest Name</th>
                <th className="p-4 text-left border">Units</th>
                <th className="p-4 text-left border">Value</th>
                <th className="p-4 text-left border">Range</th>
                <th className="p-4 text-left border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubTests.map(subTest => (
                <tr key={subTest.id} className="hover:bg-gray-50">
                  <td className="p-4 border">{subTest.subTestId}</td>
                  <td className="p-4 border">{subTest.testId}</td>
                  <td className="p-4 border">{subTest.subTestName}</td>
                  <td className="p-4 border">{subTest.units}</td>
                  <td className="p-4 border">{subTest.value}</td>
                  <td className="p-4 border">{subTest.rangeValue}</td>
                  <td className="p-4 border">
                    <button className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Edit
                    </button>
                    <button 
                    onClick={() => (window.location.href = `https://pahology-lab-production.up.railway.app/delete/${subTest.subTestId}`)} 
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// View Patients Component
const ViewPatients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const dummyPatients = [
      {
        id: 1,
        srName: 'SR001',
        patientName: 'John Doe',
        age: 35,
        gender: 'Male',
        mobile: '1234567890',
        refBy: 'Dr. Smith',
        reportingDate: '2024-01-10',
      },
      {
        id: 2,
        srName: 'SR002',
        patientName: 'Jane Smith',
        age: 28,
        gender: 'Female',
        mobile: '9876543210',
        refBy: 'Dr. Johnson',
        reportingDate: '2024-01-11',
      },
    ];

    fetchDataWithFallback('https://pahology-lab-production.up.railway.app/api/patients', dummyPatients).then(setPatients);
  }, []);

  // const filteredPatients = patients.filter(patient =>
  //   patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   patient.srName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   patient.mobile.includes(searchTerm)
  // );
  const filteredPatients = patients.filter(patient => {
    const patientName = patient.patientName || ''; // Default to an empty string if undefined
    const srName = patient.srName || ''; // Default to an empty string if undefined
    const mobile = patient.mobile || ''; // Default to an empty string if undefined
  
    return (
      patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      srName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mobile.includes(searchTerm)
    );
  });

  return (
    <div className="min-h-screen bg-blue-300 p-8
">
      <Card className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">View Patients</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left border">ID</th>
                <th className="p-4 text-left border">SR Name</th>
                <th className="p-4 text-left border">Patient Name</th>
                <th className="p-4 text-left border">Age</th>
                <th className="p-4 text-left border">Gender</th>
                <th className="p-4 text-left border">Mobile</th>
                <th className="p-4 text-left border">Referred By</th>
                <th className="p-4 text-left border">Reporting Date</th>
                <th className="p-4 text-left border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(patient => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="p-4 border">{patient.patientId}</td>
                  <td className="p-4 border">{patient.srName}</td>
                  <td className="p-4 border">{patient.name}</td>
                  <td className="p-4 border">{patient.age}</td>
                  <td className="p-4 border">{patient.gender}</td>
                  <td className="p-4 border">{patient.mobile}</td>
                  <td className="p-4 border">{patient.refBy}</td>
                  <td className="p-4 border">{patient.reportingDate}</td>
                  <td className="p-4 border">
                    <button className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                      Delete
                    </button>
                    <button 
                    onClick={() => (window.location.href = `https://pahology-lab-production.up.railway.app/generate-cbc-pdf/${patient.patientId}`)} 
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-blue-600">
                      Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Export all components
export { ViewTests, ViewSubTests, ViewPatients };
