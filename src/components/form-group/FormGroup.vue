<template>
  <div
    class="form-group"
    data-testid="form-group"
    :class="classNames">
    <label
      data-testid="form-group-label"
      class="form-group__label">
      <IconInfo
        v-if="hint"
        v-p-tooltip="hint"
        data-testid="form-group-hint"
        class="form-group__hint" />
      {{ label }}<sup
        v-if="required"
        data-testid="form-group-required">*</sup>
      <p-caption
        v-if="caption"
        data-testid="form-group-caption">
        {{ caption }}</p-caption>
    </label>

    <slot />

    <transition
      name="slide-up"
      mode="out-in">
      <p
        v-if="error"
        data-testid="form-group-error"
        class="form-group__error">
        {{ error }}
      </p>
      <p
        v-else-if="description"
        data-testid="form-group-description"
        class="form-group__description">
        {{ description }}
      </p>
    </transition>
  </div>
</template>

<script lang="ts">
import IconInfo from '@privyid/persona-icon/vue/information-circle-solid/20.vue'
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
    @apply font-bold text-xs mb-2 relative text-subtle;
    @apply dark:text-dark-subtle;

    > sup {
      @apply text-danger;
      @apply dark:text-dark-danger;
    }
  }

  & > &__description {
    @apply text-xs my-2 text-subtle;
    @apply dark:text-dark-subtle;
  }

  & > &__error {
    @apply text-xs text-danger;
    @apply dark:text-dark-danger my-2;
  }

  &__hint {
    @apply absolute right-0 text-info cursor-pointer focus:outline-none;
    @apply dark:text-dark-info;
  }
}
</style>
