'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

interface LoginFormData {
  email: string
  password: string
  remember?: boolean
}

export default function LoginForm() {
  const form = useForm<LoginFormData>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    }
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      console.log('Login data:', data)
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Login successful!')
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-900">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email'
            }
          }}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-900">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Enter your password"
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 4,
              message: 'Password must be at least 4 characters'
            }
          }}
        />

        {/* Remember & Forgot Password */}
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm text-slate-600 cursor-pointer">
                  Remember me
                </FormLabel>
              </FormItem>
            )}
          />
          <Link href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Forgot your password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          size="lg"
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </Button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
            Register now
          </Link>
        </p>
      </form>
    </Form>
  )
}
