import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-slate-900">Welcome Back</h1>
        <p className="text-lg text-slate-600">Choose an action to continue</p>
        <div className="flex gap-4 justify-center">
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
        </div>
      </div>
    </div>
  );
}
