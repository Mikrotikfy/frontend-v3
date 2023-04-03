<script setup lang="ts">
  const menu = JSON.parse(localStorage.getItem('user') || '{}')._value?.menus || []
  const orderedMenu = menu.sort((a: any, b: any) => a.priority - b.priority)
</script>
<template>
  <v-container fluid>
    <v-bottom-navigation
      :elevation="1"
      style="margin-top:-50px;padding-top:-10px;"
      class="position-relative rounded-lg"
    >
      <v-btn
        v-for="item in orderedMenu"
        :key="item.id"
        value="recent"
      >
        <v-icon>{{ item.icon }}</v-icon>

        {{ item.name }}
      </v-btn>
    </v-bottom-navigation>
  </v-container>
</template>