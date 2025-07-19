import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ribbonZogq from '@api/ribbon-zogq';

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.RIBBON_API_KEY;
if (!API_KEY) {
  throw new Error('Missing RIBBON_API_KEY in .env');
}

ribbonZogq.auth(API_KEY);

// In-memory store for candidate applications
const candidateApplications = [];

// Existing endpoint: create interview flow
app.post('/api/create-interview-flow', async (req, res) => {
  const { title, questions } = req.body;

  if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: 'Invalid title or questions' });
  }

  try {
    const response = await ribbonZogq.postV1InterviewFlows({
      org_name: 'myorg',  // replace with your org name
      title,
      questions,
      interview_type: 'recruitment',
      is_video_enabled: true,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Ribbon SDK error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Updated: get all interview flows via Ribbon SDK
app.get('/api/interview-flows', async (req, res) => {
  try {
    const response = await ribbonZogq.getV1InterviewFlows();
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Ribbon SDK error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// New: get open interviews (currently all flows)
app.get('/api/open-interviews', async (req, res) => {
  try {
    const response = await ribbonZogq.getV1InterviewFlows();
    // Add filtering here if needed to only open ones
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Ribbon SDK error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// New: candidate applies to an interview
app.post('/api/apply', (req, res) => {
  const { interview_flow_id, candidate_name, candidate_email } = req.body;

  if (!interview_flow_id || !candidate_name || !candidate_email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Store application in memory (replace with DB if needed)
  candidateApplications.push({
    interview_flow_id,
    candidate_name,
    candidate_email,
    applied_at: new Date().toISOString(),
  });

  console.log('New candidate application:', candidateApplications[candidateApplications.length - 1]);

  res.status(200).json({ message: 'Application received' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
