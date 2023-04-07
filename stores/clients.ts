import { defineStore } from 'pinia'

export const useClients = defineStore('clients', {
  state: () => ({
    active: false,
    selectedClient: {} as arnopClient,
  }),
  getters: {
  },
  actions: {
    setUnsetClient (client: arnopClient) {
      if (this.selectedClient.id === client.id) {
        this.clearSelectedClient()
      }
      else {
        this.selectedClient = client
        this.active = true
      }
    },
    clearSelectedClient () {
      this.active = false
      this.selectedClient = {} as arnopClient
    }
  },
})