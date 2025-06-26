import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

export default eventHandler(async (event) => {
  try {
    const userId = await authZ(event)

    const { accountId } = await getValidatedRouterParams(event, z.object({
      accountId: z.string().uuid(),
    }).parse)

    await db
      .delete(resourceSchema)
      .where(
        and(
          eq(
            resourceSchema.id,
            accountId,
          ),
          eq(
            resourceSchema.userId,
            userId,
          ),
        ),
      )
  }
  catch (error) {
    console.error(error)

    if (error instanceof Error) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Account not found',
      })
    }
  }
})
