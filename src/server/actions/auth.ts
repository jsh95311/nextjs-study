'use server'

import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { registerSchema, loginSchema } from '@/lib/validations'

export type ActionResult = { success: true } | { success: false; error: string }

export async function register(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = registerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  const { name, email, password } = parsed.data

  const existing = await db.user.findUnique({ where: { email } })
  if (existing) {
    return { success: false, error: '이미 사용 중인 이메일입니다' }
  }

  const hashed = await bcrypt.hash(password, 12)

  await db.user.create({
    data: { name, email, password: hashed },
  })

  return { success: true }
}

export async function login(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  const { signIn } = await import('@/lib/auth')
  const { AuthError } = await import('next-auth')

  try {
    await signIn('credentials', {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: '/dashboard',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다' }
    }
    throw error
  }

  return { success: true }
}
