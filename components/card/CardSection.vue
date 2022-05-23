<template>
  <div
    data-testid="card-section"
    :class="classNames"
    >
    <div data-testid="card-header" class="card__header" v-if="$slots.header">
      <slot name="header" />
    </div>
    
    <div class="card__header card__header--default" v-else-if="title">
      <Subheading
        overline="medium">
        {{ title }}
      </Subheading>

      <span data-testid="card-header-action" class="card__header__action" v-if="$slots.action">
        <slot name="action"></slot>
      </span>
    </div>

    <div class="card__body">
      <slot />
    </div>
    
    <footer data-testid="card-footer" class="card__footer" v-if="$slots.footer">
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
