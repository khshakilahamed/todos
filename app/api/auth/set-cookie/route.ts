import { AUTH_KEYS } from "@/constants";
import { cookies } from "next/headers";

export async function POST(req: Request) {
      const { accessToken } = await req.json();

      if (!accessToken) {
            return Response.json({ error: "Token missing" }, { status: 400 });
      }

      const cookieStore = await cookies()
      cookieStore.set(AUTH_KEYS.ACCESS_TOKEN, accessToken)

      return Response.json({ success: true });
}
