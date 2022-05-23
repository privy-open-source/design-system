<template>
  <div
    data-testid="card-section"
    :class="classNames">
    <div
      v-if="title"
      class="card__header">
      <Subheading
        overline="medium">
        {{ title }}
      </Subheading>

      <span
        v-if="$slots.action"
        class="card__header__action">
        <slot name="action" />
      </span>
    </div>
    <div class="card__body">
      <slot />
    </div>
    <footer
      v-if="$slots.footer"
      class="card__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script lang="ts">
import Subheading from '../subheading/Subheading.vue'
import { defineComponent, computed } from 'vue-demi'

export default defineComponent({
  components: { Subheading },
  props     : {
    title: {
      type   : String,
      default: null,
    },
    disabled: {
      type   : Boolean,
      default: false,
    },
  },

  setup (props) {
    const classNames = computed(() => {
      const result: String[] = ['card__section']

      if (props.disabled)
        result.push('card__section--disabled')

      return result
    })

    return { classNames }
  },
})
</script>
