import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.geminiApiKey;
const genAI = new GoogleGenerativeAI(apiKey);

// let chatHistory = []; // Store history here

// export function clearChat() {
//   chatHistory = [];
// }

async function generateText(prompt, chatHistoryFromEnd) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const geminiHistory = chatHistoryFromEnd.map((message) => ({
      role: message.role,
      parts: [{ text: message.content }], // Wrap content in a 'parts' array
    }));

    const chat = model.startChat({
      history: geminiHistory, // Use the correctly formatted history
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = await response.text();

    // chatHistory.push({ role: "user", content: prompt }); // Add user message to history
    // chatHistory.push({ role: "model", content: text }); // Add AI message to history

    return text;
  } catch (error) {
    console.error("Error generating text:", error);
    return "Error generating text. Please try again.";
  }
}

export default generateText;
