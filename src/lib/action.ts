"use server";

import { cookies } from "next/headers";

export const userLogin = async (data: { email: string; password: string }) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  console.log(resData);
  const cookie = await cookies();

  if (resData.success) {
    cookie.set("accessToken", resData.result.accessToken);
    cookie.set("refreshToken", resData.result.refreshToken);
    return true;
  } else return false;
};
