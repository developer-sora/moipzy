import { NextRequest, NextResponse } from "next/server";

const OPENWEATHER_API_KEY = "";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const city = searchParams.get("city");

  if (!OPENWEATHER_API_KEY) {
    return NextResponse.json(
      { error: "OpenWeather API 키가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  try {
    let url: string;

    if (city) {
      // 도시명으로 검색
      url = `${BASE_URL}/weather?q=${encodeURIComponent(
        city
      )}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=kr`;
    } else if (lat && lon) {
      // 좌표로 검색
      url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=kr`;
    } else {
      return NextResponse.json(
        {
          error:
            "위치 정보가 필요합니다. lat, lon 또는 city 파라미터를 제공해주세요.",
        },
        { status: 400 }
      );
    }

    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: `날씨 데이터를 가져오는데 실패했습니다: ${error.message}` },
        { status: response.status }
      );
    }

    const weatherData = await response.json();
    return NextResponse.json(weatherData);
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
