import { desc, eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { resourceSchema } from '~~/server/utils/db.schema'
import { paginationSchema } from '~~/shared/common'

export default eventHandler(async (event) => {
  try {
    // Authenticate user
    const userId = await authZ(event)

    // Validate query params
    const { page, limit, order } = await getValidatedQuery(event, paginationSchema.parse)

    // Calculate offset
    const offset = (page - 1) * limit

    // Get resources for user
    const resources = await db
      .select()
      .from(resourceSchema)
      .where(eq(resourceSchema.userId, userId))
      .orderBy(
        order === 'desc'
          ? desc(resourceSchema.createdAt)
          : resourceSchema.createdAt,
      )
      .limit(limit)
      .offset(offset)

    // Get total count
    const [countResult] = await db
      .select({ count: sql`count(*)::int` })
      .from(resourceSchema)
      .where(eq(resourceSchema.userId, userId))

    const count = countResult?.count || 0

    return {
      data: resources,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(Number(count) / limit),
      },
    }
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid query parameters',
        data: error.issues,
      })
    }

    console.error('Error fetching resources:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch resources',
    })
  }
})
