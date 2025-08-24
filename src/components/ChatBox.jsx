import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useTheme } from "../contexts/ThemeContext";

const ChatBox = ({ onResults, onClear, setIsLoading }) => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [context, setContext] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [lastMessage, setLastMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (isChatLoading) return;

    const userMessage = input.trim();
    let reqBody = { message: userMessage }
    let products = [];

    if (context) {
      reqBody.context = context;
    }
    setMessages((prev) => [...prev, { sender: "You", text: userMessage }]);
    setInput("");
    setIsChatLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
        credentials: "include", // This will send cookies from the browser
      });
      const data = await response.json();
      console.log("Response data:", data);
      products = data.products || [];
      setLastMessage(data.reply || "No response received");
      setMessages((prev) => [...prev, { sender: "Rabia store", text: data.reply }]);
      setContext(() => "\n" + (data.reply || ""));
      if (products.length > 0) {
        onResults(products);
      }
    } catch (error) {
      console.error("Error getting response:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "Error", text: "Failed to get response" },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="chat-container" style={{ margin: '16px', padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ color: theme.colors.text, margin: 0 }}>Need help? Ask something:</h3>
        <button
          onClick={toggleHistory}
          style={{
            background: 'none',
            border: `1px solid ${theme.colors.border}`,
            borderRadius: '6px',
            color: theme.colors.text,
            padding: '4px 8px',
            cursor: 'pointer',
            fontSize: '12px',
            transition: 'all 0.3s ease'
          }}
          title={showHistory ? 'Hide chat history' : 'Show chat history'}
        >
          {showHistory ? '🔽 Hide' : '🔼 Show'} History
        </button>
      </div>
      
      {
        !showHistory &&
        <div style={{ 
          backgroundColor: theme.colors.backgroundSecondary,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '12px',
          minHeight: '40px'
        }}> 
          <p style={{ 
            margin: 0, 
            color: theme.colors.text,
            fontStyle: lastMessage ? 'normal' : 'italic',
            opacity: lastMessage ? 1 : 0.6,
            textAlign: 'center'
          }}>
            {lastMessage || ""}
          </p> 
        </div>
      }

      <div
        className="chat-log"
        style={{ 
          border: `1px solid ${theme.colors.chatBorder}`, 
          backgroundColor: theme.colors.chatBackground,
          padding: showHistory ? '12px' : '0',
          height: showHistory ? '200px' : '0',
          overflowY: 'auto', 
          marginBottom: '12px',
          borderRadius: '8px',
          transition: 'all 0.4s ease-in-out',
          transform: showHistory ? 'translateY(0)' : 'translateY(-10px)',
          opacity: showHistory ? 1 : 0,
          visibility: showHistory ? 'visible' : 'hidden'
        }}
      >
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`chat-message ${msg.sender === 'You' ? 'user' : 'bot'}`}
            style={{
              backgroundColor: msg.sender === 'You' ? theme.colors.userMessage : theme.colors.botMessage,
              color: theme.colors.text,
              padding: '8px 12px',
              margin: '4px 0',
              borderRadius: '12px',
              maxWidth: '80%',
              marginLeft: msg.sender === 'You' ? 'auto' : '0',
              marginRight: msg.sender === 'You' ? '0' : 'auto'
            }}
          >
            <strong style={{ color: theme.colors.text }}>{msg.sender}:</strong>{' '}
            <span style={{ color: theme.colors.text }}>{msg.text}</span>
          </div>
        ))}
        {isChatLoading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
            <LoadingSpinner 
              type="beat" 
              color={theme.colors.spinner} 
              size={8} 
              text="Rabia store is typing..." 
            />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="themed-input"
          style={{ flex: 1 }}
          required
        />
        <button 
          type="submit" 
          disabled={isChatLoading}
          className="themed-button"
        >
          {isChatLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ChatBox;