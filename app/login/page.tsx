import LoginForm from '@/components/LoginForm'
import Image from 'next/image'
import LoginImage from './../../assets/login.png';

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <div className="grid lg:grid-cols-7 h-screen">
        {/* Left side - Illustration */}
        <div className="hidden lg:flex lg:col-span-3 items-center justify-center ">
          <div className="relative w-full h-full">
            <Image
              src={LoginImage}
              alt="Login illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right side - Form */}
        <div className="lg:col-span-4 flex items-center justify-center px-6 py-12 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900">
                Log in to your account
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Start managing your tasks efficiently
              </p>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
