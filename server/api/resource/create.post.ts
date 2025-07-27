import { z } from 'zod'
import { resourceSchema } from '~~/server/utils/db.schema'
import { resourceSchema as resourceValidation } from '~~/shared/resource'

export default eventHandler(async (event) => {
  try {
    // Authenticate user
    const userId = await authZ(event)

    // Validate request body
    const body = await readValidatedBody(event, resourceValidation.parse)

    // Create resource in database
    const [resource] = await db
      .insert(resourceSchema)
      .values({
        ...body,
        userId,
      })
      .returning()

    return resource
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation error',
        data: error.issues,
      })
    }

    console.error('Error creating resource:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create resource',
    })
  }
})
