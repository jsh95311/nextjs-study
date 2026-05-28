'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/server/actions/auth'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  const router = useRouter()
  const [state, action, pending] = useActionState(login, null)

  useEffect(() => {
    if (state?.success) {
      router.push('/dashboard')
    }
  }, [state, router])

  return (
    <div className="flex min-h-screen flex-col bg-black">
      {/* M Stripe */}
      <div className="m-stripe w-full" />

      <div className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="w-full max-w-sm">
          {/* Headline */}
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
            Log In
          </h1>
          <p
            style={{
              fontSize: 14,
              fontWeight: 300,
              color: '#7e7e7e',
              marginBottom: 40,
            }}
          >
            계정에 로그인하세요
          </p>

          {/* Form */}
          <form action={action}>
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
                placeholder="••••••••"
                required
                autoComplete="current-password"
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
              {pending ? 'LOGGING IN...' : 'LOG IN'}
            </button>
          </form>

          {/* OR divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              margin: '24px 0',
            }}
          >
            <div style={{ flex: 1, height: 1, background: '#3c3c3c' }} />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                color: '#7e7e7e',
              }}
            >
              OR
            </span>
            <div style={{ flex: 1, height: 1, background: '#3c3c3c' }} />
          </div>

          {/* Google button */}
          <button
            type="button"
            className="btn-bmw"
            style={{ borderColor: '#3c3c3c', color: '#bbbbbb' }}
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          >
            GOOGLE로 로그인
          </button>

          {/* Register link */}
          <p
            style={{
              textAlign: 'center',
              fontSize: 13,
              fontWeight: 300,
              color: '#7e7e7e',
              marginTop: 32,
            }}
          >
            계정이 없으신가요?{' '}
            <Link
              href="/register"
              style={{
                color: '#ffffff',
                textDecoration: 'underline',
                letterSpacing: 0.5,
              }}
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
