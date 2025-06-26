import { and, eq, sql } from 'drizzle-orm'
import { z } from 'zod'

export default eventHandler(async (e) => {
  try {
    const { id } = await getValidatedRouterParams(e, (params) => {
      return z.object({
        id: z.string().uuid(),
      }).parse(params)
    })

    const userId = await authZ(e)


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

      if (!resource) {
        throw createError({ status: 404, message: 'Resource not found or unauthorized' })
      }
    }

    const [existingTransaction] = await db
      .select({
        id: resourceSchema.id,
        type: resourceSchema.type,
        currentAccountId: resourceSchema.personalAccountId,
      })
      .from(resourceSchema)
      .innerJoin(
        resourceSchema,
        eq(resourceSchema.personalAccountId, resourceSchema.id),
      )
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
              name,
              userId,
            })
            .returning()

          newEntity = entity.id
        }

        // Get the old transaction amount for balance calculation
        const [oldTransaction] = await trx
          .select({
            amount: personalTransactionsSchema.amount,
            type: personalTransactionsSchema.type,
          })
          .from(resourceSchema)
          .where(
            eq(resourceSchema.id, existingTransaction.id),
          )

        await trx
          .update(resourceSchema)
          .set({
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

        // Update account balance if account is changing
        if (id && id !== existingTransaction.currentAccountId) {
          // Remove old amount from old account
          await trx
            .update(resourceSchema)
            .set({
              balance: oldTransaction.type === 'expense'
                ? sql`${resourceSchema.balance} + ${oldTransaction.amount}`
                : sql`${resourceSchema.balance} - ${oldTransaction.amount}`,
            })
            .where(
              eq(resourceSchema.id, existingTransaction.currentAccountId),
            )

          // Add new amount to new account
          await trx
            .update(resourceSchema)
            .set({
              balance: oldTransaction.type === 'expense'
                ? sql`${resourceSchema.balance} - ${amount}`
                : sql`${resourceSchema.balance} + ${amount}`,
            })
            .where(
              eq(resourceSchema.id, existingTransaction.currentAccountId),
            )
        }
        // If account is not changing but amount is, update the balance
        else if (amount !== undefined) {
          // For expense: if amount increases, balance decreases more
          // For income: if amount increases, balance increases more
          await trx
            .update(personalAccountsSchema)
            .set({
              balance: oldTransaction.type === 'expense'
                ? sql`${personalAccountsSchema.balance} + ${oldTransaction.amount} - ${amount}`
                : sql`${personalAccountsSchema.balance} - ${oldTransaction.amount} + ${amount}`,
            })
            .where(
              eq(personalAccountsSchema.id, existingTransaction.currentAccountId),
            )
        }
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
