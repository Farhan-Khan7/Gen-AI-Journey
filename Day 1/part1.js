import { checkOpenAI } from "./index.js";

const client = await checkOpenAI();

const model = "openai/gpt-oss-120b";

// console.log(client.baseURL);


const system_prompt = "";
const user_prompt = "";


const response = await client.chat.completions.create({
    model,
    messages: [
        {
            role : "system",
            content : "You are a helpful assistant that provides infromation about the OpenAI API."
        },
        {
            role : "user",
            content : "Tell me name of first scientist in islamic history ? "
        }
    ]
})

console.log(response.choices[0].message.content);

const usage_stats = {
    prompt_tokens: response.usage.prompt_tokens,
    completions_tokens: response.usage.completion_tokens,
    total_tokens: response.usage.total_tokens
}


console.log("++++++++++++++++++++++ Usage Stats ++++++++++++++++++++++");
console.log(usage_stats);