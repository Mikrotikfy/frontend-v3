<template>
  <v-container
    fluid
    :class="isDesktop ? 'fill-height pb-13' : 'fill-height pb-8'"
  >
    <v-card
      class="rounded-lg fill-height w-100"
    >
      <v-card-title>
        test
      </v-card-title>
      <v-card-subtitle>This is a subtitle</v-card-subtitle>
      <v-card-text>
        This is content
      </v-card-text>
    </v-card>
  </v-container>
</template>