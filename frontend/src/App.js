import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import './index.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input })
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { from: "bot", text: data.answer, feedback: true, feedbackMsg: "" }]);
    setInput("");
  };

  useEffect(() => {
    chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const handleFeedback = (index, isHelpful) => {
    const feedbackText = isHelpful ? "👍 Marked as Helpful" : "👎 Marked as Not Helpful";
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === index ? { ...msg, feedbackMsg: feedbackText, feedback: false } : msg
      )
    );
  };

  return (
    <div className="chat-container">
      <div className="chat-header">AI Chatbot</div>
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, i) => (
          <ChatBubble
            key={i}
            from={msg.from}
            text={msg.text}
            feedback={msg.feedback}
            feedbackMsg={msg.feedbackMsg}
            onFeedback={(val) => handleFeedback(i, val)}
          />
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask a question..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
export default App;