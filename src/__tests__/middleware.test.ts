import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn((handler: unknown) => handler),
}))

describe('middleware config', () => {
  it('matches /dashboard and subpaths', async () => {
    const { config } = await import('../../middleware')
    expect(config.matcher).toContain('/dashboard/:path*')
  })
})
