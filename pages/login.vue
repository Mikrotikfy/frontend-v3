<script lang="ts" setup>
  import qs from 'qs'
  const runtimeConfig = useRuntimeConfig()
  const username = ref('')
  const password = ref('')

  const response = ref()

  const login = async () => {
    const { data: login } = await useFetch<StrapiAuth>(`${runtimeConfig.public.apiBase}auth/local`, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier: username.value,
        password: password.value
      })
    })
    localStorage.setItem('auth', JSON.stringify(login))
    getUserInfo(login)
  }
  async function getUserInfo (auth:Ref<StrapiAuth | null>): Promise<any> {
    const query = qs.stringify({
      populate: ['role', 'cities', 'cities.mikrotiks', 'clienttypes', 'menus']
    },
    {
      encodeValuesOnly: true
    })
    const { data: user } = await useFetch(`${runtimeConfig.public.apiBase}users/${auth.value?.user.id}?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.value?.jwt}`
      }
    })
    localStorage.setItem('user', JSON.stringify(user))
  }
</script>
<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="username">Username</label>
      <input type="text" id="username" v-model="username" />
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
      <button type="submit">Login</button>
    </form>
    <p>
      {{ response }}
    </p>
  </div>
</template>
<style>
  body {
    color: #fff;
  }
</style>