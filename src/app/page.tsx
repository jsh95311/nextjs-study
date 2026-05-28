import Link from 'next/link'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { buttonVariants } from '@/components/ui/button'

export default async function HomePage() {
  const session = await auth()
  if (session) redirect('/dashboard')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Next.js 보일러플레이트
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          Next.js 16 + NextAuth v5 + Prisma v7 + shadcn/ui
        </p>
      </div>
      <div className="flex gap-3">
        <Link href="/login" className={buttonVariants()}>
          로그인
        </Link>
        <Link href="/register" className={buttonVariants({ variant: 'outline' })}>
          회원가입
        </Link>
      </div>
    </div>
  )
}
