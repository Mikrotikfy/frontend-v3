// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify from "vite-plugin-vuetify";

// PWA Config
const title = "ARNOProducciones API";
const shortTitle = "ARNOP API";
const description = "Aplicativo Integral de Gestion de la Informacion de ARNOProducciones";
const image = "https://arnoproducciones.com/logo-dark.png";
const url = "https://arnoproducciones.com";

export default defineNuxtConfig({
  modules: [
    "nuxt-icon",
		"@kevinmarrec/nuxt-pwa",
		'@pinia/nuxt',
    async (options, nuxt) => {
			// @ts-ignore
			nuxt.hooks.hook("vite:extendConfig", (config) => config.plugins.push(vuetify()));
		},
  ],

	app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

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
  },

  css: [
    '@/assets/main.scss'
  ],
  build: {
    transpile: ['vuetify']
  },
  vite: {
		ssr: {
			noExternal: ["vuetify"],
		},
		define: {
			"process.env.DEBUG": false,
		},
	},
  app: {
		head: {
			title: "ARNOP API",
			titleTemplate: "%s",
			link: [
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap",
				},
				{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
				{
					rel: "canonical",
					href: url,
				},
			],
			meta: [
				{
					hid: "description",
					name: "description",
					content: description,
				},
				{ property: "og:site_name", content: title },
				{ hid: "og:type", property: "og:type", content: "website" },
				{
					hid: "og:url",
					property: "og:url",
					content: url,
				},
				{
					hid: "og:image:secure_url",
					property: "og:image:secure_url",
					content: image,
				},
				{
					hid: "og:title",
					property: "og:title",
					content: title,
				},
				{
					hid: "og:description",
					property: "og:description",
					content: description,
				},
				{
					hid: "og:image",
					property: "og:image",
					content: image,
				},
				//Twitter
				{ name: "twitter:card", content: "summary_large_image" },
				{
					hid: "twitter:url",
					name: "twitter:url",
					content: url,
				},
				{
					hid: "twitter:title",
					name: "twitter:title",
					content: title,
				},
				{
					hid: "twitter:description",
					name: "twitter:description",
					content: description,
				},
				{
					hid: "twitter:image",
					name: "twitter:image",
					content: image,
				},
			],
		},
	},

	pwa: {
		meta: {
			name: shortTitle,
			author: "Behon Baker",
			theme_color: "#4f46e5",
			description: description,
		},
		manifest: {
			name: shortTitle,
			short_name: shortTitle,
			theme_color: "#4f46e5",
			description: description,
		},
    workbox: {
      // offlineStrategy: 'StaleWhileRevalidate',
      // offlineAssets: ['/favicon.ico', '/icon.png', '/star-bg.svg'],
      // cacheNames: {
      //   prefix: 'arnop-api',
      //   suffix: 'v1.0.0',
      //   precache: 'precache',
      //   runtime: 'runtime-cache'
      // }
    }
	},
})
