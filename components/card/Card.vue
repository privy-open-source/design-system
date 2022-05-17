<template>
    <section 
        data-testid="card"
        :class="classNames">
        <slot />
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue-demi'

export default defineComponent ({
    props: {
        noPadding: {
            type: Boolean,
            default: false,
        }
    },
    setup (props) {
        const classNames = computed(() => {
            const result: string[] = ['card']

            if (props.noPadding)
                result.push('p-0')
            else
                result.push('p-6')

            return result
        })

        return {
            classNames
        }
    }
})
</script>

<style lang="postcss">
.card {
    @apply border bg-white border-secondary-5 rounded-md;
}
</style>
