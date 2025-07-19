import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface InterviewFlow {
  interview_flow_id: string;
  title: string;
  org_name: string;
  questions: string[];
}

interface LeetCodeStats {
  username: string;
  profile: {
    realName: string;
    ranking: number;
  };
  submitStatsGlobal: {
    acSubmissionNum: {
      difficulty: string;
      count: number;
      submissions: number;
    }[];
  };
}

export default function CandidateOpenInterviews() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const [interviews, setInterviews] = useState<InterviewFlow[]>([]);
  const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🚀 Fetch open interviews
  useEffect(() => {
    if (!isAuthenticated) return;

    fetch('/api/open-interviews')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch interviews');
        return res.json();
      })
      .then((data) => {
        setInterviews(data.interview_flows);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [isAuthenticated]);

  // 💡 Optional: Fetch LeetCode stats for user
  useEffect(() => {
    if (!isAuthenticated) return;

    fetch('/api/leetcode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile { realName ranking }
            submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
          }
        }`,
        variables: { username: 'fjzzq2002' }, // 👈 Replace or make dynamic later
      }),
    })
      .then((res) => res.json())
      .then((data) => setLeetcodeStats(data.data.matchedUser))
      .catch((err) => console.error('LeetCode fetch error:', err));
  }, [isAuthenticated]);

  // 🔐 Auth gating
  if (!isAuthenticated) {
    return (
      <div className="p-4">
        <p>You must be logged in to view this page.</p>
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Open Interviews</h1>
        <p className="text-sm text-gray-600">Welcome, {user?.email}</p>
        <button
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          className="text-sm text-red-600 underline mt-2"
        >
          Log Out
        </button>
      </div>

      {loading ? (
        <p>Loading interviews...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : interviews.length === 0 ? (
        <p>No interviews available.</p>
      ) : (
        <ul className="space-y-4">
          {interviews.map((i) => (
            <li key={i.interview_flow_id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{i.title}</h2>
              <p className="italic mb-2">{i.org_name}</p>
              <p>
                Questions: {i.questions.length} &nbsp;|&nbsp;
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

      {leetcodeStats && (
        <div className="mt-6 p-4 border rounded shadow">
          <h2 className="text-lg font-bold mb-2">LeetCode Stats</h2>
          <p><strong>User:</strong> {leetcodeStats.username}</p>
          <p><strong>Real Name:</strong> {leetcodeStats.profile.realName || 'N/A'}</p>
          <p><strong>Ranking:</strong> {leetcodeStats.profile.ranking ?? 'N/A'}</p>
          <ul className="mt-2 list-disc list-inside text-sm">
            {leetcodeStats.submitStatsGlobal.acSubmissionNum.map((d) => (
              <li key={d.difficulty}>
                {d.difficulty}: {d.count} solved / {d.submissions} attempts
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
