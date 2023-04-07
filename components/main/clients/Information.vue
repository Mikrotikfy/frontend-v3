<script lang="ts" setup>
  const route = useRoute()
  const props = defineProps({
    client: {
      type: [Object],
      required: true
    },
  })
  
  const user = JSON.parse(localStorage.getItem('user') || '{}')._value || ''
  const isAdmin = () => user.role.name === 'admin' || user.role.name === 'superadmin'
  const isBiller = () => user.role.name === 'biller'
  const isTechnician = () => user.role.name === 'technician'

  const valid = ref(false)
  const loading = ref(false)

  const technologies = ref([])

  const updateClient = () => {
    console.log(1)
  }
  const emitupdateClient = () => {
    console.log(2)
  }

  const emailRules = [
    (v: string) => !!v || 'Email is required',
    (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
  ]

  const saveStatus = ref('uwu')

  const getDate = (date: string) => {
    const d = new Date(date)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  }
</script>
<template>
  <v-card class="rounded-xl">
    <v-card-text>
      <v-form ref="editForm" v-model="valid">
        <v-row>
          <v-col>
            <v-text-field
              v-model="client.code"
              type="number"
              label="Codigo"
              autocomplete="off"
              required
              variant="outlined"
              density="compact"
              hide-details
              :disabled="!(!isAdmin() || !isBiller()) || loading"
              @blur="updateClient"
              @keyup.enter="$event.target.blur()"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="client.dni"
              type="number"
              label="Cedula"
              autocomplete="off"
              required
              variant="outlined"
              density="compact"
              hide-details
              :disabled="!isAdmin() || loading"
              @blur="updateClient"
              @keyup.enter="$event.target.blur()"
            />
          </v-col>
        </v-row>
        <v-text-field
          v-model="client.name"
          :disabled="!(!isAdmin() || !isBiller()) || loading"
          label="Nombre Completo"
          autocomplete="off"
          required
          variant="outlined"
          density="compact"
          hide-details
          class="pb-3 mt-3"
          @blur="updateClient"
          @keyup.enter="$event.target.blur()"
        />
        <v-row>
          <v-col cols="6" lg="6" md="6">
            <v-text-field
              v-model="client.addresses.at(-1).address"
              disabled
              label="Direccion"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
          <v-col cols="6" lg="6" md="6" class="d-flex">
            <v-text-field
              v-model="client.addresses.at(-1).neighborhood.name"
              disabled
              class="mr-3"
              label="Barrio"
              variant="outlined"
              density="compact"
              hide-details
            />
            <MainClientsCreateAddress :client="client" @updateClient="emitupdateClient" class="mr-2"/>
            <MainClientsListAddresses v-if="client.addresses" :client="client" />
          </v-col>
        </v-row>
        <v-row v-if="route.query.clienttype === 'INTERNET'">
          <v-col cols="12" lg="4" md="4">
            <v-text-field
              v-model="client.phone"
              label="Telefono"
              required
              variant="outlined"
              density="compact"
              hide-details
              :disabled="!(!isAdmin() || !isBiller()) || loading"
              @blur="updateClient"
              @keyup.enter="$event.target.blur()"
            />
          </v-col>
          <v-col cols="6" lg="4" md="4">
            <v-text-field
              v-model="client.wifi_ssid"
              :disabled="!isAdmin() || loading"
              label="Nombre de Red"
              autocomplete="off"
              required
              variant="outlined"
              density="compact"
              hide-details
              @blur="updateClient"
              @keyup.enter="$event.target.blur()"
            />
          </v-col>
          <v-col v-if="route.query.clienttype === 'INTERNET'" cols="6" lg="4" md="4">
            <v-text-field
              v-model="client.wifi_password"
              :disabled="!isAdmin() || loading"
              label="Clave de Red"
              autocomplete="off"
              required
              variant="outlined"
              density="compact"
              hide-details
              @blur="updateClient"
              @keyup.enter="$event.target.blur()"
            />
          </v-col>
        </v-row>
        <v-row v-if="route.query.clienttype === 'INTERNET'">
          <v-col cols="12" xs="12" sm="12" md="4" lg="4">
            <v-select
              v-model="client.technology"
              :disabled="!(!isAdmin() || !isBiller() || !isTechnician()) || loading"
              item-text="name"
              item-value="id"
              :items="technologies"
              :rules="[v => !!v || 'Debes especificar la tecnología']"
              return-object
              label="Tecnología"
              variant="outlined"
              density="compact"
              required
              hide-details
              @change="updateClient"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="4" lg="4">
            <v-text-field
              v-model="client.email"
              :disabled="!(!isAdmin() || !isBiller()) || loading"
              :rules="emailRules"
              label="Correo Electronico"
              autocomplete="off"
              variant="outlined"
              density="compact"
              hide-details="auto"
              @blur="updateClient"
              @keyup.enter="$event.target.blur()"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="4" lg="4">
            <v-text-field
              v-model.number="client.stratum"
              :disabled="!(!isAdmin() || !isBiller()) || loading"
              label="Estrato"
              autocomplete="off"
              variant="outlined"
              density="compact"
              type="number"
              hide-details="auto"
              @blur="updateClient"
              @keyup.enter="$event.target.blur()"
            />
          </v-col>
        </v-row>
        <v-row v-if="route.query.clienttype === 'TELEVISION'">
          <v-col cols="12" xs="12" sm="12" md="4" lg="4">
            <v-text-field
              v-model="client.email"
              :disabled="!(!isAdmin() || !isBiller()) || loading"
              :rules="emailRules"
              label="Correo Electronico"
              autocomplete="off"
              variant="outlined"
              density="compact"
              hide-details="auto"
              @blur="updateClient"
              @keyup.enter="$event.target.blur()"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="4" lg="4">
            <v-text-field
              v-model.number="client.stratum"
              :disabled="!(!isAdmin() || !isBiller()) || loading"
              label="Estrato"
              autocomplete="off"
              variant="outlined"
              density="compact"
              type="number"
              hide-details="auto"
              @blur="updateClient"
              @keyup.enter="$event.target.blur()"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="4" lg="4">
            <v-text-field
              v-model="client.phone"
              label="Telefono"
              required
              variant="outlined"
              density="compact"
              hide-details
              :disabled="!(!isAdmin() || !isBiller()) || loading"
              @blur="updateClient"
              @keyup.enter="$event.target.blur()"
            />
          </v-col>
        </v-row>
        <v-row v-if="route.query.clienttype === 'INTERNET'">
          <v-col>
            <v-select
              v-model="client.newModel"
              :disabled="!isAdmin() || loading"
              :items="[{ id: 0, name: 'Cedula' }, { id: 1, name: 'Codigo' }]"
              item-text="name"
              item-value="id"
              mandatory
              label="Identificar con"
              variant="outlined"
              density="compact"
              hide-details
              @change="updateClient"
            />
          </v-col>
          <v-col>
            <v-select
              v-model="client.ipmodel"
              :disabled="!isAdmin() || loading"
              :items="[{ id: 0, name: 'PPPoE' }, { id: 1, name: 'IP ESTATICA' }]"
              item-text="name"
              item-value="id"
              mandatory
              label="Tipo de IP para cliente"
              variant="outlined"
              density="compact"
              hide-details
              @change="updateClient"
            />
          </v-col>
        </v-row>
        <v-row v-if="route.query.clienttype === 'TELEVISION' && client.tvspecs">
          <v-col>
            <v-text-field
              v-model="client.tvspec.tvs"
              disabled
              label="Televisores"
              autocomplete="off"
              variant="outlined"
              density="compact"
              hide-details="auto"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="client.tvspec.high"
              disabled
              label="Altos"
              autocomplete="off"
              variant="outlined"
              density="compact"
              hide-details="auto"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="client.tvspec.down"
              disabled
              label="Bajos"
              autocomplete="off"
              variant="outlined"
              density="compact"
              hide-details="auto"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="client.tvspec.tvspectype.name"
              disabled
              label="Calidad de señal"
              autocomplete="off"
              variant="outlined"
              density="compact"
              hide-details="auto"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-text class="d-flex align-center mt-5">
      <caption ref="saveStatusText" class="font-italic">
        {{ saveStatus }}
      </caption>
      <v-spacer />
      <div style="display: inline-grid;place-items: end;">
        <caption>Fecha de creacion: {{ getDate(client.createdAt) }}</caption>
        <caption>Fecha de ultima modificacion: {{ getDate(client.updatedAt) }}</caption>
      </div>
    </v-card-text>
  </v-card>
</template>