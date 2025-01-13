// App Component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import './index.css';
import CreateTest from "./components/CreateTest";
import CreateSubTest from "./components/CreateSubTest.jsx";
import CreatePatient from "./components/CreatePatient";

import { ViewTests, ViewSubTests, ViewPatients } from './components/ViewComponents';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-test" element={<CreateTest />} />
        <Route path="/create-subtest" element={<CreateSubTest />} />
        <Route path="/create-patient" element={<CreatePatient />} />
        <Route path="/view-test" element={<ViewTests />} />
       <Route path="/view-subtest" element={<ViewSubTests />} />
       <Route path="/view-patient" element={<ViewPatients />} />
      </Routes>
    </Router>
  );
};

export default App;