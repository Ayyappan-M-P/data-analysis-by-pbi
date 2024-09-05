import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure ReactDOM is imported correctly
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/HomePage';
import Analysis from './pages/AnalysisPage';
import Report from './pages/ReportPage';
import Dashboard from './components/Dashboard';
import ReportDisplay from './components/ReportDisplay'

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/report" element={<Report />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report-display" element={<ReportDisplay />} />
      
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root correctly
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
