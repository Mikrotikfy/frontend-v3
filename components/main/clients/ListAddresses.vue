<script lang="ts" setup>
  const modal = ref(false)
  const props = defineProps({
    client: {
      type: [Object],
      required: true
    }
  })
  const getDate = (date: string) => {
    const d = new Date(date)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  }
</script>

<template>
  <div>
    <v-dialog
      v-model="modal"
      max-width="800"
    >
    <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          <v-icon>mdi-history</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline">
          Historial de direcciones del cliente
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <p
                v-for="(address, index) in client.addresses"
                :key="index"
              >
                {{ address.address }} - {{ address.neighborhood.name }} - {{ getDate(address.createdAt) }}
              </p>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="green darken-4"
            text
            @click="modal = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
