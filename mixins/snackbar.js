export default {
    data() {
		return {
			typeSnackbar: 'success',
            snackbar: false,
            messageSnackbar: '',
		};
	},

    methods: {
        setPropertiesSnackbar (type, message) {
            this.typeSnackbar = type
            this.messageSnackbar = message
            this.showSnackbar()
        },

        showSnackbar () {
            this.snackbar = true
        },

        closeSnackbar () {
            this.snackbar = false
        }
    }
    
}