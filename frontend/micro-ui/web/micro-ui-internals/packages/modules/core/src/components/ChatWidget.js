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
        {open ? "✕" : "💬"}
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



// import React, { useState, useRef, useEffect } from "react";

// const ChatWidget = ({ iframeSrc }) => {
//   const [open, setOpen] = useState(false);
//   const [listening, setListening] = useState(false);
//   const [recognizedText, setRecognizedText] = useState("");
//   const iframeRef = useRef();

//   const toggle = () => setOpen((v) => !v);

//   // Send recognized text to Copilot Studio via postMessage
//   const sendToBot = (text) => {
//     if (iframeRef.current && iframeRef.current.contentWindow) {
//       iframeRef.current.contentWindow.postMessage(
//         {
//           type: "webchat/sendEvent",
//           name: "webchat/sendActivity", // Copilot Studio expects this
//           value: {
//             type: "message",
//             text: text
//           },
//         },
//         "*"
//       );
//     }
//   };

//   // Handle voice input
//   const handleVoice = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Your browser does not support speech recognition.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.interimResults = false;
//     setListening(true);
//     recognition.start();

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       console.log("Recognized:", transcript);
//       setRecognizedText(transcript);

//       // Send to bot via postMessage
//       sendToBot(transcript);
//     };

//     recognition.onerror = (err) => {
//       console.error("Voice error:", err);
//       setListening(false);
//     };

//     recognition.onend = () => setListening(false);
//   };

//   // Optional: Text-to-Speech for bot replies
//   useEffect(() => {
//     const handleBotReply = (event) => {
//       if (!event.data || !event.data.activity) return;
//       const activity = event.data.activity;

//       if (activity.type === "message" && activity.text) {
//         const utterance = new SpeechSynthesisUtterance(activity.text);
//         speechSynthesis.speak(utterance);
//       }
//     };

//     window.addEventListener("message", handleBotReply);
//     return () => window.removeEventListener("message", handleBotReply);
//   }, []);

//   return (
//     <React.Fragment>
//       {/* Floating button */}
//       <button
//         type="button"
//         onClick={toggle}
//         aria-label="Open chat"
//         style={{
//           position: "fixed",
//           right: "20px",
//           bottom: "20px",
//           width: "56px",
//           height: "56px",
//           borderRadius: "50%",
//           background: "#00bcd1",
//           color: "#fff",
//           border: "none",
//           boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
//           cursor: "pointer",
//           zIndex: 10000,
//         }}
//       >
//         <span style={{ fontSize: 22, lineHeight: "56px" }}>💬</span>
//       </button>

//       {/* Popup panel */}
//       {open && (
//         <div
//           style={{
//             position: "fixed",
//             right: "20px",
//             bottom: "84px",
//             width: "360px",
//             height: "520px",
//             background: "#fff",
//             borderRadius: "10px",
//             boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
//             overflow: "hidden",
//             zIndex: 10000,
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <div
//             style={{
//               height: "40px",
//               background: "#00bcd1",
//               color: "#fff",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               padding: "0 12px",
//               fontWeight: 500,
//             }}
//           >
//             {/* <span>Assistant</span> */}
//             <div style={{ display: "flex", gap: "8px" }}>
//               {/* Mic button */}
//               <button
//                 onClick={handleVoice}
//                 aria-label="Voice input"
//                 style={{
//                   background: "transparent",
//                   border: "none",
//                   color: "#fff",
//                   fontSize: 18,
//                   cursor: "pointer",
//                 }}
//               >
//                 {listening ? "🎙️..." : "🎤"}
//               </button>
//               {/* Close button */}
//               <button
//                 onClick={toggle}
//                 aria-label="Close chat"
//                 style={{
//                   background: "transparent",
//                   border: "none",
//                   color: "#fff",
//                   fontSize: 18,
//                   cursor: "pointer",
//                 }}
//               >
//                 ✕
//               </button>
//             </div>
//           </div>

//           {/* Optional: Show recognized text before sending */}
//           {/* {recognizedText && (
//             <div
//               style={{
//                 padding: "4px 8px",
//                 fontSize: 14,
//                 color: "#333",
//                 borderBottom: "1px solid #eee",
//               }}
//             >
//               🎤 You said: {recognizedText}
//             </div>
//           )} */}

//           <iframe
//             ref={iframeRef}
//             title="chatbot"
//             src={iframeSrc}
//             frameBorder="0"
//             style={{ width: "100%", height: "100%", flex: 1 }}
//           />
//         </div>
//       )}
//     </React.Fragment>
//   );
// };

// export default ChatWidget;
