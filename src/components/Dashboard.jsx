import React from 'react';
import { BrowserRouter as Router,Link } from 'react-router-dom';


// Dashboard Component
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-pink-200 p-8">
      <div className="flex items-center justify-center  bg-blue-100">
        <h1 className="text-4xl font-bold text-blue-600 bg-white shadow-md py-4 px-8 rounded-lg border border-blue-300">
          Pathology Lab Application
        </h1>
      </div>
      <div className="max-w-2xl mx-auto grid grid-cols-2 gap-4">

        <Link to="/create-test">
          <button className="w-full p-4 bg-emerald-300 hover:bg-emerald-400 rounded-lg text-gray-800 font-medium">
            Create Test
          </button>
        </Link>
        <Link to="/view-test">
          <button className="w-full p-4 bg-emerald-300 hover:bg-emerald-400 rounded-lg text-gray-800 font-medium">
            View Test
          </button>
        </Link>
        <Link to="/create-subtest">
          <button className="w-full p-4 bg-emerald-300 hover:bg-emerald-400 rounded-lg text-gray-800 font-medium">
            Create SubTest
          </button>
        </Link>
        <Link to="/view-subtest">
          <button className="w-full p-4 bg-emerald-300 hover:bg-emerald-400 rounded-lg text-gray-800 font-medium">
            View SubTest
          </button>
        </Link>
        <Link to="/create-patient">
          <button className="w-full p-4 bg-emerald-300 hover:bg-emerald-400 rounded-lg text-gray-800 font-medium">
            Create Patient
          </button>
        </Link>
        <Link to="/view-patient">
          <button className="w-full p-4 bg-emerald-300 hover:bg-emerald-400 rounded-lg text-gray-800 font-medium">
            View Patient
          </button>
        </Link>
        <Link to="/AssignTest">
          <button className="w-full p-4 bg-emerald-300 hover:bg-emerald-400 rounded-lg text-gray-800 font-medium">
            Assign Test
          </button>
        </Link>
        <Link to="/UpdateSubTest">
          <button className="w-full p-4 bg-emerald-300 hover:bg-emerald-400 rounded-lg text-gray-800 font-medium">
            Update subTest
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;