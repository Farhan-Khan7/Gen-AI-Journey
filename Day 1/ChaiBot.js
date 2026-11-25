import { checkOpenAI } from "./index.js";
import readline from "readline";

const client = await checkOpenAI();

const model = "openai/gpt-oss-120b";

console.log(client.baseURL);


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const systemPrompt = `Your name is ChaiBot. You are a helpful assistant. You will answer questions in a clear and concise manner in 5 lines and provide information based on the user's input.`;

function askQuestion(userPrompt) {
    return new Promise((resolve) => {
        rl.question(userPrompt, (question) => {
            resolve(question);
        })
    })
}

const conversation = [];

while (true) {
    const userQuestion = await askQuestion("Ask a question: ");

    if(userQuestion.toLowerCase() === "exit") {
        console.log("Exiting...");
        rl.close();
        break;
    }

    const response = await client.chat.completions.create({
        model,
        stream: true,
        messages: [
            { role: "system", content: systemPrompt },
            ...conversation,
            { role: "user", content: userQuestion },
        ],
    })

    let responseText = "";
    
    for await (const chunk of response) {
        const content = chunk.choices[0].delta?.content;
        if (content) {
            process.stdout.write(content);
            responseText += content;
        }
        
    }
    conversation.push({ role: "user", content: userQuestion });
    conversation.push({ role: "assistant", content: responseText });
    console.log("\n");
}

rl.close();