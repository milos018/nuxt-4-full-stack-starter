export default defineEventHandler(async (event) => {
  try {
    const authHandler = await auth.handler(toWebRequest(event))
    return authHandler
  }
  catch (error) {
    console.error(error)
  }
})
