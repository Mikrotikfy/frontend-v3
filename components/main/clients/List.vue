<script lang="ts" setup>
  const runtimeConfig = useRuntimeConfig()
  const options = {
    headers: [
      { key: 'Authorization', value: 'Bearer myToken' }
    ]
  }
  const { data: clients } = await useFetch(`${runtimeConfig.apiBase}searchclient?search=13500&city=MARIQUITA&clienttype=INTERNET`)
</script>
<template>
  <h1>UWU CLIENTS</h1>
</template>