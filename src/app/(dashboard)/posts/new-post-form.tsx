'use client'

import { useActionState, useEffect, useRef } from 'react'
import { createPost } from '@/server/actions/posts'

export function NewPostForm() {
  const [state, action, pending] = useActionState(createPost, null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <div
      style={{
        background: '#0d0d0d',
        border: '1px solid #3c3c3c',
        padding: 32,
        marginBottom: 48,
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
        New Post
      </div>

      <form ref={formRef} action={action}>
        <div style={{ marginBottom: 16 }}>
          <label className="label-bmw" htmlFor="title">제목</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="게시글 제목"
            required
            className="input-bmw"
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label className="label-bmw" htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            placeholder="게시글 내용을 입력하세요"
            required
            rows={5}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#0d0d0d',
              border: '1px solid #3c3c3c',
              color: '#ffffff',
              fontSize: 16,
              fontWeight: 300,
              borderRadius: 0,
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#ffffff' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = '#3c3c3c' }}
          />
        </div>

        {state?.success === false && (
          <p style={{ fontSize: 13, color: '#e22718', marginBottom: 16 }}>
            {state.error}
          </p>
        )}

        {state?.success && (
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
            POSTED ✓
          </p>
        )}

        <button
          type="submit"
          className="btn-bmw"
          disabled={pending}
          style={{ width: 'auto', padding: '0 32px' }}
        >
          {pending ? 'POSTING...' : 'PUBLISH'}
        </button>
      </form>
    </div>
  )
}
