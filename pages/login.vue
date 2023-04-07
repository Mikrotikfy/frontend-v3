<script lang="ts" setup>
  import qs from 'qs'
  definePageMeta({
    layout: 'login'
  })

  const runtimeConfig = useRuntimeConfig()
  const username = ref('')
  const password = ref('')

  const loginResponse = ref()
  const userInfoResponse = ref()

  const resetLocalStorage = () => {
    localStorage.removeItem('auth')
    localStorage.removeItem('user')
  }

  const login = async () => {
    resetLocalStorage()
    const url = `${runtimeConfig.public.apiBase}auth/local`
    const { data: login } = await useFetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier: username.value,
        password: password.value
      })
    })
    localStorage.setItem('auth', JSON.stringify(login))
    await getUserInfo(login)
    
  }
  async function getUserInfo (auth:Ref<StrapiAuth | null | unknown>) {
    const query = qs.stringify({
      populate: ['role', 'cities', 'cities.mikrotiks', 'clienttypes', 'menus']
    },
    {
      encodeValuesOnly: true
    })
    const { data: user } = await useFetch<arnopUser | null>(`${runtimeConfig.public.apiBase}users/${auth.value?.user.id}?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.value?.jwt}`
      }
    })
    localStorage.setItem('user', JSON.stringify(user))
    await navigateTo(`/clients?city=${user.value?.cities[0].name}&clienttype=${user.value?.clienttypes[0].name}`)
  }
</script>
<template>
	<VContainer fluid class="fill-height">
		<VRow no-gutters align="center" justify="center" class="fill-height">
			<VCol cols="12" md="6" lg="5" sm="6">
				<VRow no-gutters align="center" justify="center">
					<VCol cols="12" md="6">
            <VImg
              src="logo-dark.png"
              cover
              width="300"
              class="mb-10 mx-auto"
              style="margin-left:-12px;"
            />
						<h1>Ingreso API</h1>
						<p class="text-medium-emphasis">Escribe tus credenciales de acceso</p>

						<VForm @submit.prevent="login" class="mt-7">
							<div class="mt-1">
								<label class="label text-grey-darken-2" for="username">Usuario</label>
								<VTextField
									v-model="username"
									prepend-inner-icon="material-symbols:person-outline"
									id="username"
									name="username"
									type="username"
								/>
							</div>
							<div class="mt-1">
								<label class="label text-grey-darken-2" for="password">Contraseña</label>
								<VTextField
									v-model="password"
									prepend-inner-icon="fluent:password-20-regular"
									id="password"
									name="password"
									type="password"
								/>
							</div>
							<div class="mt-5">
								<VBtn type="submit" block min-height="44" class="gradient primary">Iniciar Sesión</VBtn>
							</div>
						</VForm>
					</VCol>
				</VRow>
			</VCol>
			<VCol class="hidden-md-and-down fill-height" md="6" lg="7">
				<VImg
					src="loginbg.jpg"
					cover
					class="h-100 rounded-xl d-flex align-center justify-center"
				/>
			</VCol>
		</VRow>
	</VContainer>
</template>
