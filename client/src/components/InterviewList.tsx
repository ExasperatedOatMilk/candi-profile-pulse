import React, { useEffect, useState } from 'react';

type InterviewFlow = {
  interview_flow_id: string;
  title: string;
  org_name: string;
  questions: string[];
  company_logo_url?: string | null;
};

const InterviewList = () => {
  const [flows, setFlows] = useState<InterviewFlow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlows = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/interview-flows'); // Proxy route
        const data = await res.json();
        setFlows(data.interview_flows);
      } catch (error) {
        console.error('Failed to fetch flows:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlows();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Interview Flows</h2>
      {flows.map((flow) => (
        <div
          key={flow.interview_flow_id}
          className="border p-4 rounded mb-4 shadow-sm bg-white"
        >
          <h3 className="text-lg font-semibold">{flow.title}</h3>
          <p className="text-sm text-gray-500">Organization: {flow.org_name}</p>
          {flow.company_logo_url && (
            <img
              src={flow.company_logo_url}
              alt="Logo"
              className="w-16 h-16 mt-2 object-contain"
            />
          )}
          <ul className="mt-2 list-disc list-inside">
            {flow.questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default InterviewList;
