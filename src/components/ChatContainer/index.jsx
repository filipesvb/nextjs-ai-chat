'use client'

import Button from '../Button';
import ChatBubble from '../ChatBubble';
import { ChatForm } from '../ChatForm';
import { ChatHeader } from '../ChatHeader';
import { IconStop } from '../Icons';
import { Loader } from '../Loader';
import { RetryButton } from '../RetryButton';
import styles from './container.module.css';
import { useChat } from '@ai-sdk/react';


export const ChatContainer = () => {

    const {messages, input, handleInputChange, handleSubmit} = useChat();

    return (
        <section className={styles.container}>
            <div className={`${styles.chat} mt-10`}>
                
                {messages.map((msg) => (
                    <ChatBubble
                        key={msg.id}
                        message={msg.message}
                        isUser={msg.isUser} 
                        onRemove={() => console.log('remove message', msg.id)}
                    />
                ))}

            </div>
            <ChatForm
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />
        </section>
    );
};