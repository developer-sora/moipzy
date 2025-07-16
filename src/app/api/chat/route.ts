import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json(); // messages: GPT 메시지 배열

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
    });

    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error("OpenAI Error:", error);
    return NextResponse.json({ error: "OpenAI 요청 실패" }, { status: 500 });
  }
}
