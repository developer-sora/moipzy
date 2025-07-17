"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import ChatInput from "./ChatInput";
import { useChat } from "@/hooks/useChat";
import { Loader } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function UserChat({ content }: { content: string }) {
  return (
    <div className="flex justify-end text-sm ml-20 mb-2">
      <p className="bg-zinc-100 rounded-3xl px-4 py-2 text-sm">{content}</p>
    </div>
  );
}

function AIChat({ content }: { content: string }) {
  return (
    <div className="prose prose-sm mb-2">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

export default function Chat() {
  const { messages, handleSend, loading, error } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  // 유저가 스크롤할 때 감지
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const isBottom = el.scrollHeight - el.scrollTop === el.clientHeight;
    setIsAutoScroll(isBottom);
  };

  const handleSendWithScroll = useCallback(
    (value: string) => {
      handleSend(value);
      setIsAutoScroll(true);
      scrollToBottom();
    },
    [handleSend]
  );

  useEffect(() => {
    if (isAutoScroll) {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="flex flex-col h-full overflow-y-auto"
      onScroll={handleScroll}
    >
      <div className="flex-1 px-4">
        {messages.map((msg, idx) =>
          msg.role === "user" ? (
            <UserChat key={idx} content={msg.content} />
          ) : msg.role === "assistant" ? (
            <AIChat key={idx} content={msg.content} />
          ) : null
        )}
        {loading && <Loader className="w-6 h-6 animate-spin text-zinc-400" />}
        {!loading && error && <div className="text-sm mb-2">{error}</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-white pb-4 sticky bottom-0">
        <ChatInput
          onSend={handleSendWithScroll}
          disabled={loading || !!error}
        />
      </div>
    </div>
  );
}
