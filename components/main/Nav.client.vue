<script setup lang="ts">
  const menu = JSON.parse(localStorage.getItem('user') || '{}')._value?.menus || []
  const orderedMenu = menu.sort((a: any, b: any) => a.priority - b.priority)
</script>
<template>
  <v-container fluid class="fill-height">
    <div class="arnop-nav-parent">
      <div>
        <v-img
          src="/logo-dark.png"
        />
        <v-divider></v-divider>
        <v-list
          :lines="false"
          class="pa-0 mt-2"
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
      </div>
      <div class="text-center">
        <v-switch
          hide-details
          inset
          label="Switch"
        ></v-switch>
        <v-divider></v-divider>
        <p class="text-caption text-medium-emphasis mb-3">Departamento de desarrollo de software</p>
        <p class="text-caption text-disabled">Nicolas Echeverry</p>
      </div>
    </div>
  </v-container>
</template>
<style>
  .arnop-nav-parent {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
</style>