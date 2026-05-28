import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { SignOutButton } from '@/components/sign-out-button'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const displayName = session.user?.name ?? session.user?.email ?? '사용자'

  return (
    <div className="min-h-screen bg-black">
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* M badge */}
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
          <span
            style={{
              width: 1,
              height: 20,
              background: '#3c3c3c',
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              color: '#7e7e7e',
            }}
          >
            Dashboard
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link
            href="/posts"
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              color: '#7e7e7e',
              textDecoration: 'none',
            }}
          >
            Posts
          </Link>
          <Link
            href="/settings"
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              color: '#7e7e7e',
              textDecoration: 'none',
            }}
          >
            Settings
          </Link>
          <SignOutButton />
        </div>
      </header>

      {/* Content */}
      <main style={{ padding: '96px 40px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          {/* Section divider */}
          <div className="m-stripe" style={{ width: 48, height: 4, marginBottom: 32 }} />

          <h1
            style={{
              fontSize: 56,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 0,
              color: '#fff',
              lineHeight: 1.05,
              marginBottom: 16,
            }}
          >
            {displayName}
          </h1>

          <p
            style={{
              fontSize: 14,
              fontWeight: 300,
              color: '#7e7e7e',
              letterSpacing: 0.5,
            }}
          >
            {session.user?.email}
          </p>

          {/* Spec cells */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 1,
              marginTop: 96,
              background: '#3c3c3c',
            }}
          >
            {[
              { label: 'Status', value: 'Active' },
              { label: 'Plan', value: 'Free' },
              { label: 'Auth', value: 'Email' },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  background: '#0d0d0d',
                  padding: '24px',
                }}
              >
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#fff',
                    marginBottom: 8,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontSize: 11,
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
        </div>
      </main>
    </div>
  )
}
