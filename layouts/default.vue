<script setup lang="ts">
  const { $isDesktop } = useNuxtApp()
  const isDesktop = ref()

  const detectScreenSize = () => {
    isDesktop.value = $isDesktop()
  }
  window.addEventListener('resize', detectScreenSize)
</script>
<template>
	<div>
		<VApp>
      <VMain
        class="red"
        style=""
      >
        <MainHeader />
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