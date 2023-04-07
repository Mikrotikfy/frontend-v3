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

  const evaluateSelectedAndNavigate = async (client: arnopClient | any) => {
    if (props.isDesktop) {
      storeClients.setUnsetClient(client)
    }
    if (props.isMobile) {
      await navigateTo(`/clients/edit/${client.id}?city=${currentCity}&clienttype=${currentClienttype}`)
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
  const statusColor = (active: boolean, indebt: boolean) => {
    if (active && indebt) {
      return 'red'
    } else if (active && !indebt) {
      return 'green'
    } else if (!active && !indebt) {
      return 'orange'
    } else {
      return 'grey'
    }
  }
  const statusText = (active: boolean, indebt: boolean) => {
    if (active && indebt) {
      return 'En Mora'
    } else if (active && !indebt) {
      return 'Al dia'
    } else if (!active && !indebt) {
      return 'Retirado'
    } else {
      return 'Inactivo'
    }
  }
</script>
<template>
  <v-list-item
    active-color="primary"
    style="background-color: #f9f9f9;"
    nav
    density="comfortable"
    :value="props.client.id"
    @click="evaluateSelectedAndNavigate(props.client)"
  >

    <v-list-item-title :class="isMobile ? 'text-subtitle-2' : 'text-subtitle-1'">
      {{ props.client.name }}
    </v-list-item-title>

    <v-list-item-subtitle>
      {{ $route.query.clienttype === 'INTERNET' ?
        `
        ${props.client.code}
        ${props.client.technology.name}
        ${validateNeighborhood(props.client.addresses.at(-1))}
        ${validateAddress(props.client.addresses.at(-1))}
        ${props.client.dni}
        ${props.client.phone}
        ` : `
        ${props.client.code}
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
        :color="statusColor(props.client.active, props.client.indebt)"
        size="small"
      >
        {{ statusText(props.client.active, props.client.indebt) }}
      </v-chip>
    </template>
  </v-list-item>
</template>