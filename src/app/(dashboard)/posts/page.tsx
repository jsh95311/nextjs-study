import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { deletePost } from '@/server/actions/posts'
import { NewPostForm } from './new-post-form'
import { NavBar } from '@/components/nav-bar'

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
      <NavBar current="posts" />

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

        <NewPostForm />

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

                <form
                  action={async () => {
                    'use server'
                    await deletePost(post.id)
                  }}
                >
                  <button
                    type="submit"
                    className="btn-logout"
                    style={{ height: 32, padding: '0 16px', fontSize: 10 }}
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
