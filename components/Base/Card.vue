<template>
  <v-card class="pa-2 base-card" outlined>
    <slot>
        <slot name="title"> 
            <v-card-title>{{ title }}</v-card-title>
        </slot>
        <slot name="subtitle">
            <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
        </slot>
        <slot name="action">
            <v-card-actions></v-card-actions>
        </slot>
    </slot>
  </v-card>
</template>


<script>
export default {
	name: 'BaseCard',
	props: {
		title: {
			type: String,
			default: ''
		},
		subtitle: {
			type: String,
			default: ''
		},
	},

	methods: {
		emitsDenialEvent () {
			this.$emit('dialogDenialEvent')
		},
	}
}
</script>

<style lang="scss">
.base-card {
    min-width: 100%;
	border-radius: 10px;
}

</style>
