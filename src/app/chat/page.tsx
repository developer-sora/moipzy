import Chat from "@/components/features/chat/Chat";
import WeatherCard from "@/components/features/weather/WeatherCard";

export default function Page() {
  return (
    <div className="flex flex-col w-full px-8 mt-6 gap-4">
      <WeatherCard />
      <Chat />
    </div>
  );
}
