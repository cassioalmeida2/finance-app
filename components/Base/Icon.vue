<template>
    <svg :fill="fill" :class="classes">
        <use :xlink:href="`#icon-${icon}`"></use>
    </svg>
</template>

<script>
export default {
	name: 'BaseIcon',
	props: {
		icon: {
			type: String,
			required: true
		},
		fill: {
			type: String,
			default: null
		},
	},
	computed: {
		classes() {
			const classes = ['icon']

			this.icon && classes.push(`icon-${this.icon}`)

			return classes
		}
	}
}
</script>