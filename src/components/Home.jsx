import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

// Dashboard Component
const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 p-8">
      {/* Header */}
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700 bg-white shadow-lg py-5 px-10 rounded-lg border border-blue-400">
          Pathology Lab Application
        </h1>
      </div>

      {/* Navigation Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
        {[
          { path: '/create-test', label: 'Create Test' },
          { path: '/view-test', label: 'View Test' },
          { path: '/create-subtest', label: 'Create SubTest' },
          { path: '/view-subtest', label: 'View SubTest' },
          { path: '/create-patient', label: 'Create Patient' },
          { path: '/view-patient', label: 'View Patient' },
          { path: '/AssignTest', label: 'Assign Test' },
          { path: '/UpdateSubTest', label: 'Update SubTest' },
        ].map((item, index) => (
          <Link to={item.path} key={index}>
            <button className="w-full py-5 px-6 bg-emerald-400 hover:bg-emerald-500 rounded-lg text-gray-800 font-semibold text-lg shadow-md transition-transform transform hover:scale-105">
              {item.label}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
