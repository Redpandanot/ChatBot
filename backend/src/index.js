import express from "express";
import cors from "cors";
import generateText from "./chat.js";

const app = express();
const port = 3000;

let chatHistory = [];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from a Node.js server!" });
});

app.post("/ai", async (req, res) => {
  const prompt = req.body.prompt;
  const chatHistoryFromEnd = req.body.chatHistory;
  if (prompt === "exit") {
    chatHistory = [];
    clearChat();
    return res.json({ result: "Chat cleared" });
  }
  try {
    const result = await generateText(prompt, chatHistoryFromEnd);

    chatHistory.push({ role: "user", content: prompt });
    chatHistory.push({ role: "model", content: result });

    res.json({ result: result });
  } catch (error) {
    console.error("Error in /ai endpoint:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// app.get("/chat", (req, res) => {
//   try {
//     res.json({ history: chatHistory });
//   } catch (error) {
//     console.error("Error in /chat endpoint:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching chat history" }); // Send error status
//   }
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
