<script setup lang="ts">
  import { useScreenSize } from '~~/stores/screen';
  import { storeToRefs } from 'pinia'
  const store = useScreenSize()
  const { isDesktop, isMobile } = storeToRefs(store)
  const detectScreenSize = () => {
    store.updateScreenSize(document.body.clientWidth)
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
        <MainDetailsHeader />
          <ClientOnly>
            <v-container
            :style="isDesktop ? '' : 'height:calc(100% - 16px)!important;'"
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
        <MainFooter v-if="isDesktop" />
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