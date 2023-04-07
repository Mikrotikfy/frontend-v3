<script lang="ts" setup>
  import qs from 'qs'
  import { useScreenSize } from '~~/stores/screen';
  import { storeToRefs } from 'pinia'
  const runtimeConfig = useRuntimeConfig()
  const route = useRoute()

  definePageMeta({
    layout: 'clients',
    middleware: ['authenticated']
  })

  const store = useScreenSize()
  const { isDesktop, isMobile } = storeToRefs(store)

  const token = JSON.parse(localStorage.getItem('auth') || '{}')._value?.jwt || ''

  const search = ref('')
  
  const clients = ref([] as arnopClient[])
  const pagination = ref({
    page: 1,
    pageCount: 1,
    pageSize: 50,
    total: 0
  } as Pagination)
  const { pending, refresh } = await useFetch<strapiData>( () => `
    ${runtimeConfig.public.apiBase}searchclient?search=${route.params.search}&city=${route.query.city}&clienttype=${route.query.clienttype}&pagination[page]=${pagination.value.page}&pagination[pageSize]=${pagination.value.pageSize}
  `, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    lazy: true,
    transform (data: strapiData) {
      pagination.value.pageCount = data.data.pagination.pageCount
      pagination.value.total = data.data.pagination.total
      clients.value.push(...data.data.results)
      return data
    },
  })
  const getMoreResults = async () => {
    pagination.value.page++
    refresh()
  }
  watch (route, () => {
    pagination.value.page = 1
    pagination.value.pageCount = 1
    pagination.value.pageSize = 50
    pagination.value.total = 0
    clients.value = []
    refresh()
  })
  const updateSearch = () => {
    if (search.value === '') return
    navigateTo(`/clients/${search.value}?city=${route.query.city}&clienttype=${route.query.clienttype}`)
  }

  const onScroll = (e: any) => {
    if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
      if (pagination.value.page < pagination.value.pageCount) {
        getMoreResults()
      }
    }
  }
</script>
<template>
  <div
    fluid
    :class="isDesktop ? 'arnop-parent-desktop' : 'arnop-parent-mobile'"
  >
    <v-card
      class="fill-height rounded-lg pa-4"
    >
      <v-text-field
        v-if="isDesktop"
        v-model="search"
        label="Busqueda por Codigo, Nombre, Cedula, Barrio, Etc..."
        variant="outlined"
        prepend-inner-icon="mdi-magnify"
        append-inner-icon="mdi-send"
        @keyup.enter="updateSearch"
        @click:append-inner="updateSearch"
      />
      <h4 v-if="route.params.search" class="text-subtitle-1 font-weight-medium mb-2">Buscando "{{ route.params.search }}" en {{  route.query.city }}</h4>
      <v-chip
        size="small"
        class="mb-2 mr-2"
      >
        Mostrando: {{ clients!.length }} de {{ pagination.total }}
      </v-chip>
      <v-chip
        size="small"
        class="mb-2 mr-2"
        color="success"
      >
        Al dia: {{ clients!.filter((client) => client.active && !client.indebt).length }}
      </v-chip>
      <v-chip
        size="small"
        class="mb-2 mr-2"
        color="red lighten-1"
      >
        En Mora: {{ clients!.filter((client) => client.active && client.indebt).length }}
      </v-chip>
      <v-chip
        size="small"
        class="mb-2"
        color="orange lighten-1"
      >
        Retirados: {{ clients!.filter((client) => !client.active && !client.indebt).length }}
      </v-chip>
      <v-divider class="mt-2 mb-0" />
      <v-progress-linear
        v-if="pending"
        indeterminate
        color="primary"
      />
      <v-row
        v-scroll.self="onScroll"
        style="overflow-y: scroll;overflow-y: scroll;height: calc(100vh - 258px);"
      >
        <v-col>
          <v-list
            lines="two"
            variant="flat"
          >

            <MainClientsListItem
              v-for="client in clients"
              :key="client.id"
              :client="client"
              :is-desktop="isDesktop"
              :is-mobile="isMobile"
            />

          </v-list>
        </v-col>
      </v-row>
      <div class="fill-height">
        <div class="w-100" style="position: absolute;bottom:0px;padding-right:30px;">
          <v-text-field
            v-if="isMobile"
            v-model="search"
            label="Busqueda por Codigo, Nombre, Cedula, Barrio, Etc..."
            variant="solo"
            prepend-inner-icon="mdi-magnify"
            @keyup.enter="updateSearch"
          />
        </div>
      </div>
    </v-card>
    <MainClientsDetails 
      v-if="isDesktop"  
    />
  </div>
</template>

<style>
.arnop-parent-desktop {
  width:100%;
  height: calc(100% - 16px);
  display:grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 14px;
}
.arnop-parent-mobile {
  width:100%;
  display:grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
}
</style>