'use client'

import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateProfile } from '@/server/actions/profile'

export function SettingsForm() {
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
    <div>
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
            <label className="label-bmw" htmlFor="name">이름</label>
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

      {/* Account info */}
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
        <p style={{ fontSize: 13, fontWeight: 300, color: '#bbbbbb' }}>
          이메일 주소는 변경할 수 없습니다.
          비밀번호 재설정 및 계정 삭제 기능은 준비 중입니다.
        </p>
      </div>
    </div>
  )
}
