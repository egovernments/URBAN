import React, { useState } from "react";

const ChatWidget = ({ iframeSrc }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);

  return (
    <React.Fragment>
      {/* Floating button */}
      <button
        type="button"
        onClick={toggle}
        aria-label={open ? "Close chat" : "Open chat"}
        style={{
          position: "fixed",
          right: "20px",
          bottom: "20px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#c84c0e",
          color: "#fff",
          border: "none",
          boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
          cursor: "pointer",
          zIndex: 10000,
          fontSize: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {open ? (
          "✕"
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M20 2H4C2.9 2 2 2.9 2 4v16l4-4h14c1.1 0 2-0.9 2-2V4c0-1.1-0.9-2-2-2zm-2 10H6v-2h12v2zm0-4H6V6h12v2z" />
          </svg>
        )}
      </button>

      {/* Popup panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: "20px",
            bottom: "84px",
            width: "360px",
            height: "520px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
            overflow: "hidden",
            zIndex: 10000,
          }}
        >
          <iframe
            title="chatbot"
            src={iframeSrc}
            frameBorder="0"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default ChatWidget;
