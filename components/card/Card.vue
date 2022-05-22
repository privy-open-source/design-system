<template>
    <component 
        data-testid="card"
        :is="elementNames"
        :class="classNames">
        <header class="card__header" v-if="title">
            <Heading element="h6">
                {{ title }}
            </Heading>

            <span class="card__header__action" v-if="$slots.action">
                <slot name="action" />
            </span>
        </header>
        <div class="card__body" v-if="!sectioned">
            <slot />
        </div>
        <slot v-else />
        <footer class="card__footer" v-if="$slots.footer">
            <slot name="footer" />
        </footer>
    </component>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue-demi'
import Heading from '../heading/Heading.vue'

type ElementVariant = 'div' | 'section' | 'article'

export default defineComponent ({
    components: { Heading },
    props: {
        element: {
            type: String as PropType<ElementVariant>,
            default: 'section'
        },
        title: {
            type: String,
            default: null
        },
        sectioned: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        }
    },
    setup (props) {
        const classNames = computed(() => {
            const result: string[] = ['card']

            if (props.sectioned)
                result.push('card--sectioned')

            if (props.disabled)
                result.push('card--disabled')

            return result
        })

        const elementNames = computed(() => {
            return props.element
        })

        return {
            classNames,
            elementNames
        }
    }
})
</script>

<style lang="postcss">
.card {
    @apply border bg-white border-secondary-5 rounded-md;

    &__header,
    &__body {
        @apply pt-6 px-6;
    }

    &__body {
        @apply pb-6;

        > .card__section {
            @apply pt-0;
        }

        .card__section {
            &:first-child {
                @apply border-b-0 mt-6;
            }

            &:last-child {
                .card__body {
                    @apply pb-0;
                }
            }

            @apply border-t border-black border-opacity-10;
            .card__body {
                @apply px-0;
            }
        }
    }

    &.card--sectioned {
        > .card__body {
            @apply p-0;
        }
    }

    &.card--disabled {
        @apply bg-background-100;
    }

    &__header {
        @apply flex justify-between items-center;

        &__action {
            a{
                &:not(.btn) {
                    @apply text-xs;
                }
            }
        }
    }

    &__section {
        @apply border-b border-black border-opacity-10;

        &:last-child {
            @apply border-b-0;
        }

        &--disabled {
            @apply bg-background-100;
        }
    }

    &__footer {
        @apply flex justify-end pb-6 pt-3;
    }
}
</style>
