<template>
  <div
    data-testid="card-section"
    :class="classNames">
    <div
      v-if="$slots.header"
      data-testid="card-header"
      class="card__header">
      <slot name="header" />
    </div>

    <div
      v-else-if="title"
      class="card__header card__header--default">
      <Subheading
        class="card__header__title"
        weight="medium"
        overline>
        {{ title }}
      </Subheading>

      <span
        v-if="$slots.action"
        data-testid="card-header-action"
        class="card__header__action">
        <slot name="action" />
      </span>
    </div>

    <div class="card__body">
      <slot />
    </div>

    <footer
      v-if="$slots.footer"
      data-testid="card-footer"
      class="card__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import Subheading from '../subheading/Subheading.vue'
import type { VNode } from 'vue-demi'
import { computed } from 'vue-demi'

const props = defineProps({
  title: {
    type   : String,
    default: undefined,
  },
  disabled: {
    type   : Boolean,
    default: false,
  },
})

const classNames = computed(() => {
  const result: String[] = ['card__section']

  if (props.disabled)
    result.push('card__section--disabled')

  return result
})

defineSlots<{
  'header':() => VNode[],
  'action':() => VNode[],
  'footer':() => VNode[],
  'default':() => VNode[],
}>()
</script>
