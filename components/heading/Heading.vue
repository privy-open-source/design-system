<template>
    <component
        data-testid="heading"
        :is="elementNames"
        :class="classNames">
        <slot />
    </component>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue-demi"

type ElementVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export default defineComponent({
    props: {
        element: {
            type: String as PropType<ElementVariant>,
            default: 'h3'
        }
    },
    setup (props) {
        const elementNames = computed(() => {
            return props.element
        })

        const classNames = computed(() => {
            const result: string[] = [`${props.element}`]

            return result
        })

        return {
            elementNames,
            classNames
        }
    }

})
</script>

<style lang="postcss">
.h {
    &1 {
        @apply text-7xl;
    }
    &2 {
        @apply text-6xl;
    }
    &3 {
        @apply text-5xl;
    }
    &4 {
        @apply text-4xl;
    }
    &5 {
        @apply text-2xl;
    }
    &6 {
        @apply text-xl;
    }
}
</style>
