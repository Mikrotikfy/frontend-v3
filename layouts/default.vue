<script setup lang="ts">
  import { onMounted } from 'vue';

  const { $isDesktop } = useNuxtApp()
  const isDesktop = ref()

  const detectScreenSize = () => {
    isDesktop.value = $isDesktop()
  }
  onMounted(() => {
    detectScreenSize()
    window.addEventListener('resize', detectScreenSize)
  })
</script>
<template>
	<div>
		<VApp>
      <VMain
        class="red"
        style=""
      >
        <MainHeader />
          <ClientOnly>
            <v-container
            fluid
            :class="isDesktop ? 'fill-height pb-13' : 'fill-height pb-8'"
          >
            <v-card
              class="rounded-lg fill-height w-100"
            >
              <slot />
            </v-card>
          </v-container>
          </ClientOnly>
        <MainFooter />
			</VMain>
		</VApp>
	</div>
</template>

<style>
  body {
    background-color: red;
    overflow: hidden;
  }
</style>