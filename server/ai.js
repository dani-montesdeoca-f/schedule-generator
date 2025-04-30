// import Anthropic from "@anthropic-ai/sdk";
import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';

dotenv.config();



// const anthropic = new Anthropic({
//     apiKey: process.env.ANTHROPIC_API_KEY
// });

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);
const SYSTEM_PROMPT = `
You are a helpful assistant that provides a schedule based on the tasks they provide. You will try to use every block with tips. Format your response in markdown to make it easier to render to a web page
`;

// export async function getRecipeFromChefClaude(ingredientsArr) {
//     const ingredientsString = ingredientsArr.join(", ");

//     const msg = await anthropic.messages.create({
//         model: "claude-3-haiku-20240307",
//         max_tokens: 1024,
//         system: SYSTEM_PROMPT,
//         messages: [
//             { role: "user", content: `I have ${ingredientsString}. Please give me a recipe!` },
//         ],
//     });
//     return msg.content[0].text;
// }

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a daily schedule you'd recommend to follow` },
            ],
            max_tokens: 1024,
        });
        return response.choices[0].message.content;
    } catch (err) {
        console.error("Hugging Face API Error:", err.message);
        return "Sorry, I couldn't generate a recipe at this time.";
    }
}
