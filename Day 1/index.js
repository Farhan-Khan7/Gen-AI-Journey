import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.GROQ_API_KEY;


export const apiChecker = () => {
    if (!API_KEY) {
        console.error('Please set the GROQ_API_KEY in your .env file.');
        process.exit(1);
    }

}

export const checkOpenAI = async () => {
    const openai = (await import('openai')).default;

    const client = new openai.OpenAI({
        apiKey: API_KEY,
        baseURL: 'https://api.groq.com/openai/v1',
    });

    if (!client) {
        console.error('Failed to initialize OpenAI client.');
        process.exit(1);
    }

    console.log('OpenAI client initialized successfully.');
    return client;
}