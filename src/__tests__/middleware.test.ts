import { describe, it, expect, vi } from 'vitest'

vi.mock('next-auth', () => ({
  default: vi.fn(() => ({ auth: vi.fn() })),
}))

vi.mock('@/lib/auth.config', () => ({
  authConfig: { session: { strategy: 'jwt' }, providers: [], pages: { signIn: '/login' } },
}))

describe('middleware config', () => {
  it('matches /dashboard and subpaths', async () => {
    const { config } = await import('../../middleware')
    expect(config.matcher).toContain('/dashboard/:path*')
  })
})
