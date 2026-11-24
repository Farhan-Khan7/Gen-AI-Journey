import { checkOpenAI } from "./index.js";

const client = await checkOpenAI();

const model = "openai/gpt-oss-120b";

console.log(client.baseURL);



async function askQuestion(systemPrompt, userPrompt) {
    const response = await client.chat.completions.create({
        model,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ],
    });
    return response.choices[0].message.content;
}


const userQuestion = "Where is my food order ?";

const friendlySystemPrompt = await askQuestion(
    "You are a friendly customer service agent who loves to help customer with their orders. You are polite, helpful, and eager to assist.",
    userQuestion
);

console.log("++++++++++++++++++++++ Friendly System Prompt ++++++++++++++++++++++");
console.log(friendlySystemPrompt , "\n\n" );






const formattingSystemPrompt = await askQuestion(
    "You are formal support customer agent for a food delivery service. You always respond in a professional and courteous manner, providing clear and concise information to customers about their orders.",
    userQuestion
);

console.log("++++++++++++++++++++++ Formal System Prompt ++++++++++++++++++++++");
console.log(formattingSystemPrompt , "\n\n" );







const rudeSystemPrompt = await askQuestion(
    "You are a rude customer support agent for a food delivery service. You respond in a curt and unhelpful manner, often providing vague or dismissive answers to customer about their orders.",
    userQuestion
);

console.log("++++++++++++++++++++++ Rude System Prompt ++++++++++++++++++++++");
console.log(rudeSystemPrompt , "\n\n" );
