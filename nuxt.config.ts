// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],

  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: 'arnop',
    // Keys within public are also exposed client-side
    public: {
      apiBase: 'http://localhost:1337/api/',
      appname: 'ARNOProducciones API',
      appnameslug: 'arnop-api',
      appdescription: 'API de ARNOProducciones',
      appurl: 'https://api.arnoproducciones.com',
      adminurl: 'https://admin.arnoproducciones.com',
      appversion: '3.0.0',
      appauthor: 'Nicolas Echeverry',
    }
  }
})
