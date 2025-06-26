import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

export default eventHandler(async (event) => {
  try {
    const userId = await authZ(event)

    const { accountId } = await getValidatedRouterParams(event, z.object({
      accountId: z.string().uuid(),
    }).parse)

    const {
      isActive,
      name,
      currency,
      balance,
    } = await readValidatedBody(event, z.object({
      isActive: z.boolean().optional(),
      name: z.string().min(1).optional(),
      currency: z.string().min(1).optional(),
      balance: z.number().min(0).optional(),
    }).parse)

    await db
      .update(personalAccountsSchema)
      .set({
        isActive: isActive ?? undefined,
        label: name ?? undefined,
        currency: currency ?? undefined,
        balance: balance?.toString() ?? undefined,
      })
      .where(
        and(
          eq(
            personalAccountsSchema.id,
            accountId,
          ),
          eq(
            personalAccountsSchema.userId,
            userId,
          ),
        ),
      )
      .returning()

    return {
      message: 'Account updated',
    }
  }
  catch (error) {
    if (error instanceof Error) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Account not found',
      })
    }
  }
})
