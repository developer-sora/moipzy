import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface WeatherParams {
  temp: string;
  temp_min: string;
  temp_max: string;
  status: string;
}

const createWeatherSystemPrompt = (weather: WeatherParams | null): Message => ({
  role: "system",
  content: `당신은 코디네이터입니다.
${
  !weather
    ? "오늘의 서울 날씨를 기준으로"
    : `오늘 날씨는 ${weather.status}이고, 현재기온은 ${weather.temp}도, 최고기온은 ${weather.temp_max}도, 최저기온은 ${weather.temp_min}도입니다. 이 날씨 정보를 반영해`
}
코디를 추천해 주세요.

응답 톤은 친근하고 따뜻하지만 정보는 정확해야 합니다.
다음과 같은 형식과 내용을 포함해서 대답해 주세요:

1. ☁️ **오늘의 날씨 요약** (날씨 상태는 한국어로 번역)
2. 🧥 **추천 옷차림** (항목별 리스트 형식, 실용성과 스타일 모두 고려)
4. 💡 **팁 & 마무리 멘트** (기온/날씨에 따른 주의사항과 따뜻한 응원 멘트)

특히 다음의 사항을 반영하세요:
- 흐리고 비 오는 날이면 우산/방수 재킷을 꼭 추천
- 이슬비일 경우 "접이식 우산"을 언급
- 일교차가 큰 날에는 "겉옷" 챙기도록 안내

스타일도 챙기면서 쾌적한 하루를 보낼 수 있도록 도와주세요.`,
});

const streamMessage = async (
  messages: Message[],
  onChunk: (text: string) => void
) => {
  try {
    const response = await fetch("/api/chat22", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(`서버 응답 오류: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done && reader) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      onChunk(chunkValue);
    }
  } catch (error) {
    console.error("Stream message error:", error);
    throw new Error(
      "AI 응답을 불러오지 못했습니다. 잠시 후 다시 시도해주세요."
    );
  }
};

const extractWeatherFromParams = (
  searchParams: URLSearchParams
): WeatherParams | null => {
  const temp = searchParams.get("temp");
  const temp_min = searchParams.get("temp_min");
  const temp_max = searchParams.get("temp_max");
  const status = searchParams.get("status");

  if (temp && temp_min && temp_max && status) {
    return { temp, temp_min, temp_max, status };
  }

  return null;
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // 첫 진입 시 날씨 기반 코디 추천
  useEffect(() => {
    const weatherParams = extractWeatherFromParams(searchParams);
    const systemPrompt = createWeatherSystemPrompt(weatherParams);

    setMessages([systemPrompt]);
    setLoading(true);

    const aiMessage = { role: "assistant", content: "" } as Message;

    streamMessage([systemPrompt], (chunk) => {
      aiMessage.content += chunk;
      setMessages([systemPrompt, { ...aiMessage }]);
    });
    setLoading(false);
  }, [searchParams]);

  // 유저가 입력해서 보낼 때
  const handleSend = useCallback(
    async (value: string) => {
      if (!value.trim()) return;
      const userMessage = { role: "user", content: value } as Message;
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setLoading(true);

      const aiMessage = { role: "assistant", content: "" } as Message;
      streamMessage(newMessages, (chunk) => {
        aiMessage.content += chunk;
        setMessages([...newMessages, { ...aiMessage }]);
      });
      setLoading(false);
    },
    [messages]
  );

  return {
    messages,
    handleSend,
    loading,
    error,
  };
}
