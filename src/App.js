import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PVAgent from './components/PVAgent';
import CompanyAgent from './components/CompanyAgent';
import Reviewer from './components/Reviewer';
import Navbar from './components/Navbar';
import NewPage from './components/NewPage'; // Import Navbar component

const App = () => {
  return (
    <Router>
    <Navbar /> {/* Render Navbar for all pages */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pv-agent" element={<PVAgent />} />
      <Route path="/company-agent" element={<CompanyAgent />} />
      <Route path="/reviewer" element={<Reviewer />} />
      <Route path='/review' element={<NewPage />} />
      {/* Add additional routes as needed */}
    </Routes>
  </Router>
    
  );
};

export default App;
