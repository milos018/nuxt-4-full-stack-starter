import { and, eq } from 'drizzle-orm'
import { z } from 'zod'
import { resourceSchema } from '~~/server/utils/db.schema'
import { resourceSchema as resourceValidation } from '~~/shared/resource'

// Partial schema for updates
const updateResourceSchema = resourceValidation.partial()

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

    // Validate request body
    const updates = await readValidatedBody(event, updateResourceSchema.parse)

    // Check if resource exists and belongs to user
    const [existingResource] = await db
      .select()
      .from(resourceSchema)
      .where(
        and(
          eq(resourceSchema.id, id),
          eq(resourceSchema.userId, userId),
        ),
      )

    if (!existingResource) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Resource not found',
      })
    }

    // Update resource
    const [updatedResource] = await db
      .update(resourceSchema)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(resourceSchema.id, id))
      .returning()

    return updatedResource
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation error',
        data: error.issues,
      })
    }

    console.error('Error updating resource:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update resource',
    })
  }
})
