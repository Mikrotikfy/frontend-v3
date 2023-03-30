export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return
  let auth
  auth = localStorage.getItem('auth')
  if (!auth) {
    return navigateTo('/login')
  }
})