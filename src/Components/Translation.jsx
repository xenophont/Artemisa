import React, { useState } from 'react';

export default function Translation({ handleUserMessage, messagesList, addMessages }) {
  const [userInput, setUserInput] = useState('');

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    addMessages([{ role: 'user', content: userInput }]);
    handleUserMessage(userInput);
    setUserInput('');
  };

  return (
    <div className="translation-area">
      <div className="chat-window">
        {messagesList.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <span>{message.content}</span>
          </div>
        ))}
      </div>
      <div className="input-area">
        <textarea
          className="text-area"
          cols={55}
          rows={3}
          placeholder="Enter text here..."
          value={userInput}
          onChange={handleUserInput}
        ></textarea>
        <button className="action-btn" onClick={handleSubmit}>
          Pregunta a Artemisa
        </button>
      </div>
    </div>
  );
}
