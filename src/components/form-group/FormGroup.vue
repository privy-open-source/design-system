<template>
  <div
    class="form-group"
    data-testid="form-group"
    :class="classNames">
    <label
      data-testid="form-group-label"
      class="form-group__label">
      <template v-if="hint">
        <slot name="hint">
          <IconInfo
            v-p-tooltip="hint"
            data-testid="form-group-hint"
            class="form-group__hint" />
        </slot>
      </template>
      <slot name="label">
        <span v-p-md.inline="label" />
      </slot><sup
        v-if="required"
        data-testid="form-group-required">*</sup>
      <p-caption
        v-if="caption"
        data-testid="form-group-caption">
        <slot name="caption">
          <span v-p-md.inline="caption" />
        </slot>
      </p-caption>
    </label>

    <div class="form-group__inputs">
      <slot />

      <transition
        name="slide-up"
        mode="out-in">
        <p
          v-if="error"
          data-testid="form-group-error"
          class="form-group__error">
          <slot name="error-icon">
            <IconInfo
              v-if="errorIcon"
              data-testid="form-group-error-icon" />
          </slot>
          <slot name="error">
            <span v-p-md.inline="error" />
          </slot>
        </p>
        <p
          v-else-if="description"
          data-testid="form-group-description"
          class="form-group__description">
          <slot name="description">
            <span v-p-md.inline="description" />
          </slot>
        </p>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconInfo from '@privyid/persona-icon/vue/information-circle-solid/20.vue'
import pCaption from '../caption/Caption.vue'
import { vPMd } from '../markdown/'
import { vPTooltip } from '../tooltip'
import type { VNode } from 'vue-demi'
import { computed } from 'vue-demi'

const props = defineProps({
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
  horizontal: {
    type   : Boolean,
    default: false,
  },
  errorIcon: {
    type   : Boolean,
    default: false,
  },
})

const classNames = computed(() => {
  const result: string[] = []

  if (props.error)
    result.push('form-group--error', 'state--error')

  if (props.horizontal)
    result.push('form-group--horizontal')

  return result
})

defineSlots<{
  'hint'(): VNode[],
  'label'(): VNode[],
  'caption'(): VNode[],
  'error-icon'(): VNode[],
  'error'(): VNode[],
  'description'(): VNode[],
}>()
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

  & > &__inputs > &__description {
    @apply text-xs my-2 text-subtle;
    @apply dark:text-dark-subtle;
  }

  & > &__inputs > &__error {
    @apply text-xs text-danger flex gap-1 items-center;
    @apply dark:text-dark-danger my-2;
  }

  & > &__label > &__hint {
    @apply absolute right-0 text-info cursor-pointer focus:outline-none;
    @apply dark:text-dark-info;
  }

  &&--horizontal {
    @apply flex-row items-baseline;

    & > .form-group__label {
      @apply mb-0 mr-2 basis-1/3;
    }

    & > .form-group__inputs {
      @apply grow;
    }
  }
}
</style>
