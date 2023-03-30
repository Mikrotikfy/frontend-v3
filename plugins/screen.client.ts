export default defineNuxtPlugin(() => {
  return {
    provide: {
      isDesktop: (): boolean => {
        if (document.body.clientWidth < 960) {
          return false
        } else {
          return true
        }
      },
      isMobile: (): boolean => {
        if (document.body.clientWidth < 960) {
          return true
        } else {
          return false
        }
      }
    }
  }
})