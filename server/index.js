import express from 'express';
import { getRecipeFromMistral } from './ai.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// app.post('/api/claude-recipe', async (req, res) => {
//     const { ingredients } = req.body;
//     const recipe = await getRecipeFromChefClaude(ingredients);
//     res.json({ recipe });
// });

app.post('/api/mistral-recipe', async (req, res) => {
    const { ingredients } = req.body;
    const recipe = await getRecipeFromMistral(ingredients);
    res.json({ recipe });
});

app.listen(5000, () => console.log('Server running on port 5000'));
