// pages/chat.tsx"use client"
"use client"
import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSearchParams } from "next/navigation";
import './Chat.css'; // Asegúrate de crear y configurar este archivo CSS

const Chat = () => {
  const [messages, setMessages] = useState<{ message: string, username: string }[]>([]);
  const [input, setInput] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");
  const chatContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!roomId || typeof roomId !== 'string') return;

    const username = localStorage.getItem('nombreUsuario') || prompt('Please enter your username:');
    if (!username) return;

    localStorage.setItem('nombreUsuario', username);

    const socket = io('http://localhost:3500', {
      auth: { username },
      query: { room: roomId }
    });

    socketRef.current = socket;

    socket.on('chat message', ({ message, username }) => {
      setMessages((prev) => [...prev, { message, username }]);
    });

    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3500/chat/messages', {
          params: { room: roomId }
        });
        setMessages(response.data.map((msg: { content: string, user: string }) => ({ message: msg.content, username: msg.user })));
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input && socketRef.current) {
      try {
        await axios.post('http://localhost:3500/chat/message', {
          message: input,
          username: localStorage.getItem('nombreUsuario'),
          room: roomId,
        });
        setInput('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <h1 className="chat-header">Chateando con: {roomId}</h1>
      <ul id="messages" ref={chatContainerRef} className="chat-messages">
        {messages.map((message, index) => (
          <li key={index} className={`message ${message.username === localStorage.getItem('nombreUsuario') ? 'my-message' : 'other-message'}`}>
            <p>{message.message}</p>
            <small>{message.username}</small>
          </li>
        ))}
      </ul>
      <form id="form" onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          name="message"
          id="input"
          placeholder="Type a message"
          autoComplete="off"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
        />
        <button type="submit" className="chat-button">Send</button>
      </form>
    </div>
  );
};

export default Chat;

