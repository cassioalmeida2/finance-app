<template>
	<v-app id="inspire">
		<v-navigation-drawer v-model="drawer" app>
			<template v-slot:prepend>
				<div class="d-flex align-center pa-2">
					<div>
						<v-avatar size="70">
							<base-image :src="avatarImage" alt="Foto do perfil" />
						</v-avatar>
					</div>
					<div class="default__info-profile ml-4 defaultText--text">
						<h2 class="text-body-1 font-weight-bold">{{ getLoggedUser.name }}</h2>
						<h3 class="text-caption">Seja bem vindo!</h3>
					</div>
				</div>
				<v-list dense>
					<v-list-item-group v-model="selectedItem" color="primary">
						<v-list-item v-for="(item, i) in items" :key="i" @click="goToPage(item.link)">
							<v-list-item-content>
								
								<v-list-item-title class="d-flex align-center">
									<base-icon :icon="item.icon" class="icon--md" />
									<span class="text-body-2 ml-2">{{item.text}}</span>
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</template>
			<template v-slot:append>
				<div class="d-flex align-center justify-center pa-2" >
					<base-button block color="primary" elevation="0" outlined class="login__button text-body-1 font-weight-bold" @click="finishSession()">
						<base-icon icon="logout" class="icon--md icon--primary mr-1" />
						<span>Sair</span>
					</base-button>
				</div>
			</template>
		</v-navigation-drawer>

		<v-app-bar app elevation="0">
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
			<div class="default__container-toolbar d-flex justify-center">
				<base-icon icon="logo" class="default__logo"/>
			</div>
			</v-app-bar>

		<v-main>
			<v-container>
				<Nuxt />
			</v-container>
		</v-main>
		<SpriteIcons />
	</v-app>
</template>

<script>
	import SpriteIcons from '@/components/Layout/SpriteIcons'
	import { mapActions, mapGetters } from 'vuex'

	export default {
		name: 'DefaultLayout',

		components: {
			SpriteIcons
		},

		data: () => (
			{
				selectedItem: 0,
				 drawer: null ,
				 items: [
					{icon: 'money', text: 'Moedas', link: '/'},
					{icon: 'trending-up', text: 'Índices', link: '/stocks'},
				]
			}),

		async mounted() {
			await this.updateLoggedUserState()
			if(this.$route.path == '/'){
				this.selectedItem = 0
			}else {
				this.selectedItem = 1
			}
		},

		computed: {
			...mapGetters({
				getLoggedUser: 'auth/getLoggedUser',
            }),

			avatarImage () {
				return require('~/assets/images/avatar.svg')
			},
		},

		methods: {
			...mapActions({
				updateLoggedUserState: 'auth/updateLoggedUserState',
				logout: 'auth/logout',
			}),

			finishSession() {
				this.logout().then(()=> {
					this.goToPage('/login')
				})
			},

			goToPage(page){
				this.$router.push({path: this.localePath(page)})
			}
		},
	}
</script>

<style lang="scss">
.default {
	&__logo {
		width: 200px;
	}

	&__logout-icon {
		fill: $white;
	}

	&__container-toolbar{
		width: calc(100% - 48px);
	}
}
</style>