import { describe, it, expect, vi } from 'vitest'

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(function () { return {} }),
}))

describe('db singleton', () => {
  it('exports a db object', async () => {
    const { db } = await import('@/lib/db')
    expect(db).toBeDefined()
    expect(typeof db).toBe('object')
  })

  it('returns same instance on multiple imports', async () => {
    const { db: db1 } = await import('@/lib/db')
    const { db: db2 } = await import('@/lib/db')
    expect(db1).toBe(db2)
  })
})
