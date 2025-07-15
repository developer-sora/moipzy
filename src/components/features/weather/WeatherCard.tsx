"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useWeather } from "@/hooks/useWeather";
import { cn } from "@/lib/utils";
import { getWeatherInfo } from "@/lib/weather";
import { useEffect } from "react";
import { toast } from "sonner";

export default function WeatherCard() {
  const { weather, loading, error } = useWeather();

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (loading) {
    return <Skeleton className="h-[145px] rounded-xl" />;
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
    <Card className={cn("h-[145px] w-full", themeColor)}>
      <CardHeader className="flex justify-between">
        <CardTitle>{weather.name}</CardTitle>
        <WeatherIcon className="w-6 h-6" />
      </CardHeader>
      <CardContent className="flex justify-between">
        <p className="text-5xl">{Math.round(weather.main.temp)}°</p>
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
