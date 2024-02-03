<template>
	<v-row class="register">
		<v-col class="register__information d-flex justify-center pa-6">
			<img :src="sideImage" alt="Ilustração" class="register__illustration"/>
		</v-col>
		<v-col class="d-flex align-center justify-center">
            <div class="d-flex flex-column">
                <div class="d-flex flex-column align-center register__form py-8 px-4">
                    <div class="d-flex flex-column align-center">
				        <base-icon icon="logo" class="register__image" />
			        </div>
                    <h1 class="defaultText--text text-uppercase pa-4">Cadastro</h1>
                    <span class="text-body-1 defaultText--text text-center pb-4"> Digite seus dados abaixo para acessar nossa plataforma. </span>
				<v-col cols="12">
                    <v-form ref="form" validate-on="submit lazy" @submit.prevent="submit">
                        <v-text-field v-model="user.name" :rules="nameRules" outlined label="Nome" type="name" required>
							<template #prepend-inner>
								<div class="d-flex align-center justify-center">
									<base-icon icon="people" class="pa-2" />
								</div>
							</template>
                        </v-text-field>

                        <v-text-field  v-model="user.email" :rules="emailRules" outlined label="Email" type="email" required>
							<template #prepend-inner>
								<div class="d-flex align-center justify-center">
									<base-icon icon="mail" class="pa-2" />
								</div>
							</template>
                        </v-text-field>

                        <v-text-field @input="phoneMask" v-model="user.phone" :rules="phoneRules" outlined label="Telefone" type="phone" maxlength="15" placeholder="DDD + Telefone" required>
							<template #prepend-inner>
								<div class="d-flex align-center justify-center">
									<base-icon icon="phone" class="pa-2" />
								</div>
							</template>
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
							<template #prepend-inner>
								<div class="d-flex align-center justify-center">
									<base-icon icon="lock" class="pa-2" />
								</div>
							</template>
						</v-text-field>

						<v-text-field 
							:rules="confirmPasswordRules" 
							outlined 
							label="Confirmar Senha"
							v-model="confirmPassword"
							:append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
							:type="showConfirmPassword ? 'text' : 'password'" 
							@click:append="changeVisibleConfirmPassword"
							required
						>
							<template #prepend-inner>
								<div class="d-flex align-center justify-center">
									<base-icon icon="lock" class="pa-2" />
								</div>
							</template>
						</v-text-field>


                        <base-button block color="primary" class="register__button mb-4 text-body-1 font-weight-bold" type="submit">Cadastrar</base-button>
                        <div class="register__container-register d-flex align-center justify-center text-body-1 font-weight-bold text-center mt-6" @click="backToLogin">
                            <base-icon icon="arrow-left" class="icon--sm mr-2" />
                            <span class="primary--text text-underline register__action-register">Voltar para Login</span>
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
	name: 'RegisterPage',
	
	layout: 'login',

	mixins: [
		snackbar
	],

	middleware: [],
	
	data() {
		return {			
			typeSnackbar: 'success',
            snackbar: false,
            messageSnackbar: '',
			user: {
                name: '',
				email: '',
                phone: '',
				password: '',
			},
            confirmPassword: '',
			rulesEmail: 'Insira um email válido.',
			showPassword: false,
			showConfirmPassword: false,
		};
	},

	methods: {
        ...mapActions('auth', {
            registerUser: 'registerUser',
        }),

		async submit() {
			if (this.validateForm() == false){
                return
            }

            await this.registerUser(this.user).then(() => {
				this.setPropertiesSnackbar('success', 'Usuário registrado com sucesso!' )
				setTimeout(() => {
					this.$router.push('/');
				}, 2000);
            }).catch((error) => {
				return this.setPropertiesSnackbar('error', error)
            })
		},

		backToLogin() {
			this.$router.push({path: 'login'})
		},
		
        validateForm()  {
            return this.$refs.form.validate()
        },

        verifyPhoneProperties(phone) {
            const numericValue = phone.replace(/\D/g, '');
            return numericValue.length >= 10;
        },

        phoneMask() {
            const numericValue = this.user.phone.replace(/\D/g, '');

            const formattedValue = numericValue.replace(
                /^(\d{2})(\d{4,5})(\d{4})$/,
                '($1) $2-$3'
            );

            this.user.phone = formattedValue;
        },

		register() {
			this.$router.push({path: 'register'})
		},
		
		async validate() {
			const { valid } = await this.$refs.form.validate()
			return valid
		},

		validateName(value) {
			if (!value) {
				return 'O nome é obrigatório.';
			}

			return true;
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
				return 'Digite uma senha';
			}

			return true;
		},

		validatePasswordCompare(value, compareValue) {
			if (!value) {
				return 'Confirme a sua senha';
			}

            if(value != compareValue){
                return 'As senhas são diferentes'
            }

			return true;
		},
        
		validatePhone(value) {
            if(!value){
                return 'O Número de telefone é obrigatório'
            }

            if(!this.verifyPhoneProperties(value)){
                return 'Telefone inválido'
            }

			return true
		},

		
		changeVisiblePassword () {
			this.showPassword = !this.showPassword
		},

		changeVisibleConfirmPassword () {
			this.showConfirmPassword = !this.showConfirmPassword
		}
	},

	computed: {
		sideImage () {
			return require('~/assets/images/rocket.svg')
		},

		nameRules() {
			return [(value) => this.validateName(value)]
		},

		emailRules() {
			return [(value) => this.validateEmail(value)]
		},

		phoneRules() {
			return [(value) => this.validatePhone(value)]
		},

		passwordRules() {
			return [(value) => this.validatePassword(value)]
		},

		confirmPasswordRules() {
			return [(value) => this.validatePasswordCompare(value, this.user.password)]
		},
	}
}
</script>

<style lang="scss">
	.register {
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
			.register{
				&__information {
					display:none!important;
				}
			}
		}

		@media screen and (max-width: 600px) {
			.register{
				&__form {
					width: 100%;
				}
			}
		}
	}
</style>