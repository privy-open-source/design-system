<template>
  <div
    data-testid="card-section"
    :class="classNames"
    >
    <div class="card__header" v-if="title">
      <Subheading
        overline="medium">
        {{ title }}
      </Subheading>

      <span class="card__header__action" v-if="$slots.action">
        <slot name="action"></slot>
      </span>
    </div>

    <div class="card__body">
      <slot />
    </div>
    
    <footer class="card__footer" v-if="$slots.footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script lang="ts">
import Subheading from '../subheading/Subheading.vue'
import { defineComponent, computed } from "vue-demi"

export default defineComponent({
    components: { Subheading },
    props: {
        title: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false,
        }
    },
    
    setup (props) {
        const classNames = computed(() => {
            const result: String[] = ['card__section']

            if (props.disabled)
                result.push('card__section--disabled')

            return result
        })

        return {
            classNames
        }
    }
})
</script>
