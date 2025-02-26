// src/services/api.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Load .env for Node.js standalone execution
if (typeof import.meta.env === 'undefined') {
    dotenv.config();
}

// Get API key from Vite (client-side) or process.env (Node.js)
const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(apiKey);

async function getMedicalAdvice(prompt) {
    if (!apiKey) {
        throw new Error('Gemini API key is not defined. Check your .env file.');
    }

    try {
        // Get the Gemini model (e.g., gemini-1.5-flash)
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash',
            systemInstruction:
            `
            You are a medical assistant providing general health advice based on user symptoms. Format your response strictly as follows, using clear section headers and numbered lists where applicable:

        ### Probable Causes
        List possible reasons for the symptoms, one per line. Start each line with "- " (dash and space). If no causes are identified, write "No specific causes identified."

        ### Advice
        Provide actionable steps the user can take, numbered as a list (e.g., "1. ", "2. "). If no specific advice applies, write "Monitor your symptoms and rest."

        ### Disclaimer
        Include a single-line disclaimer about consulting a professional, e.g., "Always consult a healthcare professional for an accurate diagnosis." Do not skip this section.

        Example response:
        ### Probable Causes
        - The user might be experiencing a common cold.
        - Could be a mild infection.
        ### Advice
        1. Rest well to help your body recover.
        2. Stay hydrated with water or tea.
        3. Consider ibuprofen for symptom relief.
        ### Disclaimer
        Always consult a healthcare professional for an accurate diagnosis.

        Stick to this structure exactly, even if some sections are minimal. Use concise, clear language suitable for a general audience.
      `
        });

        // Combine system instruction and user prompt

        // Generate response
        const result = await model.generateContent(prompt);
        const response = await result.response.text();

        console.log('Raw Response:', response);
        return response;
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw error;
    }
}

export { getMedicalAdvice };