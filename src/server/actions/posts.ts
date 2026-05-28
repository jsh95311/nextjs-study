'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import type { ActionResult } from '@/server/actions/auth'

const createPostSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요').max(100, '제목은 100자 이하여야 합니다'),
  content: z.string().min(1, '내용을 입력해주세요'),
})

export async function createPost(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth()
  if (!session?.user?.id) {
    return { success: false, error: '인증이 필요합니다' }
  }

  const parsed = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  })

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  await db.post.create({
    data: {
      title: parsed.data.title,
      content: parsed.data.content,
      authorId: session.user.id,
    },
  })

  revalidatePath('/posts')
  return { success: true }
}

export async function deletePost(postId: string): Promise<ActionResult> {
  const session = await auth()
  if (!session?.user?.id) {
    return { success: false, error: '인증이 필요합니다' }
  }

  const post = await db.post.findUnique({ where: { id: postId } })
  if (!post) {
    return { success: false, error: '게시글을 찾을 수 없습니다' }
  }
  if (post.authorId !== session.user.id) {
    return { success: false, error: '삭제 권한이 없습니다' }
  }

  await db.post.delete({ where: { id: postId } })
  revalidatePath('/posts')
  return { success: true }
}
