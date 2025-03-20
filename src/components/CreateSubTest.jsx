// import { Card } from './Card';
// import React from 'react';

// const CreateSubTest = () => {
//   const [formData, setFormData] = React.useState({
//     testName: '',
//     subtestName: '',
//     units: '',
//     value: '',
//     range: '',
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:9876/api/subtest', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log('SubTest Data Saved:', data);
//       alert('SubTest data saved successfully!');
//     } catch (error) {
//       console.error('Error saving subtest data:', error);
//       alert('Failed to save subtest data.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-blue-300 p-8">
//       <Card className="max-w-md mx-auto p-6">
//         <h2 className="text-2xl font-bold text-center mb-6">Create SubTest</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <select
//             className="w-full p-2 border border-gray-300 rounded"
//             value={formData.testName}
//             onChange={(e) => setFormData({ ...formData, testName: e.target.value })}
//           >
//             <option value="">Select Test Name</option>
//             <option value="ca8f8b42-50fc-470d-8314-050a930e35b7">COMPLETE BLOOD COUNT</option>
//             <option value="c6ab3d97-51e6-4622-a8d2-e6e928289a7f">RBC Count</option>
//             <option value="c441c17b-569a-4ccc-81ae-099501b55899">Absolute Leucocyte Count</option>
//             <option value="272256ca-d69e-4d89-afd6-70a7d07ed29e">WBC Count</option>
//           </select>
//           {['subtestName', 'units', 'value', 'range'].map((field) => (
//             <input
//               key={field}
//               type="text"
//               placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//               className="w-full p-2 border border-gray-300 rounded"
//               value={formData[field]}
//               onChange={(e) =>
//                 setFormData({ ...formData, [field]: e.target.value })
//               }
//             />
//           ))}
//           <button
//             type="submit"
//             className="w-full bg-gray-200 hover:bg-gray-300 p-2 rounded"
//           >
//             Submit
//           </button>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default CreateSubTest;
import { Card } from './Card';
import React, { useEffect, useState } from 'react';

const CreateSubTest = () => {
  const [formData, setFormData] = useState({
    testId: '',
    subTestName: '',
    units: '',
    value: '',
    rangeValue: '',
  });
  const [testOptions, setTestOptions] = useState([]);

  // Fetch test names dynamically
  useEffect(() => {
    const fetchTestNames = async () => {
      try {
        const response = await fetch('https://pahology-lab-production.up.railway.app/api/tests');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setTestOptions(data);
      } catch (error) {
        console.error('Error fetching test names:', error);
        alert('Failed to fetch test names.');
      }
    };

    fetchTestNames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9876/api/subtest', {
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
          {/* Dropdown for selecting test name */}
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.testId}
            onChange={(e) => setFormData({ ...formData, testId: e.target.value })}
          >
            <option value="">Select Test Name</option>
            {testOptions.map((test) => (
              <option key={test.testId} value={test.testId}>
                {test.testName}
              </option>
            ))}
          </select>

          {/* Input fields for subtest details */}
          {['subTestName', 'units', 'value', 'rangeValue'].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field
                .replace(/([A-Z])/g, ' $1') // Add spaces before capital letters
                .replace(/^./, (str) => str.toUpperCase())} // Capitalize first letter
              className="w-full p-2 border border-gray-300 rounded"
              value={formData[field]}
              onChange={(e) =>
                setFormData({ ...formData, [field]: e.target.value })
              }
            />
          ))}

          {/* Submit button */}
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
