import { and, desc, eq, gte, lte } from 'drizzle-orm'
import { createError } from 'h3'
import { z } from 'zod'
import { db } from '~~/server/utils/db.config'

export default eventHandler(async (event) => {
  try {
    const userId = await authZ(event)
    const { startDate, endDate, categoryId, month } = await getValidatedQuery(event, z.object({
      startDate: z.string().transform(date => new Date(date).toISOString()).optional(),
      endDate: z.string().transform(date => new Date(date).toISOString()).optional(),
      categoryId: z.string().optional(),
      month: z.string().transform(month => Number(month)).optional(),
    }).parse)

    const transactions = await fetchUserTransactions({ userId, startDate, endDate, month, categoryId })

    return {
      transactions,
    }
  }
  catch (error) {
    console.error('Failed to fetch transactions:', error)

    throw createError({
      statusCode: 500,
      message: 'Failed to fetch transactions',
    })
  }
})

export async function fetchUserTransactions({
  userId,
  startDate,
  endDate,
  month,
  categoryId,
}: {
  userId: string
  startDate: string | undefined
  endDate: string | undefined
  month: number | undefined
  categoryId: string | undefined
}) {
  let _startDate = startDate
  let _endDate = endDate

  if (month) {
    _startDate = new Date(Date.UTC(new Date().getFullYear(), Number(month), 1)).toISOString()
    _endDate = new Date(Date.UTC(new Date().getFullYear(), Number(month) + 1, 0, 23, 59, 59, 999)).toISOString()
  }

  return db
    .select({
      id: personalTransactionsSchema.id,
      type: personalTransactionsSchema.type,
      date: personalTransactionsSchema.date,
      amount: personalTransactionsSchema.amount,
      description: personalTransactionsSchema.description,
      createdAt: personalTransactionsSchema.createdAt,
      updatedAt: personalTransactionsSchema.updatedAt,
      account: {
        id: personalAccountsSchema.id,
        label: personalAccountsSchema.label,
        currency: personalAccountsSchema.currency,
        balance: personalAccountsSchema.balance,
      },
      entity: {
        id: entitySchema.id,
        label: entitySchema.label,
      },
      category: {
        id: personalCategorySchema.id,
        label: personalCategorySchema.label,
      },
      subCategory: {
        id: personalCategorySubcategorySchema.id,
        label: personalCategorySubcategorySchema.label,
      },
      paymentMethod: {
        id: personalPaymentMethodsSchema.id,
        label: personalPaymentMethodsSchema.label,
      },
      isCleared: personalTransactionsSchema.isCleared,
      isRecurring: personalTransactionsSchema.isRecurring,
    })
    .from(personalTransactionsSchema)
    .innerJoin(
      personalAccountsSchema,
      eq(
        personalTransactionsSchema.personalAccountId,
        personalAccountsSchema.id,
      ),
    )
    .leftJoin(
      entitySchema,
      eq(
        personalTransactionsSchema.entityId,
        entitySchema.id,
      ),
    )
    .leftJoin(
      personalCategorySchema,
      eq(
        personalTransactionsSchema.categoryId,
        personalCategorySchema.id,
      ),
    )
    .leftJoin(
      personalCategorySubcategorySchema,
      eq(
        personalTransactionsSchema.subcategoryId,
        personalCategorySubcategorySchema.id,
      ),
    )
    .leftJoin(
      personalPaymentMethodsSchema,
      eq(
        personalTransactionsSchema.paymentMethodId,
        personalPaymentMethodsSchema.id,
      ),
    )
    .orderBy(
      desc(personalTransactionsSchema.date),
      desc(personalTransactionsSchema.createdAt),
    )
    .where(
      and(
        eq(
          personalAccountsSchema.userId,
          userId,
        ),
        categoryId
          ? eq(
              personalTransactionsSchema.categoryId,
              categoryId,
            )
          : undefined,
        gte(
          personalTransactionsSchema.date,
          _startDate || '',
        ),
        lte(
          personalTransactionsSchema.date,
          _endDate || '',
        ),
      ),
    )
}
