'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { register } from '@/server/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [state, action, pending] = useActionState(register, null)

  useEffect(() => {
    if (state?.success) {
      router.push('/login?registered=true')
    }
  }, [state, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">회원가입</CardTitle>
          <CardDescription>새 계정을 만드세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="홍길동"
                required
                autoComplete="name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="8자 이상"
                required
                autoComplete="new-password"
              />
            </div>
            {state?.success === false && (
              <p className="text-sm text-red-500">{state.error}</p>
            )}
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? '가입 중...' : '회원가입'}
            </Button>
          </form>
          <p className="text-center text-sm text-gray-500">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="underline hover:text-gray-900">
              로그인
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
