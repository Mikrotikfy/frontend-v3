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
        style="max-height:100vh;"
      >
        <MainHeader v-if="isDesktop" />
          <ClientOnly>
            <v-container
            :style="isDesktop ? '' : 'height:calc(100% - 16px!important;margin-top:-64px;'"
            fluid
            :class="isDesktop ? 'fill-height pb-13' : 'fill-height'"
          >
            <v-card
              class="rounded-lg fill-height w-100"
            >
              <slot />
            </v-card>
          </v-container>
          </ClientOnly>
        <MainHeader v-if="!isDesktop" />
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