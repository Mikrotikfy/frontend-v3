<script lang="ts" setup>
  import { useScreenSize } from '~~/stores/screen';
  import { storeToRefs } from 'pinia'
  const store = useScreenSize()
  const { isDesktop, isMobile } = storeToRefs(store)
  
  definePageMeta({
    middleware: ['authenticated']
  })


  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()
  const token = JSON.parse(localStorage.getItem('auth') || '{}')._value?.jwt || ''

  const city = route.query.city
  const clienttype = route.query.clienttype

  const search = ref('')
  const { pending, data: clients } = await useFetch<strapiData>(`${runtimeConfig.public.apiBase}searchclient?search=${route.params.search}&city=${city}&clienttype=${clienttype}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const updateSearch = () => {
    if (search.value === '') return
    navigateTo(`/clients/${search.value}?city=${city}&clienttype=${clienttype}`)
  }
</script>
<template>
  <v-container fluid>
    <v-text-field
      v-if="isDesktop"
      v-model="search"
      label="Busqueda por Codigo, Nombre, Cedula, Barrio, Etc..."
      variant="solo"
      prepend-inner-icon="mdi-magnify"
      @keyup.enter="updateSearch"
    />
    <h4 v-if="route.params.search">Buscando "{{ route.params.search }}" en {{  route.query.city }}</h4>
    <p>Resultados: {{ clients!.data.pagination.total }}</p>
    <v-divider class="mt-2 mb-2" />
    <v-progress-linear
      v-if="pending"
      indeterminate
      color="primary"
    />
  </v-container>
</template>