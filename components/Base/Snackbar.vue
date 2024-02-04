<template>
    <v-snackbar top right shaped :value="showSnackbar" :timeout="typeSnackbar.timeout" :color="typeSnackbar.color" elevation="0" @input="closeSnackbar">
        <template>
            <v-row align="center" justify="center">
                <v-col class="mt-1" cols="2"><base-icon :icon="typeSnackbar.icon" /></v-col>
                <v-col cols="10">{{ messageSnackbar }}</v-col>
            </v-row>
        </template>
        <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="closeSnackbar">
               Fechar
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
	name: 'BaseSnackbar',

	props: {
		show: { type: Boolean, default: true },
		type: { type: String, default: 'success' },
		message: { type: String, default: 'info' },
	},

	data () {
		return {
			propertiesType: {
				info: {
					timeout: 6000,
					color: 'infoComponent',
					icon: 'information'
				},
				infoFast: {
					timeout: 2000,
					color: 'infoDark',
					icon: 'information'
				},
				success: {
					timeout: 3000,
					color: 'success',
					icon: 'check'
				},
				warning: {
					timeout: 4000,
					color: 'amber darken-3',
					icon: 'warning'
				},
				error: {
					timeout: 6000,
					color: 'error',
					icon: 'warning'
				},
			}
		}
	},

	computed: {
		showSnackbar () {
			return this.show
		},
		timeoutProperty () {
			return this.timeout
		},

		typeSnackbar () {
			return this.propertiesType[this.type]
		},

		messageSnackbar () {
			return this.message
		}
	},


	methods: {
		closeSnackbar () {
			this.$emit('closeSnackBar')
		}
	}
}
</script>
<style lang="scss">
	.v-snack__content {
		padding: 0px!important;
	}
</style>