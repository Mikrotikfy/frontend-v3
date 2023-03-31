<script lang="ts" setup>
  const drawer = ref(false)
  
  const route = useRoute()

  const menu = JSON.parse(localStorage.getItem('user') || '{}')._value?.menus || []
  const cities = JSON.parse(localStorage.getItem('user') || '{}')._value?.cities || []
  const clienttypes = JSON.parse(localStorage.getItem('user') || '{}')._value?.clienttypes || []

  const currentCity = route.query.city
  const currentClienttype= route.query.clienttype

  const selectedCity = ref(cities.find((city: any) => city.name === currentCity)) || ref()
  const selectedService = ref(clienttypes.find((clienttype: any) => clienttype.name === currentClienttype)) || ref()

  const { $isMobile } = useNuxtApp()
  const isMobile = ref()

  const detectScreenSize = () => {
    isMobile.value = $isMobile()
  }
  window.addEventListener('resize', detectScreenSize)
  const updateService = async (event:arnopService) => {
    await navigateTo({
      path: '/',
      query: {
        city: selectedCity.value.name,
        clienttype: event.name,
      }
    })
  }
  const updateCity = async (event:arnopCity) => {
    await navigateTo({
      path: '/',
      query: {
        city: event.name,
        clienttype: selectedService.value.name,
      }
    })
  }
</script>
<template>
  <v-container fluid class="d-flex justify-center py-0" style="margin-top:-64px;">
    <v-app-bar
      color="white"
      prominent
      class="rounded-lg mt-4 position-relative"
      floating
      :elevation="1"
    >
      <v-app-bar-nav-icon v-if="isMobile" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <div>
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
          :prepend-inner-icon="selectedService.name === 'TELEVISION' ? 'mdi-television' : 'material-symbols:wifi'"
          @update:modelValue="updateService($event)"
        />
      </div>
      <div>
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
          @update:modelValue="updateCity($event)"
        />
      </div>

      <v-spacer></v-spacer>

      <v-menu
        transition="slide-y-transition"
      >
        <template v-slot:activator="{ props }">
          <v-btn variant="text" icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Cerrar Sesion</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
  </v-container>
</template>

<style>
.v-select__selection {
  overflow: hidden  !important;
}
</style>