import Profile from "@/components/features/mypage/Profile";
import ProfileMenu from "@/components/features/mypage/ProfileMenu";
import { createClientForServer } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClientForServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>로그인 해주세요!</div>;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    return (
      <>
        <div>프로필 정보를 불러오지 못했습니다.</div>
      </>
    );
  }

  return (
    <main className="h-full">
      <Profile profile={profile} />
      <hr className="h-2 bg-slate-100 border-0" />
      <ProfileMenu userId={user.id} />
    </main>
  );
}
