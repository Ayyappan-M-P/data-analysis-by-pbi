// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import HomePage from './pages/HomePage';
// import AnalysisPage from './pages/AnalysisPage';
// import ReportPage from './pages/ReportPage';

// import './App.css';
// import Dashboard from './components/Dashboard';
// import ReportDisplay from './components/ReportDisplay'

// const App = () => {
//   return (
//     <Router>
//       <NavBar />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/analysis" element={<AnalysisPage />} />
//         <Route path="/report" element={<ReportPage />} />
//         <Route path="/dashboard" element={<Dashboard/>} />
//         <Route path="/report-display" element={<ReportDisplay />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';
import ReportPage from './pages/ReportPage';
import Dashboard from './components/Dashboard';
import ReportDisplay from './components/ReportDisplay';

import './App.css';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report-display" element={<ReportDisplay />} />
      </Routes>
    </Router>
  );
};

export default App;
