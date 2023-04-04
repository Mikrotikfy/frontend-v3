<script lang="ts" setup>
  import { useScreenSize } from '~~/stores/screen';
  import { useClients } from '~~/stores/clients';
  import { storeToRefs } from 'pinia'
  const store = useScreenSize()
  const clientsStore = useClients()
  const { isDesktop, isMobile } = storeToRefs(store)

  const route = useRoute()

  const currentCity = route.query.city
  const currentClienttype= route.query.clienttype

  const props = defineProps({
    client: {
      type: [Object],
      required: true
    }
  })

  const evaluateSelectedAndNavigate = async (id: number) => {
    await navigateTo(`/clients/edit/${id}?city=${currentCity}&clienttype=${currentClienttype}`)
  }

  const validateAddress = (address: Address) => {
    if (address) {
      return address.address
    } else {
      return 'Sin dirección'
    }
  }
  const validateNeighborhood = (address: Address) => {
    if (address) {
      return address.neighborhood.name
    } else {
      return 'Sin Barrio'
    }
  }
</script>
<template>
  <v-list-item
    active-color="primary"
    @click="evaluateSelectedAndNavigate(props.client.id)"
    :value="props.client.id"
  >
    <template v-if="isDesktop" v-slot:prepend="{ isSelected }">
      <v-list-item-action start>
        <v-checkbox-btn :model-value="isSelected"></v-checkbox-btn>
      </v-list-item-action>
    </template>

    <v-list-item-title :class="isMobile ? 'text-subtitle-2' : 'text-h6'">{{ props.client.name }}</v-list-item-title>

    <v-list-item-subtitle>
      {{ 
        `
        ${props.client.code}
        ${props.client.technology.name}
        ${validateNeighborhood(props.client.addresses.at(-1))}
        ${validateAddress(props.client.addresses.at(-1))}
        ${props.client.dni}
        ${props.client.phone}
        `
        }}
    </v-list-item-subtitle>
  </v-list-item>
</template>