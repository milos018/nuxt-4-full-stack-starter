import type { H3Event } from 'h3'
import { fromNodeHeaders } from 'better-auth/node'

export async function authZ(e: H3Event) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(e.node.req.headers),
  })

  if (!session?.user?.id) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  return session.user.id
}
