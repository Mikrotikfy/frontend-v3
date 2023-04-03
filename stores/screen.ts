import { defineStore } from 'pinia'

export const useScreenSize = defineStore('screenSize', {
  state: () => ({
    screenSize: 0,
  }),
  getters: {
    isDesktop (state) { 
      return state.screenSize > 960
    },
    isMobile (state) {
      return state.screenSize < 960
    }
  },
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    updateScreenSize(screenSize: number) {
      this.screenSize = screenSize
    },
  },
})