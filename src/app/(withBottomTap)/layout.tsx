import BottomTap from "@/components/common/bottomTap/BottomTap";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full px-8 pt-3 gap-3 h-screen">
      {children}
      <BottomTap />
    </div>
  );
}
