<template>
  <div
    class="form-group"
    :class="classNames">
    <label class="form-group__label">
      <IconInfo
        v-if="hint"
        v-p-tooltip="hint"
        class="form-group__hint" />
      {{ label }}<sup v-if="required">*</sup>
      <p-caption v-if="caption">{{ caption }}</p-caption>
    </label>

    <slot />

    <transition
      name="slide-up"
      mode="out-in">
      <p
        v-if="error"
        class="form-group__error">
        {{ error }}
      </p>
      <p
        v-else-if="description"
        class="form-group__description">
        {{ description }}
      </p>
    </transition>
  </div>
</template>

<script lang="ts">
import IconInfo from '@carbon/icons-vue/lib/information--filled/16'
import pCaption from '../caption/Caption.vue'
import { pTooltip } from '../tooltip'
import { computed, defineComponent } from 'vue-demi'

export default defineComponent({
  components: { pCaption, IconInfo },
  directives: { pTooltip },
  props     : {
    required: {
      type   : Boolean,
      default: false,
    },
    label: {
      type   : String,
      default: '',
    },
    caption: {
      type   : String,
      default: '',
    },
    description: {
      type   : String,
      default: '',
    },
    hint: {
      type   : String,
      default: '',
    },
    error: {
      type   : String,
      default: '',
    },
  },
  setup (props) {
    const classNames = computed(() => {
      const result: string[] = []

      if (props.error)
        result.push('form-group--error', 'state--error')

      return result
    })

    return { classNames }
  },
})
</script>

<style lang="postcss">
.form-group {
  @apply flex flex-col mb-4;

  &__label {
    @apply font-bold text-xs mb-2 relative;

    > sup {
      @apply text-danger;
    }
  }

  &__description {
    @apply text-xs;
  }

  &__error {
    @apply text-xs text-danger;
  }

  &__hint {
    @apply absolute bottom-0 right-0 text-accent cursor-pointer focus:outline-none;
  }
}
</style>
