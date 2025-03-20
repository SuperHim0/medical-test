// App Component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import './index.css';
import CreateTest from "./components/CreateTest";
import CreateSubTest from "./components/CreateSubTest.jsx";
import CreatePatient from "./components/CreatePatient";
import AssignTest from "./components/Assigntest.jsx";
import UpdateSubTest from './components/UpdateSubTest.jsx';
import Home from './components/Home.jsx'

import { ViewTests, ViewSubTests, ViewPatients } from './components/ViewComponents';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-test" element={<CreateTest />} />
        <Route path="/create-subtest" element={<CreateSubTest />} />
        <Route path="/create-patient" element={<CreatePatient />} />
        <Route path="/view-test" element={<ViewTests />} />
       <Route path="/view-subtest" element={<ViewSubTests />} />
       <Route path="/view-patient" element={<ViewPatients />} />
       <Route path="/AssignTest" element={<AssignTest />} /> 
       <Route path="/UpdateSubTest" element={<UpdateSubTest/>} />
      </Routes>
    </Router>
  );
};

export default App;