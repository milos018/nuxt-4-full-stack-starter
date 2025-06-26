export default defineNuxtRouteMiddleware(async (to) => {
  if (to.meta.auth === false) {
    return
  }

  const { user, fetchSession } = useAuth()

  if (!user.value) {
    await fetchSession()
  }

  // if (!user.value) {
  //   return navigateTo('/auth')
  // }
})
