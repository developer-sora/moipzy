import { Button } from "@/components/ui/button";
import { Database } from "@/types/database.types";
import Image from "next/image";

type ProfileType = Database["public"]["Tables"]["profiles"]["Row"];

export default function Profile({ profile }: { profile: ProfileType }) {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      {profile.avatar_url ? (
        <Image
          src={profile.avatar_url}
          alt="프로필"
          className="w-20 h-20 rounded-full object-cover"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-slate-200" />
      )}
      <div className="font-semibold">{profile.nickname}</div>
      <div>
        {profile.age || "나이 정보 없음"}/{profile.gender || "성별 정보 없음"}
      </div>
      <Button variant={"outline"} size="full">
        회원 정보 수정
      </Button>
    </div>
  );
}
