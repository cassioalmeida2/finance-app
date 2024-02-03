<template>
	<v-row class="login">
		<v-col class="login__information d-flex justify-center pa-6">
			<img :src="sideImage" alt="Ilustração" class="login__illustration"/>
		</v-col>
		<v-col class="d-flex align-center justify-center">
            <div class="d-flex flex-column">
                <div class="d-flex flex-column align-center login__form py-8 px-4">
                    <div class="d-flex flex-column align-center">
				        <base-icon icon="logo" class="login__image" />
			        </div>
                    <h1 class="defaultText--text text-uppercase pa-4">Login</h1>
                    <span class="text-body-1 defaultText--text text-center pb-4"> Digite seus dados abaixo para acessar nossa plataforma. </span>
                    <v-col cols="12">
                        <v-form ref="form" validate-on="submit lazy" @submit.prevent="submit">
                            <v-text-field :rules="emailRules" outlined label="Email" v-model="user.email" type="email" required >
                            </v-text-field>

                            <v-text-field 
								:rules="passwordRules" 
								outlined label="Senha"
								v-model="user.password"
								:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
								:type="showPassword ? 'text' : 'password'" 
								@click:append="changeVisiblePassword"
								required
							>
                            </v-text-field>

                            <base-button block color="primary" class="login__button text-body-1 font-weight-bold" @click="submit">Entrar</base-button>
                            <div class="login__container-register text-body-1 font-weight-bold text-center mt-6" @click="register">
                                <span>Não tem cadastro?</span>
                                <span class="primary--text text-underline login__action-register">Registre-se</span>
                            </div>
                        </v-form>
                    </v-col>
                </div>
            </div>
		</v-col>
		<base-snackbar :show="snackbar" :message="messageSnackbar" :type="typeSnackbar" @closeSnackBar="closeSnackbar" />
	</v-row>
</template>

<script>
import { mapActions } from 'vuex'
import snackbar from '../../mixins/snackbar'

export default {
	name: 'LoginPage',

	layout: 'login',

	mixins: [
		snackbar
	],

	data() {
		return {
			showPassword: false,
			user: {
				email: '',
				password: ''
			},
			rulesEmail: 'Insira um email válido.',
		};
	},

	async mounted() {
		await this.logout()
	},

	methods: {
		...mapActions('auth', {
            login: 'login',
			logout: 'logout'
        }),

		async submit() {
			if (this.validateForm() == false){
				return
			}
			
			await this.login(this.user).then(() => {
				this.$router.push('/');
			}).catch((error) => {
				return this.setPropertiesSnackbar('error', error)
			})
			
		},

		register() {
			this.$router.push({path: 'register'})
		},
		
		validateForm()  {
            return this.$refs.form.validate()
        },

		validateEmail(value) {
			if (!value) {
				return 'O email é obrigatório.';
			}

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailRegex.test(value) || 'Insira um email válido.';
		},

		validatePassword(value) {
			if (!value) {
				return 'Digite a sua senha';
			}

			return true;
		},

		changeVisiblePassword () {
			this.showPassword = !this.showPassword
		}
	},

	computed: {
		sideImage () {
			return require('~/assets/images/happy-woman.svg')
		},

		emailRules() {
			return [(value) => this.validateEmail(value)]
		},

		passwordRules() {
			return [(value) => this.validatePassword(value)]
		},

		hiddenImageInformation () {
			return this.$vuetify.breakpoint.sm ? 'login__information--hidden':  ''
		}
	}
}
</script>

<style lang="scss">
	.login {
		min-height: calc(100vh - 120px);

		&__information {
			max-height: 100%;
		}

		&__content-form{
			border-radius: 10px;
			background: white;
			min-height: 100%;
			animation-name: enter;
            animation-duration: 0.8s;
		}

		&__form {
			width: 500px;
            background: white;
            border-radius: 10px;
		}

		&__image {
			width: 100%;
		}

        &__illustration {
            width: 600px;
        }

		&__button {
			min-height: 50px;
		}

        &__container-register {
            cursor: pointer;
        }

        &__action-register {
            text-decoration: underline;
            &:hover {
                opacity: 0.8;
            }
        }

		@keyframes enter {
            from {opacity: 0.5}
            to {opacity: 1}
        }

		@media screen and (max-width: 1264px) {
			.login{
				&__information {
					display:none!important;
				}
			}
		}

		@media screen and (max-width: 600px) {
			.login{
				&__form {
					width: 100%;
				}
			}
		}
	}
</style>