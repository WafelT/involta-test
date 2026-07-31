export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/') {
    return navigateTo({ path: '/1', query: to.query }, { redirectCode: 301 })
  }
})
