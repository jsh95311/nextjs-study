import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { SignOutButton } from '@/components/sign-out-button'

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const displayName = session.user?.name ?? session.user?.email ?? '사용자'

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-semibold">대시보드</h1>
          <SignOutButton />
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-gray-600">
          안녕하세요,{' '}
          <span className="font-medium text-gray-900">{displayName}</span>님!
        </p>
        <p className="mt-2 text-sm text-gray-400">
          {session.user?.email}으로 로그인됨
        </p>
      </main>
    </div>
  )
}
