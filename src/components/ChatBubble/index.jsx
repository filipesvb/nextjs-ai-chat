'use client'

import Button from '../Button';
import { ChatBubbleOption } from '../ChatBubbleOption';
import { IconClose } from '../Icons';
import styles from './chatBubble.module.css';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect, useRef } from 'react';

export default function ChatBubble({ message, onRemove, isUser = false }  ) {
  const [optionsOpen, setOptionsOpen] = useState(false)
  const optionsBtn = useRef(null);

  function handleOptionsClick(e) {
    e.stopPropagation();
    setOptionsOpen(!optionsOpen)
  }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if(e.target !== optionsBtn.current) {
        setOptionsOpen(false)
      }    
    })
  }, [])

  return (
    <div className={`${styles.bubbleWrapper} ${isUser ? styles.user : styles.bot}`}>
      <div className={`${styles.bubble} relative`}>
        <ReactMarkdown>{message}</ReactMarkdown>
        <button className="absolute right-3 top-1 cursor-pointer" ref={optionsBtn} onClick={handleOptionsClick}>...</button>

        <ul className={`absolute bg-white right-3 top-7 text-black rounded-xs h-auto opacity-0 overflow-hidden ${!optionsOpen && 'hidden'} ${optionsOpen && 'block opacity-100 '} transition-opacity`}>
          <li>
            <ChatBubbleOption onClick={onRemove}>
              Remover
            </ChatBubbleOption>
          </li>
        </ul>
        
      </div>
    </div>
  );
}