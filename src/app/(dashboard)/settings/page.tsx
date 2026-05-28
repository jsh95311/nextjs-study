'use client'

import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateProfile } from '@/server/actions/profile'
import Link from 'next/link'

export default function SettingsPage() {
  const router = useRouter()
  const [state, action, pending] = useActionState(updateProfile, null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (state?.success) {
      setSaved(true)
      setTimeout(() => {
        setSaved(false)
        router.refresh()
      }, 1500)
    }
  }, [state, router])

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
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: 2, color: '#fff' }}>
            M
          </span>
          <span style={{ width: 1, height: 20, background: '#3c3c3c' }} />
          <Link
            href="/dashboard"
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              color: '#7e7e7e',
              textDecoration: 'none',
            }}
          >
            Dashboard
          </Link>
          <span style={{ fontSize: 11, color: '#3c3c3c' }}>/</span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              color: '#ffffff',
            }}
          >
            Settings
          </span>
        </div>
      </header>

      {/* Content */}
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

          {/* Profile form */}
          <div
            style={{
              background: '#0d0d0d',
              border: '1px solid #3c3c3c',
              padding: 32,
              marginBottom: 1,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                color: '#7e7e7e',
                marginBottom: 24,
              }}
            >
              Profile
            </div>

            <form action={action}>
              <div style={{ marginBottom: 24 }}>
                <label className="label-bmw" htmlFor="name">
                  이름
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="홍길동"
                  required
                  className="input-bmw"
                />
              </div>

              {state?.success === false && (
                <p style={{ fontSize: 13, color: '#e22718', marginBottom: 16 }}>
                  {state.error}
                </p>
              )}

              {saved && (
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 1.5,
                    color: '#0066b1',
                    marginBottom: 16,
                  }}
                >
                  SAVED ✓
                </p>
              )}

              <button
                type="submit"
                className="btn-bmw"
                disabled={pending}
                style={{ width: 'auto', padding: '0 32px' }}
              >
                {pending ? 'SAVING...' : 'SAVE CHANGES'}
              </button>
            </form>
          </div>

          {/* Danger zone */}
          <div
            style={{
              background: '#0d0d0d',
              border: '1px solid #3c3c3c',
              borderTop: 'none',
              padding: 32,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                color: '#7e7e7e',
                marginBottom: 16,
              }}
            >
              Account
            </div>
            <p style={{ fontSize: 13, fontWeight: 300, color: '#bbbbbb', marginBottom: 0 }}>
              이메일 주소는 변경할 수 없습니다.
              비밀번호 재설정 및 계정 삭제 기능은 준비 중입니다.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
