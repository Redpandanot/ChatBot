import PropTypes from "prop-types";
import "./SideBar.css";

function SideBar({ handleIdChange, globalChatHistory, handleDeleteChat }) {
  return (
    <div className="sidebar-container">
      <div className="chat-list">
        {globalChatHistory.map((chat, i) => (
          <div
            key={i}
            className={`chat-item active`}
            onClick={() => handleIdChange(i)}
          >
            {chat[0]
              ? chat[0].content.length > 25
                ? `${chat[0].content.substring(0, 25)}...`
                : chat[0].content
              : `Chat ${i + 1}`}
            <button
              className="delete-button"
              onClick={(event) => {
                event.stopPropagation();
                handleDeleteChat(i);
              }}
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

SideBar.propTypes = {
  handleIdChange: PropTypes.func,
  globalChatHistory: PropTypes.arrayOf(PropTypes.array),
  handleDeleteChat: PropTypes.func,
};

export default SideBar;
