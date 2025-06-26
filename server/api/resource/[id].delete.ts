import { and, eq, sql } from 'drizzle-orm'
import { z } from 'zod'

export default eventHandler(async (e) => {
  try {
    const { transactionId } = await getValidatedRouterParams(e, (params) => {
      return z.object({
        transactionId: z.string().uuid(),
      }).parse(params)
    })

    const userId = await authZ(e)

    const [personalAccount] = await db
      .select({
        personalAccountId: personalTransactionsSchema.personalAccountId,
        userId: personalAccountsSchema.userId,
      })
      .from(personalTransactionsSchema)
      .innerJoin(personalAccountsSchema, eq(
        personalTransactionsSchema.personalAccountId,
        personalAccountsSchema.id,
      ))
      .where(
        and(
          eq(personalTransactionsSchema.id, transactionId),
          eq(personalAccountsSchema.userId, userId),
        ),
      )

    if (!personalAccount || personalAccount.userId !== userId) {
      throw createError({ status: 404, message: 'Transaction not found' })
    }

    await db
      .transaction(async (trx) => {
        const [existingTransaction] = await trx
          .select({
            type: personalTransactionsSchema.type,
            amount: personalTransactionsSchema.amount,
          })
          .from(personalTransactionsSchema)
          .where(
            and(
              eq(personalTransactionsSchema.id, transactionId),
              eq(personalTransactionsSchema.personalAccountId, personalAccount.personalAccountId),
            ),
          )

        await trx
          .update(personalAccountsSchema)
          .set({
            balance: existingTransaction?.type === 'expense'
              ? sql`${personalAccountsSchema.balance} + ${existingTransaction?.amount}`
              : sql`${personalAccountsSchema.balance} - ${existingTransaction?.amount}`,
          })
          .where(
            eq(personalAccountsSchema.id, personalAccount.personalAccountId),
          )
          .returning()

        await trx.delete(personalTransactionsSchema)
          .where(
            eq(personalTransactionsSchema.id, transactionId),
          )
      })
  }
  catch (error) {
    if (error instanceof Error) {
      console.error(error)
      throw createError({ status: 500, message: 'Internal server error' })
    }
  }
})
