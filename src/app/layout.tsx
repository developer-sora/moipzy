import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "모입지 - 날씨 기반 코디 추천 앱",
  description: "모입지는 날씨 기반 코디 추천 앱입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex justify-center">
        <div className="max-w-[480px] w-full min-h-screen flex flex-col items-center">
          {children}
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
