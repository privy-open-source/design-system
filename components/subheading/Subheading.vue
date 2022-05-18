<template>
    <p :class="className">
        <slot />
    </p>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue-demi"

type SizeVariant = 'md' | 'sm'

export default defineComponent({
    props: {
        size: {
            type: String as PropType<SizeVariant>,
            default: 'md'
        },
        overline: {
            type: Boolean,
            default: false
        }
    },

    setup (props) {
        const className = computed(() => {
            const result: String[] = ['subheading']

            console.log(props.size)

            if (props.size)
                result.push(`subheading--${props.size}`)

            if (props.overline) {
                const size = result.indexOf(`subheading--${props.size}`)
                result.splice(size, 1)
                result.push(`subheading--overline`)
            }

            return result
        })

        return {
            className
        }
    }
})


</script>

<style lang="postcss">
    .subheading {
        @apply uppercase tracking-[.009375rem];

        &.subheading--md {
            @apply text-base font-medium leading-tight;
        }

        &.subheading--sm {
            @apply text-sm font-medium leading-[1.28];
        }

        &.subheading--overline {
            @apply text-[0.6875rem] leading-[1.4] tracking-[0.09375rem];
        }
    }
</style>
