import React from 'react';

export default function ChatBubble({ from, text, feedback, feedbackMsg, onFeedback }) {
  return (
    <div className={`bubble ${from}`}>
      <div>{text}</div>
      {from === 'bot' && feedback && (
        <div className="feedback-buttons">
          <button onClick={() => onFeedback(true)}>👍</button>
          <button onClick={() => onFeedback(false)}>👎</button>
        </div>
      )}
      {feedbackMsg && <div className="feedback-msg">{feedbackMsg}</div>}
    </div>
  );
}
