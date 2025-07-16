"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useWeather } from "@/hooks/useWeather";
import { cn } from "@/lib/utils";
import { getWeatherInfo } from "@/lib/weather";
import { LocateIcon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function WeatherCard() {
  const { weather, loading, error, refetch } = useWeather();

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (loading) {
    return <Skeleton className="h-[106px] rounded-xl" />;
  }

  if (error?.type === "weather") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>날씨 정보를 불러올 수 없습니다.</CardTitle>
        </CardHeader>
        <CardContent>{error.message}</CardContent>
      </Card>
    );
  }

  if (!weather) {
    return null;
  }

  const { icon: WeatherIcon, themeColor } = getWeatherInfo(
    weather.weather[0].main
  );

  return (
    <Card className={cn("w-full", themeColor)}>
      <CardHeader className="flex justify-between">
        <CardTitle className="flex items-center gap-2">
          {weather.name}
          <LocateIcon
            className="w-4 h-4 cursor-pointer"
            onClick={() => refetch()}
            aria-label="위치 정보 가져오기"
          />
        </CardTitle>
        <WeatherIcon className="w-5 h-5" aria-label="날씨 아이콘" />
      </CardHeader>
      <CardContent className="flex justify-between">
        <p className="text-3xl">{Math.round(weather.main.temp)}°</p>
        <div>
          <p className="text-right">{weather.weather[0].description}</p>
          <p>
            최고 {Math.round(weather.main.temp_max)}° 최저{" "}
            {Math.round(weather.main.temp_min)}°
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
