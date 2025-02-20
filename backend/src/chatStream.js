import dotenv from "dotenv";
dotenv.config();

import readline from "readline";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.geminiApiKey;
const genAI = new GoogleGenerativeAI(apiKey);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let isAwaitingResponse = false;

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const chat = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 500,
    },
  });

  async function askAndRespond() {
    if (!isAwaitingResponse) {
      rl.question("You: ", async (msg) => {
        if (msg.toLowerCase() === "exit") {
          rl.close();
        } else {
          isAwaitingResponse = true;
          try {
            const result = await chat.sendMessageStream(msg);
            process.stdout.write("AI: "); // Initial "AI: " prefix

            for await (const chunk of result.stream) {
              const chunkText = await chunk.text();
              process.stdout.write(chunkText); // Write the chunk without a newline
            }

            process.stdout.write("\n"); // Add a newline at the end of the response
            isAwaitingResponse = false;
            askAndRespond();
          } catch (error) {
            console.error("Error:", error);
            isAwaitingResponse = false;
          }
        }
      });
    }
  }

  askAndRespond();
}

run();
