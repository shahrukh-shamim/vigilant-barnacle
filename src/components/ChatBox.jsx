import React, { useState } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "You", text: userMessage }]);
    setInput("");

    try {
      const response = await fetch( import.meta.env.VITE_API_BASE_URL + "/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "Assistant", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "Error", text: "Failed to get response" },
      ]);
    }
  };

  return (
    <div id="chat-box">
      <h3>Need help? Ask something:</h3>
      <div
        id="chat-log"
        style={{ border: "1px solid #ccc", padding: 10, height: 200, overflow: "auto", marginBottom: 10 }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "80%" }}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;