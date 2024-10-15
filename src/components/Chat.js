// components/Chat.js
"use client";
import { useState } from 'react';
const assistantId = 'asst_EITiHgxEkAsCqQUoD84yzMOx';
const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '¡Hola! ¿En qué puedo ayudarte hoy?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error al obtener la respuesta del bot:', error);
      const errorMessage = { sender: 'bot', text: 'Lo siento, hubo un error. Intenta nuevamente.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <span dangerouslySetInnerHTML={{ __html: msg.text }}></span>
          </div>
        ))}
        {isLoading && <div className="message bot"><span>Cargando...</span></div>}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
      <style jsx>{`
        .chat-container {
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          height: 80vh;
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: hidden;
        }
        .messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background-color: #f9f9f9;
        }
        .message {
          margin-bottom: 15px;
        }
        .message.user span {
        
          background-color: #007bff;
          color: white;
          padding: 10px;
          border-radius: 10px;
          display: inline-block;
        }
        .message.bot span {
        text-align: left;
    display: flex;
    flex-direction: column;
    gap: 10px;
          background-color: #e5e5ea;
          color: black;
          padding: 10px;
          border-radius: 10px;
              padding: 30px;
        }

        .message.bot span section, .message.bot span div {
        text-align: left;
    display: flex;
    flex-direction: column;
    gap: 10px;
             padding: 30px;
        }
        .input-area {
          display: flex;
          padding: 10px;
          border-top: 1px solid #ccc;
          background-color: #fff;
        }
        .input-area input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .input-area button {
          margin-left: 10px;
          padding: 10px 20px;
          border: none;
          background-color: #007bff;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }
        .input-area button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Chat;
