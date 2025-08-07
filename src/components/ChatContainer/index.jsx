"use client";

import Button from "../Button";
import ChatBubble from "../ChatBubble";
import { ChatForm } from "../ChatForm";
import { ChatHeader } from "../ChatHeader";
import { IconStop } from "../Icons";
import { Loader } from "../Loader";
import { RetryButton } from "../RetryButton";
import styles from "./container.module.css";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from 'ai';
import { useEffect, useState } from 'react'

export const ChatContainer = () => {
  const [input, setInput] = useState('')
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await sendMessage({ text: input });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
    setInput('');
  };
  useEffect(() => {
    console.log(messages)
  }, [messages])

  return (
    <section className={styles.container}>
      <div className={`${styles.chat} mt-10`}>
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg.parts.find(p => p.type === 'text').text}
          />
        ))}
      </div>
      <ChatForm
        input={input}
        handleInputChange={e => setInput(e.target.value)}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};
