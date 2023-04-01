<script lang="ts" setup>
    const props = defineProps({
      client: {
        type: [Object],
      }
    })

    const { $isMobile, $isDesktop } = useNuxtApp()
    const isMobile = ref()
    const isDesktop = ref()

    const detectScreenSize = () => {
      isMobile.value = $isMobile()
      isDesktop.value = $isDesktop()
    }
    window.addEventListener('resize', detectScreenSize)
</script>
<template>
  <v-list-item
    active-color="primary"
    variant="text"
    :value="props.client.id"
  >
    <template v-if="isDesktop" v-slot:prepend="{ isActive }">
      <v-list-item-action start>
        <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
      </v-list-item-action>
    </template>

    <v-list-item-title :class="isMobile ? 'text-subtitle-2' : 'text-h6'">{{ props.client.name }}</v-list-item-title>

    <v-list-item-subtitle>
      CARRERA 11A # 2 - 35 | 1110601254 | 3125090684 | GALAN
    </v-list-item-subtitle>
  </v-list-item>
</template>