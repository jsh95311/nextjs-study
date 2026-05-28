import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/db', () => ({
  db: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}))

vi.mock('@/lib/auth', () => ({
  signIn: vi.fn(),
}))

import { register } from '@/server/actions/auth'
import { db } from '@/lib/db'

describe('register action', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns error for invalid email', async () => {
    const formData = new FormData()
    formData.set('name', 'Test User')
    formData.set('email', 'not-an-email')
    formData.set('password', 'password123')

    const result = await register(null, formData)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toBe('이메일 형식이 아닙니다')
    }
    expect(db.user.findUnique).not.toHaveBeenCalled()
  })

  it('returns error for password shorter than 8 chars', async () => {
    const formData = new FormData()
    formData.set('name', 'Test User')
    formData.set('email', 'test@example.com')
    formData.set('password', 'short')

    const result = await register(null, formData)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toBe('비밀번호는 8자 이상이어야 합니다')
    }
    expect(db.user.findUnique).not.toHaveBeenCalled()
  })

  it('returns error if email already exists', async () => {
    vi.mocked(db.user.findUnique).mockResolvedValueOnce({
      id: '1',
      name: 'Existing',
      email: 'existing@example.com',
      emailVerified: null,
      image: null,
      password: 'hashed',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const formData = new FormData()
    formData.set('name', 'Test User')
    formData.set('email', 'existing@example.com')
    formData.set('password', 'password123')

    const result = await register(null, formData)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toBe('이미 사용 중인 이메일입니다')
    }
    expect(db.user.create).not.toHaveBeenCalled()
  })

  it('hashes password before storing and returns success', async () => {
    vi.mocked(db.user.findUnique).mockResolvedValueOnce(null)
    vi.mocked(db.user.create).mockResolvedValueOnce({
      id: '2',
      name: 'New User',
      email: 'new@example.com',
      emailVerified: null,
      image: null,
      password: 'hashed_value',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const formData = new FormData()
    formData.set('name', 'New User')
    formData.set('email', 'new@example.com')
    formData.set('password', 'password123')

    const result = await register(null, formData)

    expect(result.success).toBe(true)
    expect(db.user.create).toHaveBeenCalledOnce()

    const createArg = vi.mocked(db.user.create).mock.calls[0][0]
    expect(createArg.data.password).not.toBe('password123')
    expect(createArg.data.password).toMatch(/^\$2[ab]\$\d{2}\$/)
    expect(createArg.data.email).toBe('new@example.com')
    expect(createArg.data.name).toBe('New User')
  })
})
