<script lang="ts" setup>
  definePageMeta({
    middleware: ['authenticated']
  })
</script>
<template>
  <MainHeader />
  <MainBody />
  <MainFooter />
</template>