export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_max: number;
    temp_min: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  dt: number;
}

export interface WeatherError {
  error: string;
}

export interface WeatherHookError {
  type: "geolocation" | "weather";
  message: string;
}
