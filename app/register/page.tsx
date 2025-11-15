import Image from "next/image";
import RegisterImage from "./../../assets/register.png";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-7 h-screen">
        {/* Left side - Illustration */}
        <div className="hidden lg:flex col-span-3 items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={RegisterImage}
              alt="Registration illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right side - Form */}
        <div className="col-span-4 flex items-center justify-center px-6 py-12 lg:px-8 overflow-y-auto">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900">
                Create your account
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Start managing your tasks efficiently
              </p>
            </div>

            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
