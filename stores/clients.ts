import { defineStore } from 'pinia'

export const useClients = defineStore('clients', {
  state: () => ({
    selectedClients: [] as number[],
  }),
  getters: {
  },
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    addClient(clientId: number) {
      this.selectedClients.push(clientId)
    },
    removeClient(clientId: number) {
      this.selectedClients = this.selectedClients.filter((id) => id !== clientId)
    }
  },
})