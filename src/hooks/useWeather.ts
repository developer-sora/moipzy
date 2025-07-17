import { useState, useEffect } from "react";
import { WeatherData, WeatherError, WeatherHookError } from "@/types/weather";
import { usePathname, useRouter } from "next/navigation";

class GeolocationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GeolocationError";
  }
}

// 사용자 위치 가져오기
function getUserLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(
        new GeolocationError(
          "브라우저가 위치 정보를 지원하지 않아 서울 날씨를 보여드릴게요."
        )
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      resolve,
      (error) => {
        const errorMessages: { [key: number]: string } = {
          1: "위치 정보 권한이 거부되어 서울 날씨를 보여드릴게요.",
          2: "위치 정보를 사용할 수 없어 서울 날씨를 보여드릴게요.",
          3: "위치 정보 요청이 시간 초과되어 서울 날씨를 보여드릴게요.",
        };
        const message =
          errorMessages[error.code] ?? "알 수 없는 위치 정보 에러입니다.";
        reject(new GeolocationError(message));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  });
}

const defaultCity = "seoul";

// 현재 날씨 가져오기
async function getCurrentWeather(
  lat?: number,
  lon?: number
): Promise<WeatherData> {
  let url = "";

  if (lat && lon) {
    url = `/api/weather?lat=${lat}&lon=${lon}&lang=kr`;
  } else {
    url = `/api/weather?city=${defaultCity}&lang=kr`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    const error: WeatherError = await response.json();
    throw new Error(error.error);
  }

  return response.json();
}

function updateWeatherParams(weatherData: WeatherData) {
  const params = new URLSearchParams();
  params.set("temp", Math.round(weatherData.main.temp).toString());
  params.set("temp_max", Math.round(weatherData.main.temp_max).toString());
  params.set("temp_min", Math.round(weatherData.main.temp_min).toString());
  params.set("status", weatherData.weather[0].main);

  return params;
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<WeatherHookError | null>(null);
  const pathname = usePathname();
  const { replace } = useRouter();

  const fetchWeather = async () => {
    setError(null);

    const getWeatherFallback = async () => {
      try {
        const weatherData = await getCurrentWeather();
        setWeather(weatherData);
        const params = updateWeatherParams(weatherData);
        replace(`${pathname}?${params.toString()}`);
      } catch {
        setError({
          message: "날씨를 가져오는데 실패했습니다.",
          type: "weather",
        });
      }
    };

    try {
      const position = await getUserLocation();
      const { latitude, longitude } = position.coords;
      const weatherData = await getCurrentWeather(latitude, longitude);
      setWeather(weatherData);
      const params = updateWeatherParams(weatherData);
      replace(`${pathname}?${params.toString()}`);
    } catch (error) {
      if (error instanceof GeolocationError) {
        setError({
          message: error.message,
          type: "geolocation",
        });
        getWeatherFallback();
      } else {
        setError({
          message: "날씨를 가져오는데 실패했습니다.",
          type: "weather",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return {
    weather,
    loading,
    error,
    refetch: fetchWeather,
  };
}
