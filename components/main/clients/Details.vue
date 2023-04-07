<script lang="ts" setup>
  import { useClients } from '~~/stores/clients';
  const storeClients = useClients()

  const route = useRoute()
  const tab = ref('tab-2')

  onMounted(() => {
    tab.value = localStorage.getItem('tab') || 'tab-2'
  })
  watch (tab, (val) => {
    localStorage.setItem('tab', val)
  })

  const currentCity = route.query.city
  const currentClienttype= route.query.clienttype

</script>
<template>
  <v-card
    v-if="storeClients.active"
  >
  <v-tabs
    v-model="tab"
    align-tabs="center"
    centered
    stacked
    fixed-tabs
  >
    <v-tab value="tab-1">
      <v-icon>mdi-information</v-icon>
      Informacion Basica
    </v-tab>

    <v-tab value="tab-2">
      <v-icon>mdi-currency-usd</v-icon>
      Facturacion
    </v-tab>

    <v-tab value="tab-3">
      <v-icon>mdi-cog</v-icon>
      Ordenes de Servicio
    </v-tab>
  </v-tabs>

  <v-window v-model="tab">
    <v-window-item
      value="tab-1"
    >
      <MainClientsInformation
        :client="storeClients.selectedClient"
      />
    </v-window-item>
    <v-window-item
      value="tab-2"
    >
      <v-card>
        <v-card-text> 2 </v-card-text>
      </v-card>
    </v-window-item>
    <v-window-item
      value="tab-3"
    >
      <v-card>
        <v-card-text> 3 </v-card-text>
      </v-card>
    </v-window-item>
  </v-window>
  </v-card>
  <v-card
    v-else
    class="fill-height d-flex justify-center align-center rounded-lg pa-4"
  >
    <div class="text-center">
      <h2>Nada por aquí...</h2>
      <p>Selecciona un cliente para iniciar</p>
    </div>
  </v-card>
</template>