import { NavBar } from '@/components/nav-bar'
import { SettingsForm } from './settings-form'

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="m-stripe w-full" />
      <NavBar current="settings" />

      <main style={{ padding: '96px 40px' }}>
        <div style={{ maxWidth: 480 }}>
          <div className="m-stripe" style={{ width: 48, height: 4, marginBottom: 32 }} />

          <h1
            style={{
              fontSize: 40,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#fff',
              marginBottom: 8,
            }}
          >
            Settings
          </h1>
          <p style={{ fontSize: 14, fontWeight: 300, color: '#7e7e7e', marginBottom: 64 }}>
            프로필 정보를 수정합니다
          </p>

          <SettingsForm />
        </div>
      </main>
    </div>
  )
}
