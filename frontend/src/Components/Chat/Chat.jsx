import { useState, useEffect, useRef } from "react";
import "./Chat.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";

function Chat({
  id,
  globalChatHistory,
  handleChatUpdate,
  handleAddAnotherChat,
}) {
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState();
  const [editedValue, setEditedValue] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    setChatHistory(globalChatHistory[id] || []);
  }, [id, globalChatHistory]);

  // useEffect(() => {
  //   const fetchChatHistory = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/chat");
  //       if (response.data.history) {
  //         setChatHistory(response.data.history);
  //         handleChatUpdate(id, response.data.history);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching chat history:", error);
  //     }
  //   };

  //   fetchChatHistory();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    await makeApiCall(inputValue, chatHistory);
  };

  const makeApiCall = async (inputValue, chatHistory) => {
    try {
      const response = await axios.post("http://localhost:3000/ai", {
        prompt: inputValue,
        chatHistory: chatHistory,
      });
      if (inputValue === "exit") {
        setChatHistory([]);
        handleChatUpdate(id, []);
        setInputValue("");
        return;
      }

      const newHistory = [
        ...chatHistory,
        { role: "user", content: inputValue },
        {
          role: "model",
          content: response.data.result || "Error getting response",
        },
      ];
      setChatHistory(newHistory);
      handleChatUpdate(id, newHistory);
      setInputValue("");
    } catch (error) {
      console.error("Error calling /ai endpoint:", error);
      setChatHistory([
        ...chatHistory,
        { role: "model", content: "Error getting response" },
      ]);
      handleChatUpdate([
        ...chatHistory,
        { role: "model", content: "Error getting response" },
      ]);
    }
  };

  const handleRegenerate = async (index) => {
    const newHistory = chatHistory.slice(0, index - 1);
    const prompt = chatHistory[index - 1].content;
    setInputValue(prompt);
    setChatHistory(newHistory);
    await makeApiCall(prompt, newHistory);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Only submit on Enter (no Shift)
      e.preventDefault();
      handleSubmit(e); // Manually call handleSubmit
    } else if (e.key === "Enter" && e.shiftKey) {
      setInputValue((prevInputValue) => prevInputValue + "\n");
      e.preventDefault();
    }
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent main form submission
      handleReSubmit(e); // Call the edit form's submit handler
    } else if (e.key === "Enter" && e.shiftKey) {
      setEditedValue((prevInputValue) => prevInputValue + "\n");
      e.preventDefault();
    }
  };

  const handleBranchClicked = (index) => {
    const branchHistory = chatHistory.slice(0, index + 1);
    handleAddAnotherChat(branchHistory);
  };

  const handleEdit = (index) => {
    if (isEdit) {
      setIsEdit(false);
    } else {
      setEditId(index);
      setIsEdit(true);
      const promptToBeEdited = chatHistory[index].content;
      setEditedValue(promptToBeEdited);
    }
  };

  const handleReSubmit = async (e) => {
    e.preventDefault();
    const newHistory = chatHistory.slice(0, editId);
    await makeApiCall(editedValue, newHistory);
    setIsEdit(false);
  };

  return (
    <div className="app-container">
      <div className="chat-container" ref={chatContainerRef}>
        {chatHistory.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <span className="message-role">{message.role.toUpperCase()}:</span>{" "}
            {message.role === "model" ? (
              <div className="message-actions">
                <button
                  className="branch"
                  onClick={() => handleBranchClicked(index)}
                >
                  Branch
                </button>
                <button
                  className="regenerate"
                  onClick={() => handleRegenerate(index)}
                >
                  Regenerate
                </button>
              </div>
            ) : (
              <div className="message-actions">
                <button onClick={() => handleEdit(index)} className="branch">
                  {isEdit ? "Cancel" : "Edit"}
                </button>
              </div>
            )}
            {isEdit && message.role === "user" && editId === index ? (
              <form onSubmit={handleReSubmit} className="input-form-edit">
                <textarea // *** Use <textarea> ***
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                  onKeyDown={handleEditKeyDown}
                  placeholder="Type your message..."
                  rows="6" // Adjust number of visible rows
                />
                <button type="submit-edit">Send</button>
              </form>
            ) : (
              <ReactMarkdown
                components={{
                  code: ({ inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <div className="code-block">
                        <CopyToClipboard text={String(children)}>
                          <button className="copy-button">Copy</button>
                        </CopyToClipboard>
                        <SyntaxHighlighter
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).trim()}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <textarea // *** Use <textarea> ***
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows="6" // Adjust number of visible rows
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

Chat.propTypes = {
  id: PropTypes.number.isRequired,
  globalChatHistory: PropTypes.array,
  handleChatUpdate: PropTypes.func,
  handleAddAnotherChat: PropTypes.func,
};

export default Chat;
