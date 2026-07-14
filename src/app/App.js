import Home from '../pages/Home/Home';
import Dashboard from '../pages/Dashboard/Dashboard';
import { Routes, Route } from "react-router-dom";
import Patients from "../pages/Patients/Patients";
import './App.css';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
      </Routes>
  );
}

export default App;
