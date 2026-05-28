import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { deletePost } from '@/server/actions/posts'
import { NewPostForm } from './new-post-form'
import Link from 'next/link'
import { SignOutButton } from '@/components/sign-out-button'

export default async function PostsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const posts = await db.post.findMany({
    where: { authorId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen bg-black">
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
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: 2, color: '#fff' }}>M</span>
          <span style={{ width: 1, height: 20, background: '#3c3c3c' }} />
          <Link href="/dashboard" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#7e7e7e', textDecoration: 'none' }}>
            Dashboard
          </Link>
          <span style={{ fontSize: 11, color: '#3c3c3c' }}>/</span>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#fff' }}>
            Posts
          </span>
        </div>
        <SignOutButton />
      </header>

      {/* Content */}
      <main style={{ padding: '96px 40px', maxWidth: 800, margin: '0 auto' }}>
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
          Posts
        </h1>
        <p style={{ fontSize: 14, fontWeight: 300, color: '#7e7e7e', marginBottom: 64 }}>
          {posts.length}개의 게시글
        </p>

        {/* New post form */}
        <NewPostForm />

        {/* Post list */}
        {posts.length === 0 ? (
          <div
            style={{
              background: '#0d0d0d',
              border: '1px solid #3c3c3c',
              padding: 32,
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: 14, fontWeight: 300, color: '#7e7e7e' }}>
              아직 게시글이 없습니다. 위에서 첫 글을 작성해 보세요.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {posts.map((post) => (
              <div
                key={post.id}
                style={{
                  background: '#0d0d0d',
                  border: '1px solid #3c3c3c',
                  padding: '24px 32px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 24,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h2
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: '#fff',
                      marginBottom: 8,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 300,
                      color: '#bbbbbb',
                      lineHeight: 1.5,
                      marginBottom: 12,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.content}
                  </p>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 1.5,
                      color: '#7e7e7e',
                    }}
                  >
                    {new Date(post.createdAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                {/* Delete */}
                <form
                  action={async () => {
                    'use server'
                    await deletePost(post.id)
                  }}
                >
                  <button
                    type="submit"
                    style={{
                      height: 32,
                      padding: '0 16px',
                      background: 'transparent',
                      border: '1px solid #3c3c3c',
                      color: '#7e7e7e',
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 1.5,
                      cursor: 'pointer',
                      borderRadius: 0,
                      flexShrink: 0,
                    }}
                  >
                    Delete
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
