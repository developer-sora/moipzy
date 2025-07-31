"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import ChatInput from "./ChatInput";
import { useChat } from "@/hooks/useChat";
import { Loader } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function Chat() {
  const {
    messages,
    handleSend,
    handleStop,
    messageLoading,
    error,
    fetchLoading,
  } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // 유저가 스크롤할 때 감지
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const threshold = 10;
    const isAtBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
    setIsAutoScroll(isAtBottom);
  };

  const handleSendWithScroll = useCallback(
    async (value: string) => {
      setIsAutoScroll(true);
      await handleSend(value);
    },
    [handleSend]
  );

  useEffect(() => {
    if (isAutoScroll && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant") {
        scrollToBottom();
      }
    }
  }, [messages, isAutoScroll]);

  return (
    <>
      <ScrollArea
        className="flex flex-col h-full overflow-y-auto"
        viewportRef={scrollRef}
        onViewportScroll={handleScroll}
      >
        <div className="flex-1 px-4">
          {messages.map((msg, idx) =>
            msg.role === "user" ? (
              <UserChat key={idx} content={msg.content} />
            ) : msg.role === "assistant" ? (
              <AIChat
                key={idx}
                content={msg.content}
                isLast={idx === messages.length - 1}
              />
            ) : null
          )}
          {fetchLoading && (
            <Loader className="w-6 h-6 animate-spin text-zinc-400" />
          )}
          {!fetchLoading && error && (
            <div className="text-sm mb-2">{error}</div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="bg-white pb-4 sticky bottom-0">
        <ChatInput
          onSend={handleSendWithScroll}
          onStop={handleStop}
          loading={messageLoading}
        />
      </div>
    </>
  );
}

function UserChat({ content }: { content: string }) {
  return (
    <div className="flex justify-end text-sm ml-20 mb-2">
      <p className="bg-zinc-100 rounded-3xl px-4 py-2 text-sm">{content}</p>
    </div>
  );
}

function AIChat({ content, isLast }: { content: string; isLast: boolean }) {
  return (
    <article
      className={cn(
        "prose prose-sm mb-2",
        isLast && "min-h-[calc(100dvh-346px)]"
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
