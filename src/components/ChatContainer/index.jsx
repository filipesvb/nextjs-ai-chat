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
import { DefaultChatTransport } from "ai";
import { useRef, useState } from "react";

export const ChatContainer = () => {
  const [input, setInput] = useState("");
  const ref = useRef(null);

  const {
    messages,
    sendMessage,
    status,
    stop,
    setMessages,
    regenerate,
    error,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    // messages: [{ parts: [{ type: "text", text: "hello" }] }],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendMessage({ text: input });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
    setInput("");
    ref.current.scrollBy(0, 100);
  };
  const handleRemove = (msgId) => {
    setMessages(messages.filter((msg) => msg.id !== msgId));
  };

  return (
    <section className={styles.container}>
      <div ref={ref} className={`${styles.chat} mt-10 border-2`}>
        {messages.map((msg) => (
          <ChatBubble
            onRemove={() => handleRemove(msg.id)}
            isUser={msg.role === "user"}
            key={msg.id}
            message={msg.parts.find((p) => p.type === "text").text}
          />
        ))}
      </div>

      {status == "streaming" && (
        <div>
          <Loader />
          <Button variant="danger" onClick={stop}>
            <IconStop /> Parar
          </Button>
        </div>
      )}
      {status !== "streaming" && messages.length > 0 && (
        <>
          <RetryButton onClick={regenerate} />
        </>
      )}
      {error && <p>Ops, alguma coisa deu errado!</p>}
      <ChatForm
        disabled={status == "streaming"}
        input={input}
        handleInputChange={(e) => setInput(e.target.value)}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};
