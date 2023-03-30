<script lang="ts" setup>
  const drawer = ref(false)
  
  const route = useRoute()

  const menu = JSON.parse(localStorage.getItem('user') || '{}')._value?.menus || []
  const cities = JSON.parse(localStorage.getItem('user') || '{}')._value?.cities || []
  const clienttypes = JSON.parse(localStorage.getItem('user') || '{}')._value?.clienttypes || []

  const currentCity = route.query.city
  const currentClienttype= route.query.clienttype

  const selectedCity = cities.find((city: any) => city.name === currentCity) || ref()
  const selectedService = clienttypes.find((clienttype: any) => clienttype.name === currentClienttype) || ref()

  const { $isMobile } = useNuxtApp()
  const isMobile = ref()

  const detectScreenSize = () => {
    isMobile.value = $isMobile()
  }
  window.addEventListener('resize', detectScreenSize)
</script>
<template>
  <div class="d-flex justify-center" style="margin-top:-64px;">
    <v-app-bar
      color="white"
      prominent
      class="rounded-lg mt-4 position-relative"
      style="width:98%;"
      elevation="2"
      floating
    >
      <v-app-bar-nav-icon v-if="isMobile" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <div style="min-width:250px;max-width:300px;">
        <v-select
          v-model="selectedService"
          label="Servicio"
          :items="clienttypes"
          item-title="name"
          item-value="id"
          variant="outlined"
          return-object
          density="compact"
          class="mx-4 mt-6 elevation-0"
          prepend-inner-icon="ic:twotone-miscellaneous-services"
        />
      </div>
      <div style="min-width:250px;max-width:300px;">
        <v-select
          v-model="selectedCity"
          label="Ciudad"
          :items="cities"
          item-title="name"
          item-value="id"
          variant="outlined"
          return-object
          density="compact"
          class="mt-6 elevation-0"
          prepend-inner-icon="material-symbols:edit-location-alt-rounded"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn variant="text" icon="mdi-magnify"></v-btn>

      <v-btn variant="text" icon="mdi-filter"></v-btn>

      <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      location="bottom"
      temporary
    >
      <v-list
        :items="menu"
        item-title="name"
        item-value="id"
      ></v-list>
    </v-navigation-drawer>
  </div>
</template>

<style scoped>
</style>