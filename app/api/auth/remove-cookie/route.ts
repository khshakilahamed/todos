import { AUTH_KEYS } from "@/constants";
import { cookies } from "next/headers";

export async function POST() {
      const cookieStore = await cookies();

      // Remove accessToken cookie
      cookieStore.delete(AUTH_KEYS.ACCESS_TOKEN);

      return Response.json({ success: true });
}
