<script lang="ts" setup>
  import { useClients } from '~~/stores/clients';
  const storeClients = useClients()

  const route = useRoute()

  const currentCity = route.query.city
  const currentClienttype= route.query.clienttype

  const props = defineProps({
    client: {
      type: [Object],
      required: true
    },
    isDesktop: {
      type: [Boolean],
      required: true
    },
    isMobile: {
      type: [Boolean],
      required: true
    }
  })

  const evaluateSelectedAndNavigate = async (id: number) => {
    if (props.isDesktop) {
      storeClients.addRemoveClient(id)
    }
    if (props.isMobile) {
      await navigateTo(`/clients/edit/${id}?city=${currentCity}&clienttype=${currentClienttype}`)
    }
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
    style="background-color: #f9f9f9;"
    nav
    :value="props.client.id"
    @click="evaluateSelectedAndNavigate(props.client.id)"
  >
    <template v-if="isDesktop" v-slot:prepend="{ isSelected }">
      <v-list-item-action start>
        <v-checkbox-btn :model-value="isSelected"></v-checkbox-btn>
      </v-list-item-action>
    </template>

    <v-list-item-title :class="isMobile ? 'text-subtitle-2' : 'text-subtitle-1'">
      {{ props.client.name }}
    </v-list-item-title>

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

    <template v-slot:append>
      <v-chip
        class="ml-2 mb-1"
        color="success"
        size="small"
      >
        Al dia
      </v-chip>
    </template>
  </v-list-item>
</template>