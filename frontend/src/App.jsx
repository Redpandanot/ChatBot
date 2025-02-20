import { useState } from "react";
import "./App.css";
import Chat from "./Components/Chat/Chat";
import SideBar from "./Components/SideBar/SideBar";

function App() {
  const [id, setId] = useState(0);
  const [globalChatHistory, setGlobalChatHistory] = useState([[]]);
  const [collapsed, setCollapsed] = useState(false);

  const handleAddAnotherChat = (branchHistory) => {
    let newChat;
    if (branchHistory) {
      newChat = [...globalChatHistory, branchHistory];
    } else {
      newChat = [...globalChatHistory, []];
    }
    setGlobalChatHistory(newChat);
    setId(globalChatHistory.length);
  };

  const handleChatUpdate = (chatId, updatedChatHistory) => {
    setGlobalChatHistory((prevHistory) => {
      const newHistory = [...prevHistory]; // Create a copy
      newHistory[chatId] = updatedChatHistory; // Update the specific chat history
      return newHistory;
    });
  };

  const handleDeleteChat = (index) => {
    setGlobalChatHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory.splice(index, 1);
      return newHistory;
    });
  };

  const handleIdChange = (id) => {
    setId(id);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="main-container">
      <div
        className={`all-chat-container ${collapsed ? "collapsedWidth" : ""}`}
      >
        <div className="toggle-collapse">
          <button className="toggle-collapse-button" onClick={toggleCollapse}>
            ☰
          </button>
        </div>
        <div
          className={`add-chat-button-container ${
            collapsed ? "collapsed" : ""
          }`}
        >
          <button
            className="add-chat-button"
            onClick={() => handleAddAnotherChat()}
          >
            + New Chat
          </button>
        </div>
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
          <SideBar
            handleIdChange={handleIdChange}
            handleAddAnotherChat={handleAddAnotherChat}
            globalChatHistory={globalChatHistory}
            handleDeleteChat={handleDeleteChat}
          />
        </div>
      </div>
      <div className="current-chat-container">
        <Chat
          id={id}
          globalChatHistory={globalChatHistory}
          handleChatUpdate={handleChatUpdate}
          handleAddAnotherChat={handleAddAnotherChat}
        />
      </div>
    </div>
  );
}

export default App;
