import React, { useState } from 'react';

const InterviewForm = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState('');
  const [interviewLink, setInterviewLink] = useState('');


  const createInterview = async () => {
    const questionsArray = questions.split('\n').map((q) => q.trim()).filter(Boolean);

    const res = await fetch('http://localhost:4000/api/create-interview-flow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        questions: questionsArray,
      }),
    });

    const data = await res.json();
    console.log('Ribbon Flow Response:', data);
  };


  
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">Create AI Interview</h2>

      <input
        type="text"
        placeholder="Job Title"
        className="w-full p-2 border rounded mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Enter questions, one per line"
        className="w-full p-2 border rounded mb-3 h-32"
        value={questions}
        onChange={(e) => setQuestions(e.target.value)}
      />

      <button
        onClick={createInterview}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Interview
      </button>

      {interviewLink && (
        <div className="mt-4">
          <p className="text-green-700 font-semibold">Interview ready:</p>
          <a href={interviewLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            Launch Interview
          </a>
        </div>
      )}
    </div>
  );
};

export default InterviewForm;
