<script lang="ts" setup>
  import { useScreenSize } from '~~/stores/screen';
  import { storeToRefs } from 'pinia'
  const route = useRoute()

  definePageMeta({
    layout: 'clients',
    middleware: ['authenticated']
  })

  const store = useScreenSize()
  const { isDesktop, isMobile } = storeToRefs(store)

  const search = ref('')
  const updateSearch = () => {
    if (search.value === '') return
    navigateTo(`/clients/${search.value}?city=${route.query.city}&clienttype=${route.query.clienttype}`)
  }
</script>
<template>
  <div
    fluid
    :class="isDesktop ? 'arnop-parent-desktop fill-height' : 'arnop-parent-mobile'"
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
      <h4 class="text-subtitle-1 font-weight-medium mb-2">Buscando en {{ route.query.city }}</h4>
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