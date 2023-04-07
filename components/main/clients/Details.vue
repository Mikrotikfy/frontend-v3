<script lang="ts" setup>
  import { useClients } from '~~/stores/clients';
  const storeClients = useClients()

  const route = useRoute()
  const tab = ref()


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
      v-for="i in 3"
      :key="i"
      :value="'tab-' + i"
    >
      <v-card>
        <v-card-text> uwu </v-card-text>
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