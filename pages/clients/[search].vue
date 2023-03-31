<script lang="ts" setup>
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()
  const token = JSON.parse(localStorage.getItem('auth') || '{}')._value?.jwt || ''

  const city = route.query.city
  const clienttype = route.query.clienttype

  const search = ref('')
  const selected = ref([])
  const { pending, data: clients } = await useFetch<strapiData | null>(`${runtimeConfig.public.apiBase}searchclient?search=${route.params.search}&city=${city}&clienttype=${clienttype}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  console.log(clients)
  const updateSearch = () => {
    if (search.value === '') return
    navigateTo(`/clients/${search.value}?city=${city}&clienttype=${clienttype}`)
  }
</script>
<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-spacer />
        <v-text-field
          v-model="search"
          label="Busqueda por Codigo, Nombre, Cedula, Barrio, Etc..."
          variant="outlined"
          prepend-inner-icon="mdi-magnify"
          @keyup.enter="updateSearch"
        />
      </v-col>
    </v-row>
    <h4>{{ search !== '' ? 'Resultados de ' + route.query.city : 'Clientes' }}</h4>
    <p>Buscando: {{ route.params.search }}</p>
    <v-divider class="mt-2 mb-2" />
    <v-progress-linear
      v-if="pending"
      indeterminate
      color="primary"
    />
    <v-row>
      <v-col>
        <v-list v-model="selected" lines="two" select-strategy="classic">

          <MainClientsListItem
            v-for="client in clients.data.results"
            :key="client.id"
            :client="client"
          />

        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>