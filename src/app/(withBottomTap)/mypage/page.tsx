import { signOut } from "@/utils/supabase/actions";
import { createClientForServer } from "@/utils/supabase/server";

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
    .select("nickname, avatar_url, age, gender")
    .eq("id", user.id)
    .single();

  if (error) {
    return (
      <>
        <div>프로필 정보를 불러오지 못했습니다.</div>
        <button onClick={signOut}>로그아웃</button>
      </>
    );
  }

  // CSR: 프로필 수정 폼 (클라이언트 컴포넌트 자리 표시)
  return (
    <div className="h-full flex flex-col items-center gap-4 py-8">
      <img
        src={profile.avatar_url}
        alt="프로필"
        className="w-20 h-20 rounded-full object-cover"
      />
      <div>닉네임: {profile.nickname}</div>
      <div>나이: {profile.age}</div>
      <div>성별: {profile.gender}</div>
      <div>프로필 수정 폼 자리</div>
      <button onClick={signOut}>로그아웃</button>
    </div>
  );
}
