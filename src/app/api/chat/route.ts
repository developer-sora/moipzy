import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const mockText = `☁️ **오늘의 날씨 요약**  
오늘은 하루 종일 비가 내리는 날씨입니다. 기온은 25도로, 아침부터 저녁까지 큰 기온 변화 없이 다소 습한 초여름 날씨예요.

🧥 **추천 옷차림**

- 라이트 방수 재킷 or 얇은 트렌치코트  
- 반팔 또는 얇은 긴팔 티셔츠  
- 가벼운 팬츠 or 슬랙스
- 방수되는 스니커즈 or 샌들
- 밝은 색상의 우산 (접이식 우산 추천!)  
- 미니 크로스백 & 방수 파우치

💡 **팁 & 마무리 멘트**  
오늘은 비 때문에 공기 중 습도가 높아 조금 답답할 수 있지만, 방수 아우터와 산뜻한 포인트 아이템(컬러 양말, 밝은 우산 등)으로 스타일도 살리고, 쾌적함도 챙겨보세요!  
비 맞지 않도록 우산 꼭 챙기고, 젖은 신발은 바로 말려주세요. 작은 컬러 포인트 하나로 흐린 날씨도 기분 좋게 시작하시길 응원합니다.  
즐거운 하루 보내세요! ☔🌈 
오늘은 비 때문에 공기 중 습도가 높아 조금 답답할 수 있지만, 방수 아우터와 산뜻한 포인트 아이템(컬러 양말, 밝은 우산 등)으로 스타일도 살리고, 쾌적함도 챙겨보세요!  
비 맞지 않도록 우산 꼭 챙기고, 젖은 신발은 바로 말려주세요. 작은 컬러 포인트 하나로 흐린 날씨도 기분 좋게 시작하시길 응원합니다.  
즐거운 하루 보내세요! ☔🌈 
`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  try {
    // const stream = await openai.chat.completions.create({
    //   model: "gpt-4.1",
    //   messages,
    //   stream: true,
    // });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        for (const char of mockText) {
          controller.enqueue(encoder.encode(char));
          await new Promise((r) => setTimeout(r, 15)); // 글자당 15ms 딜레이
        }
        controller.close();
      },
    });

    // const readable = new ReadableStream({
    //   async start(controller) {
    //     for await (const chunk of stream) {
    //       const text = chunk.choices[0]?.delta?.content;
    //       if (text) {
    //         controller.enqueue(encoder.encode(text));
    //       }
    //     }
    //     controller.close();
    //   },
    // });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
      },
    });
  } catch (error) {
    console.error("OpenAI Error:", error);
    return NextResponse.json({ error: "OpenAI 요청 실패" }, { status: 500 });
  }
}
