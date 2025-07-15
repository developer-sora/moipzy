import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-between h-full pt-10 pb-10">
      <header>
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Moipzy
        </h1>
        <p className="text-center text-sm text-muted-foreground">
          날씨 기반 코디 추천 앱
        </p>
      </header>
      <div className="flex flex-col gap-4">
        <button>구글 로그인</button>
        <Link href="/chat">로그인 없이 시작하기</Link>
      </div>
    </div>
  );
}
