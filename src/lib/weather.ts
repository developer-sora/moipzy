import {
  Sun,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  Snowflake,
  CloudFog,
  CloudAlert,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type WeatherInfo = {
  icon: LucideIcon;
  themeColor: string;
};

export const weatherInfoMap: Record<string, WeatherInfo> = {
  Clear: {
    icon: Sun,
    themeColor:
      "bg-gradient-to-b from-sky-500 to-blue-300 text-white text-shadow-md",
  },
  Clouds: {
    icon: Cloud,
    themeColor: "bg-slate-300 text-white text-shadow-sm",
  },
  Rain: {
    icon: CloudRain,
    themeColor: "bg-slate-400 text-white text-shadow-md",
  },
  Drizzle: {
    icon: CloudDrizzle,
    themeColor: "bg-slate-300 text-white text-shadow-sm",
  },
  Thunderstorm: {
    icon: CloudLightning,
    themeColor:
      "bg-gradient-to-b from-zinc-600 to-zinc-400 text-white text-shadow-md",
  },
  Snow: {
    icon: Snowflake,
    themeColor: "bg-slate-50 text-slate-700",
  },
  Fog: {
    icon: CloudFog,
    themeColor: "bg-slate-300 text-white text-shadow-sm",
  },
};

export const getWeatherInfo = (main: string): WeatherInfo => {
  return (
    weatherInfoMap[main] || {
      icon: CloudAlert,
      themeColor: "text-slate-700",
    }
  );
};
