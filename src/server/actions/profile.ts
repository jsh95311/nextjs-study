'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import type { ActionResult } from '@/server/actions/auth'

const updateProfileSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요').max(50, '이름은 50자 이하여야 합니다'),
})

export async function updateProfile(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth()
  if (!session?.user?.id) {
    return { success: false, error: '인증이 필요합니다' }
  }

  const parsed = updateProfileSchema.safeParse({
    name: formData.get('name'),
  })

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  await db.user.update({
    where: { id: session.user.id },
    data: { name: parsed.data.name },
  })

  return { success: true }
}
