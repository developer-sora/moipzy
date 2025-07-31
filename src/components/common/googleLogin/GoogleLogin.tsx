"use client";

import { signInWithGoogle } from "@/lib/supabase/actions";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

const GoogleLogo = () => (
  <svg
    className="w-5 h-5 mr-2"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_17_40)">
      <path
        d="M47.532 24.552c0-1.636-.146-3.192-.418-4.668H24.48v8.844h12.98c-.56 3.016-2.24 5.572-4.78 7.292v6.06h7.74c4.54-4.184 7.112-10.348 7.112-17.528z"
        fill="#4285F4"
      />
      <path
        d="M24.48 48c6.48 0 11.924-2.148 15.896-5.84l-7.74-6.06c-2.148 1.44-4.892 2.292-8.156 2.292-6.272 0-11.588-4.236-13.492-9.936H2.56v6.236C6.52 43.66 14.68 48 24.48 48z"
        fill="#34A853"
      />
      <path
        d="M10.988 28.456A14.98 14.98 0 0 1 9.2 24c0-1.548.266-3.048.74-4.456V13.308H2.56A23.98 23.98 0 0 0 0 24c0 3.944.94 7.684 2.56 10.692l8.428-6.236z"
        fill="#FBBC05"
      />
      <path
        d="M24.48 9.548c3.528 0 6.66 1.216 9.14 3.6l6.84-6.84C36.4 2.14 30.96 0 24.48 0 14.68 0 6.52 4.34 2.56 13.308l8.428 6.236c1.904-5.7 7.22-9.936 13.492-9.936z"
        fill="#EA4335"
      />
    </g>
    <defs>
      <clipPath id="clip0_17_40">
        <path fill="#fff" d="M0 0h48v48H0z" />
      </clipPath>
    </defs>
  </svg>
);

const GoogleLogin = () => {
  return (
    <button
      onClick={signInWithGoogle}
      className="w-full flex items-center justify-center border border-zinc-200 bg-white rounded-lg shadow-sm px-4 py-2 text-zinc-800 font-medium hover:bg-zinc-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {/* <Loader2 className="w-5 h-5 mr-2 animate-spin" /> */}
      <GoogleLogo />
      <span>Google로 로그인</span>
    </button>
  );
};

export default GoogleLogin;
