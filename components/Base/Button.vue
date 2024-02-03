<template>
    <v-btn v-bind="$attrs" v-on="$listeners" :icon="icon" :size="size" :block="block" class="base-button text-capitalize" :class="classes">
        <template v-slot:prepend>
            <slot name="prepend"/>
        </template>
        <template>
            <slot />
        </template>
        <template v-slot:append>
            <slot name="append"/>
        </template>
  </v-btn>
</template>


<script setup>
    import { ref, computed } from 'vue'

    const props = defineProps({
        size: {
            type: String,
        },

        block: {
            type: Boolean,
            default: false
        },

        icon: {
            type: Boolean,
            default: false,
        },

        colorType: {
            type: String,
            default: ''
        }
    })

    const classes = computed(() => {
        let classesButton = []

        if (props.colorType === 'strong') {
            classesButton.push('base-button--strong')
        }

        return classesButton
    })
</script>


<style lang="scss" scoped>
	.base-button {
        color: $grey300;

        &--strong {
            background-color: $primary;
            color: white;
            border: inherit;
        }
	}
</style>
