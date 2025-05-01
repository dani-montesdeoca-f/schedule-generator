// import Anthropic from "@anthropic-ai/sdk";
import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';

dotenv.config();



// const anthropic = new Anthropic({
//     apiKey: process.env.ANTHROPIC_API_KEY
// });

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);
const SYSTEM_PROMPT = `
You are a helpful assistant that creates a daily study schedule based on a list of tasks provided. Organize the schedule using a markdown table with two columns: "Time" and "Task". Include brief helpful tips in the "Task" column when appropriate. The output must be valid markdown so it can be rendered on a web page. Do not include any explanation, only the table.
`;

// export async function getRecipeFromChefClaude(tasksArr) {
//     const tasksString = tasksArr.join(", ");

//     const msg = await anthropic.messages.create({
//         model: "claude-3-haiku-20240307",
//         max_tokens: 1024,
//         system: SYSTEM_PROMPT,
//         messages: [
//             { role: "user", content: `I have ${tasksString}. Please give me a Schedule!` },
//         ],
//     });
//     return msg.content[0].text;
// }

export async function getScheduleFromMistral(tasksArr) {
    const tasksString = tasksArr.join(", ");
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${tasksString}. Please give me a daily schedule you'd recommend to follow` },
            ],
            max_tokens: 1024,
        });
        return response.choices[0].message.content;
    } catch (err) {
        console.error("Hugging Face API Error:", err.message);
        return "Sorry, I couldn't generate a schedule at this time.";
    }
}
