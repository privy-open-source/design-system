<template>
    <component
        data-testid="heading"
        :is="elementName"
        :id="id"
        :class="className">
        <slot />
    </component>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue-demi"
import _ from 'lodash'

type ElementVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const HeadingClass = {
    h1: 'text-7xl',
    h2: 'text-6xl',
    h3: 'text-5xl',
    h4: 'text-4xl',
    h5: 'text-2xl',
    h6: 'text-xl',
}

export default defineComponent({
    props: {
        element: {
            type: String as PropType<ElementVariant>,
            default: 'h2'
        },
        id: {
            type: String,
            default: null
        }
    },
    setup (props) {
        const elementName = computed(() => {
            return props.element
        })

        const className = computed(() => {
            const result: string[] = [`${_.get(HeadingClass, props.element)}`]

            return result
        })

        return {
            elementName,
            className
        }
    }

})
</script>
