import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  try {
    const session = await auth.api.getSession({
      headers: event.headers,
    })

    if (!session) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }

    const accounts = await db
      .select()
      .from(personalAccountsSchema)
      .where(
        eq(
          personalAccountsSchema.userId,
          session.user.id,
        ),
      )

    return {
      accounts,
    }
  }
  catch (error) {
    console.error(error)
  }
})
