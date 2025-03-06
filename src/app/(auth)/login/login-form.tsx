'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { PATH } from '@/constants/path'

export default function LoginForm() {
  const router = useRouter()
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  return (
    <div className="flex h-full">
      <div className="w-2/5 flex items-center justify-center">
        <Card className="mx-auto shadow-none border-none h-full max-w-xl min-w-lg">
          <CardHeader>
            <Image
              src="/logo-light-login.png"
              alt="Background Image"
              width={200}
              height={200}
              className="object-cover mx-auto my-5"
              priority
            />
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your email and password to log in to the website</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form noValidate>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="m@example.com" required {...field} />
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid gap-2">
                          <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                          </div>
                          <Input id="password" type="password" required {...field} />
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className="text-end">
                    <button type="button" className="font-light italic text-sm hover:underline pr-2" onClick={() => {}}>
                      Forgot password?
                    </button>
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <Button variant="outline" className="w-full m-0 p-0 mt-2" type="button">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Login with Google
                  </Button>
                  <div className="flex items-center justify-center italic text-sm mt-2">
                    <span className="text-gray-600">Don&apos;t have an account?</span>
                    <button
                      type="button"
                      className="ml-1 font-bold hover:opacity-70"
                      onClick={() => router.push(PATH.register)}
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="w-3/5 relative">
        <Image src="/bg-login.webp" alt="Background Image" fill className="object-cover" priority />
      </div>
    </div>
  )
}
