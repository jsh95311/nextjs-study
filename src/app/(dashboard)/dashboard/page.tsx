import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { NavBar } from '@/components/nav-bar'

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const displayName = session.user?.name ?? session.user?.email ?? '사용자'

  return (
    <div className="min-h-screen bg-black">
      <div className="m-stripe w-full" />
      <NavBar current="dashboard" />

      <main style={{ padding: '96px 40px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div className="m-stripe" style={{ width: 48, height: 4, marginBottom: 32 }} />

          <h1
            style={{
              fontSize: 56,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#fff',
              lineHeight: 1.05,
              marginBottom: 16,
            }}
          >
            {displayName}
          </h1>

          <p style={{ fontSize: 14, fontWeight: 300, color: '#7e7e7e', letterSpacing: 0.5 }}>
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
              <div key={label} style={{ background: '#0d0d0d', padding: 24 }}>
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
