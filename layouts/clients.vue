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
        <div :class="isDesktop ? 'arnop-layout-parent-desktop' : 'arnop-layout-parent-mobile'">
          <v-sheet
            v-if="isDesktop"
            class="rounded-lg w-100 elevation-1"
            style="height: calc(100% - 16px);"
          >
            <MainNav
            />
          </v-sheet>
          <div class="arnop-vertical-layout-desktop">
            <MainHeader />
            <ClientOnly>
              <slot />
            </ClientOnly>
          </div>
        </div>
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
  .arnop-vertical-layout-desktop {
    display:grid;
    grid-template-rows: auto 1fr;
    grid-gap: 14px;
  }
  .arnop-layout-parent-desktop {
    width:100%;
    height:100%;
    display:grid;
    grid-template-columns: 1fr 8fr;
    padding: 16px;
    grid-gap: 14px;
  }
  .arnop-layout-parent-mobile {
    width:100%;
    height: 100%;
    display:grid;
    grid-template-columns: 1fr;
  }
</style>