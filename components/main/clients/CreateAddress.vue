<script lang="ts" setup>
  const runtimeConfig = useRuntimeConfig()
  const token = JSON.parse(localStorage.getItem('auth') || '{}')._value?.jwt || ''
  const props = defineProps({
    client: {
      type: [Object],
      required: true
    }
  })
  const modal = ref(false)
  const address = ref('')
  const neighborhood = ref(null)
  const dir1 = ref('')
  const dir2 = ref('')
  const dir3 = ref('#')
  const dir4 = ref('')
  const dirFragment1 = ref([
    '(SIN INICIAL)',
    'CARRERA',
    'CALLE',
    'MANZANA',
    'DIAGONAL'
  ])
  const dirFragment2 = ref([
    '#',
    'CASA',
    'DIAGONAL',
    'LOTE'
  ])

  const neighborhoods = ref([] as Neighborhood[])
  const initComponent = (async () => {
    const res = await useNeighborhoods(runtimeConfig, token)
    neighborhoods.value = res
  })

  const genAddress = () => {
    address.value = `${dir1.value} ${dir2.value} ${dir3.value} ${dir4.value}`
  }

  const addAddress = async () => {
    const { data } = await useFetch(() => `
      ${runtimeConfig.public.apiBase}addresses
    `, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body:  JSON.stringify({
        data:{
          address: address.value,
          neighborhood: neighborhood.value,
          client: props.client.id
        }
      })
    })
    console.log(data)
  }
</script>
<template>
  <div>
    <v-dialog
      v-model="modal"
      class="rounded-lg"
      max-width="800"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
          @click="initComponent()"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Ingresa la nueva dirección de {{ props.client.name }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6" lg="3" md="3">
              <v-select
                v-model="dir1"
                :items="dirFragment1"
                label="Dirección"
                variant="outlined"
                density="compact"
                hide-details
                @blur="genAddress"
              />
            </v-col>
            <v-col cols="6" lg="3" md="3">
              <v-text-field
                v-model="dir2"
                label="#"
                variant="outlined"
                density="compact"
                hide-details
                @blur="genAddress"
              />
            </v-col>
            <v-col cols="6" lg="3" md="3">
              <v-select
                v-model="dir3"
                :items="dirFragment2"
                label="#"
                value="#"
                variant="outlined"
                density="compact"
                hide-details
                @blur="genAddress"
              />
            </v-col>
            <v-col cols="6" lg="3" md="3">
              <v-text-field
                v-model="dir4"
                label="#"
                variant="outlined"
                density="compact"
                hide-details
                @blur="genAddress"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-autocomplete
                v-model="neighborhood"
                :items="neighborhoods"
                item-title="name"
                item-value="id"
                label="Barrio"
                variant="outlined"
                density="compact"
              />
            </v-col>
          </v-row>
          <v-btn
            color="primary"
            @click="addAddress()"
          >
            Guardar y continuar
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
