"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Pause } from "lucide-react";
import React, { useState } from "react";

export default React.memo(function ChatInput({
  onSend,
  onStop,
  loading,
}: {
  onSend: (value: string) => void;
  onStop: () => void;
  loading?: boolean;
}) {
  const [value, setValue] = useState("");

  const sendMessage = () => {
    if (value.trim()) {
      onSend(value);
      setValue("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) {
      onStop();
      return;
    }
    sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      e.nativeEvent.isComposing === false &&
      !loading
    ) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative px-2">
      <Textarea
        placeholder="메시지를 입력해주세요..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="pr-8 resize-none"
      />
      <Button
        type="submit"
        className="w-6 h-6 absolute rounded-full right-4 bottom-0 -translate-y-1/2 cursor-pointer"
        disabled={!loading && !value.trim()}
      >
        {loading ? (
          <Pause className="w-4 h-4" />
        ) : (
          <ArrowUp className="w-4 h-4" />
        )}
      </Button>
    </form>
  );
});
