// src/pages/InterviewPage.tsx (or wherever your pages live)

import React from 'react';
import InterviewList from '../components/InterviewList'; // Adjust path as needed

const InterviewPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your AI Interview Flows</h1>
      <InterviewList />
    </div>
  );
};

export default InterviewPage;
