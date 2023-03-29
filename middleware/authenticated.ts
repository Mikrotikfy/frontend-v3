export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return
  let auth
  auth = localStorage.getItem('auth')
  alert(auth)
  if (auth) {
    return navigateTo('/clients?city=MARIQUITA&clienttype=INTERNET')
  } else {
    alert('no auth')
    return navigateTo('/login')
  }
})