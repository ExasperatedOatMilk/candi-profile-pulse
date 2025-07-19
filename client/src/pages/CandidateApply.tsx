import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CandidateApply() {
  const { interview_flow_id } = useParams<{ interview_flow_id: string }>();
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!candidateName || !candidateEmail) {
      setError('Please fill all fields');
      return;
    }

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interview_flow_id, candidate_name: candidateName, candidate_email: candidateEmail }),
      });
      if (!res.ok) throw new Error('Failed to apply');
      const data = await res.json();
      setMessage(data.message || 'Application submitted!');
      setCandidateName('');
      setCandidateEmail('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Apply to Interview</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            value={candidateName}
            onChange={e => setCandidateName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            value={candidateEmail}
            onChange={e => setCandidateEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Application
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}
