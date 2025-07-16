"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp } from "lucide-react";
import React from "react";

export default function ChatInput() {
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Ask anything..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        className="w-6 h-6 absolute rounded-full right-2 top-1.5"
        disabled={!value.trim()}
      >
        <ArrowUp className="w-4 h-4" />
      </Button>
    </div>
  );
}
