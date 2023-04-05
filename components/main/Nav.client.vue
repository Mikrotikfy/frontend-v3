<script setup lang="ts">
  const menu = JSON.parse(localStorage.getItem('user') || '{}')._value?.menus || []
  const orderedMenu = menu.sort((a: any, b: any) => a.priority - b.priority)
</script>
<template>
  <v-container fluid>
    <v-list
      :lines="false"
      class="pa-0"
      nav
    >
      <v-list-item
        v-for="item in orderedMenu"
        :key="item.id"
        link
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.name"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-container>
</template>