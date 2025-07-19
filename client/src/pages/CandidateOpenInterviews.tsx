import React, { useEffect, useState } from 'react';

interface InterviewFlow {
  interview_flow_id: string;
  title: string;
  org_name: string;
  questions: string[];
}

export default function CandidateOpenInterviews() {
  const [interviews, setInterviews] = useState<InterviewFlow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/open-interviews')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setInterviews(data.interview_flows);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading interviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Open Interviews</h1>
      {interviews.length === 0 ? (
        <p>No interviews available.</p>
      ) : (
        <ul className="space-y-4">
          {interviews.map(i => (
            <li key={i.interview_flow_id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{i.title}</h2>
              <p className="italic mb-2">{i.org_name}</p>
              <p>
                Questions: {i.questions.length} &nbsp;|&nbsp;{' '}
                <a
                  href={`https://app.ribbon.ai/interview/${i.interview_flow_id}`}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Interview
                </a>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
