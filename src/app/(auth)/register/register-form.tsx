'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { RegisterBody, RegisterBodyType } from '@/schemaValidations/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { PATH } from '@/constants/path'

export default function RegisterForm() {
  const router = useRouter()
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
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
            <CardTitle className="text-2xl">Sign up</CardTitle>
            <CardDescription>Fill in the necessary information to register an account</CardDescription>
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
                  <ul className="text-sm text-gray-600 list-disc px-8">
                    <li>At least 6 characters</li>
                    <li>At least 1 uppercase letter</li>
                    <li>At least 1 special character</li>
                  </ul>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid gap-2">
                          <div className="flex items-center">
                            <Label htmlFor="confirmPassword">Confirm password</Label>
                          </div>
                          <Input id="confirmPassword" type="password" required {...field} />
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Sign up
                  </Button>
                  <div className="flex items-center justify-center italic text-sm mt-2">
                    <span className="text-gray-600">Already have an account?</span>
                    <button
                      type="button"
                      className="ml-1 font-bold hover:opacity-70"
                      onClick={() => router.push(PATH.login)}
                    >
                      Sign in
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
