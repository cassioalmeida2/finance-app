import colors from 'vuetify/es5/util/colors'

export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		titleTemplate: '%s - finance-app',
		title: 'finance-app',
		htmlAttrs: {
			lang: 'pt-br'
		},

		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' }
		],

		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	},


	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'@/assets/global.scss'
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: ['cookie-universal-nuxt', '@nuxtjs/axios', 'nuxt-i18n'],

	i18n: {
	locales: ['pt-BR'],
	defaultLocale: 'pt-BR',
	vueI18n: {
		fallbackLocale: 'en',

		numberFormats: {
			'pt-BR': {
				currency: {
					style: 'currency',
					currency: 'BRL',
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				},
			},
		},
	},
},

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
			dark: false,
			themes: {
				light: {
					primary: '#687bea',
					accent: '#131c25',
					secondary: '#ffffff',
					$secondary: '#e2ece4',
					$medium: '#2e3943',
					$strong: '#131c25',
					$greyLight: '#e2e4e9',
					$grey300: '#b5b5b5',
					info: '#d3d3d3', 
					infoDark: '#666666',
					defaultText: '#626262',
					warning: '#ffc41d',
					error: '#f72626',
					success: '#37bc9b',
					white: '#ffffff',
					black: '#000000',
				},
			}
		}
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
	},

	env: {
		baseUrl: 'https://api.hgbrasil.com/finance'
	},
}
