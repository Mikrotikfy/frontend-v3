<script lang="ts" setup>
  import { useScreenSize } from '~~/stores/screen';
  import { storeToRefs } from 'pinia'
  const store = useScreenSize()
  const { isDesktop, isMobile } = storeToRefs(store)

  const drawer = ref(false)

  const backButton = () => {
    window.history.length > 1 ? window.history.back() : navigateTo('/')
  }
  
  const logout = async () => {
    await localStorage.removeItem('auth')
    await localStorage.removeItem('user')
    await navigateTo('/login')
  }
</script>
<template>
  <v-container fluid class="d-flex justify-center py-0" :style="isMobile ? 'margin-top:-48px;' : 'margin-top:-64px;'">
    <v-app-bar
      color="white"
      prominent
      :class="isMobile ? 'rounded-lg position-relative' : 'rounded-lg mt-4 position-relative'"
      floating
      :elevation="1"
    >
      <v-app-bar-nav-icon variant="text" icon="mdi-arrow-left" @click.stop="backButton"></v-app-bar-nav-icon>
      <v-app-bar-title>Informacion de cliente</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-menu
        transition="slide-y-transition"
      >
        <template v-slot:activator="{ props }">
          <v-btn variant="text" icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>
        <v-list>
          <v-list-item
            @click="logout"
          >
            <v-list-item-title>Cerrar Sesion</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </v-container>
</template>

<style>
.v-select__selection {
  overflow: hidden  !important;
}
</style>