import { Button } from "@/components/ui/button";
import { AUTH_KEYS } from "@/constants";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(AUTH_KEYS.ACCESS_TOKEN)?.value;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-slate-900">Welcome Back</h1>
        <p className="text-lg text-slate-600">Choose an action to continue</p>
        <div className="flex gap-4 justify-center">
          {!accessToken && (
            <>
              <Link href="/login">
                <Button variant={"default"} size={"lg"}>
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant={"outline"} size={"lg"}>
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          <Link href="/dashboard">
            <Button variant={"destructive"} size={"lg"}>
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
