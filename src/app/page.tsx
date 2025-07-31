import GoogleLogin from "@/components/common/googleLogin/GoogleLogin";
import Link from "next/link";
import { createClientForServer } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClientForServer();
  const session = await supabase.auth.getUser();

  console.log(session);
  return (
    <div className="flex flex-col justify-between h-full pt-30 pb-20">
      <header>
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Moipzy
        </h1>
        <p className="text-center text-sm text-muted-foreground">
          날씨 기반 코디 추천 앱
        </p>
      </header>
      <div className="flex flex-col gap-4">
        <GoogleLogin />
        <Link href="/chat" className="text-slate-400 underline">
          로그인 없이 시작하기
        </Link>
      </div>
    </div>
  );
}
