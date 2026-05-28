import { describe, it, expect, vi } from 'vitest'
import { NextRequest, NextResponse } from 'next/server'

vi.mock('next/server', () => {
  const redirect = vi.fn((url: URL) => ({ redirected: true, url: url.toString() }))
  const next = vi.fn(() => ({ next: true }))
  const NextResponseMock = { redirect, next }

  class NextRequestMock {
    cookies: { get: ReturnType<typeof vi.fn> }
    nextUrl: URL
    url: string
    constructor(url: string) {
      this.url = url
      this.nextUrl = new URL(url)
      this.cookies = { get: vi.fn() }
    }
  }

  return {
    NextResponse: NextResponseMock,
    NextRequest: NextRequestMock,
  }
})

import { middleware, config } from '../../middleware'

beforeEach(() => {
  vi.mocked(NextResponse.redirect).mockClear()
  vi.mocked(NextResponse.next).mockClear()
})

describe('middleware config', () => {
  it('matches /dashboard and subpaths', () => {
    expect(config.matcher).toContain('/dashboard/:path*')
  })
})

describe('middleware behavior', () => {
  it('redirects unauthenticated request to /login', () => {
    const req = new NextRequest('http://localhost:3000/dashboard')
    vi.mocked(req.cookies.get).mockReturnValue(undefined)

    middleware(req)

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      expect.objectContaining({ pathname: '/login' })
    )
  })

  it('allows authenticated request through', () => {
    const req = new NextRequest('http://localhost:3000/dashboard')
    vi.mocked(req.cookies.get).mockImplementation((name) =>
      name === 'authjs.session-token' ? { name, value: 'token' } : undefined
    )

    middleware(req)

    expect(NextResponse.next).toHaveBeenCalled()
    expect(NextResponse.redirect).not.toHaveBeenCalled()
  })
})
