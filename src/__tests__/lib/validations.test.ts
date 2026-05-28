import { describe, it, expect } from 'vitest'
import { loginSchema, registerSchema } from '@/lib/validations'

describe('loginSchema', () => {
  it('passes with valid email and password', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: 'anypassword',
    })
    expect(result.success).toBe(true)
  })

  it('fails with invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'not-an-email',
      password: 'anypassword',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('이메일 형식이 아닙니다')
    }
  })

  it('fails with empty password', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: '',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('비밀번호를 입력해주세요')
    }
  })
})

describe('registerSchema', () => {
  it('passes with valid name, email, password', () => {
    const result = registerSchema.safeParse({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    })
    expect(result.success).toBe(true)
  })

  it('fails with password shorter than 8 chars', () => {
    const result = registerSchema.safeParse({
      name: 'Test User',
      email: 'test@example.com',
      password: 'short',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('비밀번호는 8자 이상이어야 합니다')
    }
  })

  it('fails with empty name', () => {
    const result = registerSchema.safeParse({
      name: '',
      email: 'test@example.com',
      password: 'password123',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('이름을 입력해주세요')
    }
  })
})
