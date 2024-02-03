<template>
	<v-text-field 
        v-bind="$attrs" 
        v-on="$listeners" 
        @input="onInput" 
        @change="$emit('input', $event)" 
        :readonly="readonly" 
        :required="required" 
        :rules="rules" 
        hide-details="auto"
        outlined
    >
        <template #prepend-inner>
            <slot name="prepend-inner"></slot>
        </template>
        <template>
            <slot></slot>
        </template>
	</v-text-field>
</template>

<script>
export default {
	props: {
        label: {
            type: String,
            default: ''
        },

        value: {
		   type: String,
           default: ''
        },

        required: {
		   type: Boolean,
           default: false
        },

		disabled: {
			type: Boolean,
			default: false
		},

        rules: {
		   type: Array,
           default: () => []
        },

		readonly: {
		   type: Boolean,
           default: false
        },
        
		config: {
		   type: Object,
           default: () => ({type: 'text'})
        },
	},

	computed: {
		classes () {
			let classes = []

			if(this.readonly){
				classes.push('text-field__readonly') 
			}

			return classes
		}
	},

	data() {
		return {
			typingTimer: null,
			doneTypingInterval: 1000
		}
	},

	methods: {
		onInput(value) {
            this.$emit('input', value)
		}
	}
}
</script>

<style lang="scss">
	.text-field {
		&__readonly {
			.v-text-field__slot input {
				cursor: not-allowed;
			}

			.v-input__slot:before {
				border-color: $grey300!important;
				border-style: dotted!important;
				color: $grey300;
			}

			&.v-input input {
				color: $grey300;
			}
		}
	
		&__icon {
			fill: $secondary;
			width: 25px;
			height: 25px;
		}


	}
    
    .v-input__prepend-inner {
        margin-top: 0!important;
    }
</style>