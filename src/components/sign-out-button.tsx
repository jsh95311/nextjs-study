import { signOut } from '@/lib/auth'

export function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut({ redirectTo: '/' })
      }}
    >
      <button
        type="submit"
        style={{
          height: 36,
          padding: '0 20px',
          background: 'transparent',
          border: '1px solid #3c3c3c',
          color: '#7e7e7e',
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 1.5,
          cursor: 'pointer',
          borderRadius: 0,
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = '#ffffff'
          e.currentTarget.style.color = '#ffffff'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = '#3c3c3c'
          e.currentTarget.style.color = '#7e7e7e'
        }}
      >
        Log Out
      </button>
    </form>
  )
}
