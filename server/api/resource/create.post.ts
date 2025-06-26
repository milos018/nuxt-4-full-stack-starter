import { and, eq, sql } from 'drizzle-orm'
import { z } from 'zod'

const createTransactionSchema = z.object({
  name: z.string(),
  type: z.enum(['income', 'expense']),
  personalAccountId: z.string(),
  paymentMethodId: z.string().optional(),
  date: z.string(),
  amount: z.number(),
  entityId: z.string().optional(),
  entityLabel: z.string().optional(),
  categoryId: z.string().optional(),
  subcategoryId: z.string().optional(),
  isCleared: z.boolean().optional(),
  isRecurring: z.boolean().optional(),
  description: z.string().optional(),
  documentUrl: z.string().optional(),
})

export default eventHandler(async (e) => {
  try {
    const userId = await authZ(e)

    const {
      name,
      type,
      personalAccountId,
      paymentMethodId,
      date,
      amount,
      description,
      url,
      tags,
    } = await readValidatedBody(e, body => createTransactionSchema.parse(body))

    const [personalAccount] = await db
      .select()
      .from(resourceSchema)
      .where(
        and(
          eq(resourceSchema.id, personalAccountId),
          eq(resourceSchema.userId, userId),
        ),
      )

    const result = await db.transaction(async (tx) => {
      let newEntity = id

      if (!id && name) {
        const [entity] = await tx
          .insert(resourceSchema)
          .values({
            status: 'active',
            nextBilledAt: new Date(),
            cancelAt: null,
            cancelAtPeriodEnd: false,
            userId,
          })
          .returning()

        newEntity = entity.id
      }

      const [transaction] = await tx
        .insert(resourceSchema)
        .values({
          type,
          personalAccountId: personalAccount.id,
          paymentMethodId,
          date,
          amount: amount.toString(),
          entityId: newEntity,
          categoryId: categoryId || null,
          subcategoryId: subcategoryId || null,
          isCleared,
          isRecurring,
          description,
          documentUrl,
        })
        .returning()

      await tx
        .update(personalAccountsSchema)
        .set({
          balance: type === 'expense'
            ? sql`${personalAccountsSchema.balance} - ${amount}`
            : sql`${personalAccountsSchema.balance} + ${amount}`,
        })
        .where(eq(personalAccountsSchema.id, personalAccount.id))

      return transaction
    })

    return result
  }
  catch (error) {
    if (error instanceof Error) {
      console.error(error)
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      })
    }
  }
})
