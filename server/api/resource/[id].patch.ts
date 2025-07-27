import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

const updateTransactionSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  type: z.string().optional(),
  url: z.string().optional(),
  tags: z.string().optional(),
})

export default eventHandler(async (e) => {
  try {
    const { id } = await getValidatedRouterParams(e, (params) => {
      return z.object({
        id: z.string().uuid(),
      }).parse(params)
    })

    const userId = await authZ(e)

    const {
      name,
      description,
      type,
      url,
      tags,
    } = await readValidatedBody(e, body => updateTransactionSchema.parse(body))

    if (id) {
      const [resource] = await db
        .select({
          id: resourceSchema.id,
          userId: resourceSchema.userId,
        })
        .from(resourceSchema)
        .where(
          and(
            eq(resourceSchema.id, id),
            eq(resourceSchema.userId, userId),
          ),
        )

      if (!account) {
        throw createError({ status: 404, message: 'Account not found or unauthorized' })
      }
    }

    const [existingTransaction] = await db
      .select({
        id: resourceSchema.id,
      })
      .from(resourceSchema)
      .where(
        and(
          eq(resourceSchema.id, id),
          eq(resourceSchema.userId, userId),
        ),
      )

    if (!existingTransaction) {
      throw createError({ status: 404, message: 'Resource not found or unauthorized' })
    }

    await db
      .transaction(async (trx) => {
        let newEntity = id

        if (!id && name) {
          const [entity] = await trx
            .insert(resourceSchema)
            .values({
              status: 'active',
              nextBilledAt: new Date(),
              cancelAt: null,
              cancelAtPeriodEnd: false,
              ...(name && { name }),
              ...(description && { description }),
              ...(url && { url }),
              ...(type && { type }),
              ...(tags && { tags }),
              userId,
            })
            .returning()

          newEntity = entity.id
        }

        await trx
          .update(resourceSchema)
          .set({
            status: 'active',
            nextBilledAt: new Date(),
            cancelAt: null,
            cancelAtPeriodEnd: false,
            ...(name && { name }),
            ...(description && { description }),
            ...(url && { url }),
            ...(type && { type }),
            ...(tags && { tags }),
          })
          .where(
            eq(resourceSchema.id, existingTransaction.id),
          )
          .returning()

        return existingTransaction
      })

    return {
      success: true,
    }
  }
  catch (error) {
    if (error instanceof Error) {
      console.error(error)
      throw createError({ status: 500, message: 'Internal server error' })
    }
  }
})
