<script lang="ts" setup>
  import { useClients } from '~~/stores/clients';
  const storeClients = useClients()

  const route = useRoute()

  const currentCity = route.query.city
  const currentClienttype= route.query.clienttype

</script>
<template>
  <v-card
    v-if="storeClients.active"
    class="fill-height d-flex justify-center align-center rounded-lg pa-4"
  >
    uwu
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