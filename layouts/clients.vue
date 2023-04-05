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
        <MainHeader v-if="isDesktop" />
          <ClientOnly>
            <v-container
            :style="isDesktop ? '' : 'height:calc(100% - 16px)!important;margin-top:-64px;'"
            fluid
            :class="isDesktop ? 'fill-height pb-12' : 'fill-height'"
          >
          <div :class="isDesktop ? 'arnop-layout-parent-desktop' : 'arnop-layout-parent-mobile'">
            <v-card
              v-if="isDesktop"
              class="rounded-lg fill-height w-100"
            >
              <MainNav />
            </v-card>
            <slot />
          </div>
          </v-container>
          </ClientOnly>
        <MainHeader v-if="isMobile" />
			</VMain>
		</VApp>
	</div>
</template>

<style>
  body {
    background-color: red;
    overflow: hidden;
  }
  .arnop-layout-parent-desktop {
    width:100%;
    display:grid;
    grid-template-columns: 1fr 8fr;
    grid-gap: 14px;
  }
  .arnop-layout-parent-mobile {
    width:100%;
    height: 100%;
    display:grid;
    grid-template-columns: 1fr;
    grid-gap: 14px;
  }
</style>