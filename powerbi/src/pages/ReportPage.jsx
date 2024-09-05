// src/pages/ReportPage.js or src/components/Dashboard.js
import React from 'react';
import EmbedPowerBI from '../components/EmbedPowerBI';

const ReportPage = () => {
  return (
    <div>
      <h2>Analysis Report</h2>
      <EmbedPowerBI />
    </div>
  );
};

export default ReportPage;
