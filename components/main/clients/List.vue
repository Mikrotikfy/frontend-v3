<script lang="ts" setup>
  const runtimeConfig = useRuntimeConfig()
  const { data: clients } = await useFetch(`${runtimeConfig.apiBase}searchclient?search=13500&city=MARIQUITA&clienttype=INTERNET`)
</script>
<template>
  
</template>