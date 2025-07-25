import BottomTab from "@/components/common/bottomTab/BottomTab";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full px-8 pt-3 gap-3 h-screen">
      {children}
      <BottomTab />
    </div>
  );
}
