"use server";

import { cookies } from "next/headers";

export const userLogin = async (data: { email: string; password: string }) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  const cookie = await cookies();

  if (resData.success) {
    cookie.set("accessToken", resData.accessToken);
    cookie.set("refreshToken", resData.refreshToken);
    return true;
  } else return false;
};
