import React, { useState } from 'react';
import './Translation.css';

export default function Translation({ handleUserMessage, messagesList, addMessages }) {
  const [userInput, setUserInput] = useState('');

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  function typeMessage(message, container, delay = 10) {
    return new Promise((resolve) => {
      let index = 0;
      const interval = setInterval(() => {
        container.textContent += message.charAt(index);
        index += 1;
        if (index >= message.length) {
          clearInterval(interval);
          resolve();
        }
      }, delay);
    });
  }

  const handleSubmit = async () => {
    addMessages([{ role: 'user', content: userInput }]);
    const response = await handleUserMessage(userInput);
    setUserInput('');

    if (response && response.content) {
      const chatWindow = document.querySelector('.chat-window');
      const aiMessageElement = document.createElement('div');
      aiMessageElement.className = `message assistant`;
      chatWindow.appendChild(aiMessageElement);

      await typeMessage(response.content, aiMessageElement);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
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
