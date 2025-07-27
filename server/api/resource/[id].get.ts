import { and, eq } from 'drizzle-orm'
import { z } from 'zod'
import { resourceSchema } from '~~/server/utils/db.schema'

export default eventHandler(async (event) => {
  try {
    // Validate route params
    const { id } = await getValidatedRouterParams(event, (params) => {
      return z.object({
        id: z.string().uuid(),
      }).parse(params)
    })

    // Authenticate user
    const userId = await authZ(event)

    // Get resource from database
    const [resource] = await db
      .select()
      .from(resourceSchema)
      .where(
        and(
          eq(resourceSchema.id, id),
          eq(resourceSchema.userId, userId),
        ),
      )

    if (!resource) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Resource not found',
      })
    }

    return resource
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid resource ID',
      })
    }

    console.error('Error fetching resource:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch resource',
    })
  }
})
