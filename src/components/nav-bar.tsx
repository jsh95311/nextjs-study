import { auth } from '@/lib/auth'
import { SignOutButton } from '@/components/sign-out-button'
import Link from 'next/link'

interface NavBarProps {
  current?: 'dashboard' | 'posts' | 'settings'
}

export async function NavBar({ current }: NavBarProps) {
  const session = await auth()

  return (
    <header
      style={{
        height: 64,
        background: '#000',
        borderBottom: '1px solid #3c3c3c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Left: logo + nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <Link
          href="/dashboard"
          style={{
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 2,
            color: '#fff',
            textDecoration: 'none',
          }}
        >
          M
        </Link>

        <div style={{ width: 1, height: 20, background: '#3c3c3c' }} />

        <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <NavLink href="/dashboard" label="Dashboard" active={current === 'dashboard'} />
          <NavLink href="/posts" label="Posts" active={current === 'posts'} />
          <NavLink href="/settings" label="Settings" active={current === 'settings'} />
        </nav>
      </div>

      {/* Right: user + sign out */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {session?.user?.name && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 300,
              color: '#7e7e7e',
              letterSpacing: 0.5,
            }}
          >
            {session.user.name}
          </span>
        )}
        <SignOutButton />
      </div>
    </header>
  )
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string
  label: string
  active?: boolean
}) {
  return (
    <Link
      href={href}
      style={{
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        color: active ? '#ffffff' : '#7e7e7e',
        textDecoration: 'none',
        borderBottom: active ? '1px solid #ffffff' : '1px solid transparent',
        paddingBottom: 2,
        transition: 'color 0.2s',
      }}
    >
      {label}
    </Link>
  )
}
