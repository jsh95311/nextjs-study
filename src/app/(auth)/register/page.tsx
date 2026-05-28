'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { register } from '@/server/actions/auth'
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
    <div className="flex min-h-screen flex-col bg-black">
      {/* M Stripe */}
      <div className="m-stripe w-full" />

      <div className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="w-full max-w-sm">
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 0,
              color: '#ffffff',
              marginBottom: 8,
            }}
          >
            Register
          </h1>
          <p
            style={{
              fontSize: 14,
              fontWeight: 300,
              color: '#7e7e7e',
              marginBottom: 40,
            }}
          >
            새 계정을 만드세요
          </p>

          <form action={action}>
            <div style={{ marginBottom: 20 }}>
              <label className="label-bmw" htmlFor="name">이름</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="홍길동"
                required
                autoComplete="name"
                className="input-bmw"
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label className="label-bmw" htmlFor="email">이메일</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="input-bmw"
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label className="label-bmw" htmlFor="password">비밀번호</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="8자 이상"
                required
                autoComplete="new-password"
                className="input-bmw"
              />
            </div>

            {state?.success === false && (
              <p
                style={{
                  fontSize: 13,
                  color: '#e22718',
                  marginBottom: 16,
                  letterSpacing: 0.3,
                }}
              >
                {state.error}
              </p>
            )}

            <button type="submit" className="btn-bmw" disabled={pending}>
              {pending ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <p
            style={{
              textAlign: 'center',
              fontSize: 13,
              fontWeight: 300,
              color: '#7e7e7e',
              marginTop: 32,
            }}
          >
            이미 계정이 있으신가요?{' '}
            <Link
              href="/login"
              style={{
                color: '#ffffff',
                textDecoration: 'underline',
                letterSpacing: 0.5,
              }}
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
