"use server";

import { AUTH_KEYS } from "@/constants";
import { cookies } from "next/headers";

export async function loginAction(accessToken: string) {
      (await cookies()).set(AUTH_KEYS.ACCESS_TOKEN, accessToken);
}

export async function logoutAction() {
      const cookieStore = await cookies();

      // Remove accessToken cookie
      cookieStore.delete(AUTH_KEYS.ACCESS_TOKEN);
}
