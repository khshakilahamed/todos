import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-slate-900">Welcome</h1>
        <p className="text-lg text-slate-600">Choose an action to continue</p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Log In
          </Link>
          <Link href="/register" className="px-8 py-3 bg-slate-200 text-slate-900 rounded-lg font-semibold hover:bg-slate-300 transition">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
