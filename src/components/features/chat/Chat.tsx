"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChatInput from "./ChatInput";

function SenderChat() {
  return (
    <div className="flex justify-end text-sm ml-20">
      <p className="bg-zinc-100 rounded-3xl px-4 py-2 text-sm">
        오늘의 추천 코디 알려줘
      </p>
    </div>
  );
}

const markdown = `오늘의 추천 코디는 어쩌고 저쩌고
`;

function AIChat() {
  return (
    <div className="text-sm">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}

export default function Chat() {
  return (
    <div className="flex flex-col h-[80vh]">
      <ScrollArea className="flex-1 overflow-y-auto">
        <AIChat />
        <SenderChat />
      </ScrollArea>
      <ChatInput />
    </div>
  );
}
