import { defineStore } from 'pinia'

export const useClients = defineStore('clients', {
  state: () => ({
    selectedClients: [] as number[],
  }),
  getters: {
  },
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    addRemoveClient(clientId: number) {
      const index = this.selectedClients.indexOf(clientId)
      if (index === -1) {
        this.selectedClients.push(clientId)
      } else {
        this.selectedClients.splice(index, 1)
      }
    }
  },
})