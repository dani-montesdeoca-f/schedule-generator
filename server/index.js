import express from 'express';
import { getScheduleFromMistral } from './ai.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// app.post('/api/claude-schedule', async (req, res) => {
//     const { tasks } = req.body;
//     const schedule = await getScheduleFromChefClaude(tasks);
//     res.json({ schedule });
// });

app.post('/api/mistral-schedule', async (req, res) => {
    const { tasks } = req.body;
    const schedule = await getScheduleFromMistral(tasks);
    res.json({ schedule });
});

app.listen(5000, () => console.log('Server running on port 5000'));
