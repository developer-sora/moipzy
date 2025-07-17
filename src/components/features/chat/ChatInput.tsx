"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp } from "lucide-react";
import React, { useState } from "react";

export default React.memo(function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (value: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSend(value);
    }
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Input
        type="text"
        placeholder="메시지를 입력해주세요..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pr-10"
      />
      <Button
        type="submit"
        className="w-6 h-6 absolute rounded-full right-3 top-1/2 -translate-y-1/2"
        disabled={!value.trim() || disabled}
      >
        <ArrowUp className="w-4 h-4" />
      </Button>
    </form>
  );
});
