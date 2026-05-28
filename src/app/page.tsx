import Link from 'next/link'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const session = await auth()
  if (session) redirect('/dashboard')

  return (
    <div className="flex min-h-screen flex-col bg-black">
      {/* M Stripe */}
      <div className="m-stripe w-full" />

      {/* Nav */}
      <header
        style={{
          height: 64,
          background: '#000',
          borderBottom: '1px solid #3c3c3c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 2,
            color: '#fff',
          }}
        >
          M
        </span>
        <nav style={{ display: 'flex', gap: 32 }}>
          <Link
            href="/login"
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              color: '#7e7e7e',
              textDecoration: 'none',
            }}
          >
            Log In
          </Link>
          <Link
            href="/register"
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              color: '#ffffff',
              textDecoration: 'none',
            }}
          >
            Register
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '96px 40px',
          maxWidth: 1440,
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* M stripe accent */}
        <div className="m-stripe" style={{ width: 48, height: 4, marginBottom: 40 }} />

        <h1
          style={{
            fontSize: 'clamp(48px, 8vw, 80px)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 0,
            color: '#ffffff',
            lineHeight: 1.0,
            marginBottom: 24,
          }}
        >
          Next.js
          <br />
          Boilerplate.
        </h1>

        <p
          style={{
            fontSize: 16,
            fontWeight: 300,
            color: '#bbbbbb',
            lineHeight: 1.5,
            maxWidth: 480,
            marginBottom: 64,
          }}
        >
          Next.js 15 · Auth.js v5 · Prisma v5 · shadcn/ui.
          이메일/비밀번호 + Google OAuth.
          서버 액션, JWT 세션.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link
            href="/register"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 48,
              padding: '0 32px',
              background: '#ffffff',
              border: '1px solid #ffffff',
              color: '#000000',
              fontSize: 14,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              textDecoration: 'none',
            }}
          >
            Get Started
          </Link>
          <Link
            href="/login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 48,
              padding: '0 32px',
              background: 'transparent',
              border: '1px solid #3c3c3c',
              color: '#bbbbbb',
              fontSize: 14,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              textDecoration: 'none',
            }}
          >
            Log In →
          </Link>
        </div>

        {/* Spec row */}
        <div
          style={{
            display: 'flex',
            gap: 1,
            marginTop: 96,
            background: '#3c3c3c',
            maxWidth: 720,
          }}
        >
          {[
            { label: 'Framework', value: 'Next.js 15' },
            { label: 'Auth', value: 'Auth.js v5' },
            { label: 'Database', value: 'Prisma v5' },
            { label: 'UI', value: 'shadcn/ui' },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                flex: 1,
                background: '#0d0d0d',
                padding: '20px 16px',
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: 4,
                  textTransform: 'uppercase',
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  color: '#7e7e7e',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid #3c3c3c',
          padding: '24px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 300,
            color: '#7e7e7e',
          }}
        >
          Next.js 보일러플레이트 — MIT License
        </span>
        <Link
          href="https://github.com/jsh95311/nextjs-study"
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            color: '#7e7e7e',
            textDecoration: 'none',
          }}
        >
          GitHub →
        </Link>
      </footer>
    </div>
  )
}
