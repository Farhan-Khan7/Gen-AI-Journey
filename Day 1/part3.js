import { checkOpenAI } from "./index.js";

const client = await checkOpenAI();

const model = "openai/gpt-oss-120b";

console.log(client.baseURL);

const conversation = [];


async function askQuestion(systemPrompt, userPrompt, history = []) {
    const response = await client.chat.completions.create({
        model,
        messages: [
            { role: "system", content: systemPrompt },
            ...history,
            { role: "user", content: userPrompt },
        ],
    });

    history.push({ role: "user", content: userPrompt })
    history.push({
        role: "system",
        content: response.choices[0].message.content
    });
    return response.choices[0].message.content;
}



const userQuestion = "My name is Farhan khan. I am fresh out of college. How I can improve my engineering skills without focusing on coding?";

const response1 = await askQuestion(
    "You always respond like principal engineer, you are a senior engineer with 10 years of experience. You are very helpful and always provide detailed and clear answers to the user. Tell me 10 things point wise so I can do that. every point should be in 1 line.",
    userQuestion,
    conversation
)

console.log("++++++++++++++++++++++ Principal Engineer Response 1 ++++++++++++++++++++++");
console.log(response1, "\n\n");


const userQuestion2 = "Tell me my name ?";

const response2 = await askQuestion(
    "Respond in 1 Line .",
    userQuestion2,
    conversation
)


console.log("++++++++++++++++++++++ Principal Engineer Response 2 ++++++++++++++++++++++");
console.log(response2, "\n\n");