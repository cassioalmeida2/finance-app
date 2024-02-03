<template>
  <v-app>
    <v-main class="layout-login d-flex align-center">
      <v-container class="page">
        <Nuxt />
      </v-container>
    </v-main>
	<SpriteIcons />
  </v-app>
</template>
<script>
	import SpriteIcons from '@/components/Layout/SpriteIcons'

	export default {
		name: 'LoginLayout',
		components: {
			SpriteIcons
		}
	}
</script>

<style lang="scss">
	.layout-login {
		background: $primary;
	}

	.page {
		min-height: calc(100vh - 6.5rem);
	}
</style>