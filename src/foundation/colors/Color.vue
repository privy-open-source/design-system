<template>
  <div
    data-testid="color"
    class="color">
    <div class="color__container">
      <div
        class="color__card"
        :class="{ 'color__card--overlay' : color.overlay }"
        :style="{ 'background-color' : color.hex }">
        <div
          v-if="color.overlay"
          class="color__card__overlay"
          :style="{ 'background-color': color.overlay }" />
      </div>
      <div class="color__info">
        <p-caption
          class="color__info__token"
          size="tn">
          <slot name="token" />
        </p-caption>
        <p-caption
          class="color__info__name"
          size="tn">
          <slot name="figma" />
        </p-caption>
        <p-caption
          weight="bold"
          class="color__info__name"
          size="tn">
          <slot name="hex" />
        </p-caption>
      </div>
    </div>
    <div
      v-p-tooltip.focus="copied"
      title="Copied"
      class="color__copied"
      data-testid="color-copy"
      tabindex="0"
      @click="copy()" />
  </div>
</template>

<script lang="ts" setup>
import type { PropType, VNode } from 'vue-demi'
import { computed } from 'vue-demi'
import { useClipboard } from '@vueuse/core'
import { vPTooltip } from '../../components/tooltip'
import pCaption from '../../components/caption/Caption.vue'
import type { Color } from '.'

const props = defineProps({
  color: {
    type   : Object as PropType<Color>,
    default: () => ({} as Color),
  },
})

const source           = computed(() => props.color.overlay || props.color.hex)
const { copy, copied } = useClipboard({ source })

defineSlots<{
  'token'(): VNode[],
  'figma'(): VNode[],
  'hex'(): VNode[],
}>()
</script>

<style lang="postcss" scoped>
.color {
  @apply w-full h-full relative cursor-pointer;

  &__container {
    @apply flex-row space-y-3;
  }

  &__card {
    @apply h-12 rounded shadow-xl relative;

    &--overlay {
      @apply bg-[url('/assets/images/img-foundation-bg-checker.png')];
    }

    &__overlay {
      @apply absolute w-full h-full left-0 top-0 rounded;
    }
  }

  &__info {
    @apply flex flex-col space-y-1;

    &__token {
      @apply text-lightblue-50;
    }

    &__name {
      @apply text-subtle dark:text-dark-subtle;
    }
  }

  &__copied {
    @apply w-full h-full absolute inset-0;
  }
}
</style>
