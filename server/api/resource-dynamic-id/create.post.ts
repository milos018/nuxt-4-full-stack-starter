import { newPersonalAccountSchema } from '~~/shared/personal-account'

export default eventHandler(async (event) => {
  try {
    const userId = await authZ(event)

    const {
      name,
      currency,
      balance,
    } = await readValidatedBody(event, newPersonalAccountSchema.parse)

    const [personalAccount] = await db
      .insert(personalAccountsSchema)
      .values({
        label: name,
        currency,
        balance: balance.toString(),
        userId,
      })
      .returning()

    if (!personalAccount.id) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal server error',
      })
    }

    return {
      message: 'ok',
    }
  }
  catch (error) {
    console.error(error)
  }
})
