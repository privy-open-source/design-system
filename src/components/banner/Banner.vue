<template>
  <div
    v-if="show"
    data-testid="banner"
    :class="classNames">
    <div
      v-if="!noIcon"
      class="banner__icon"
      data-testid="banner-icon"
      :class="{ 'banner__icon--custom': $slots.icon }">
      <slot name="icon">
        <component
          :is="icon"
          v-if="icon" />
      </slot>
    </div>
    <div class="banner__body">
      <slot :close="close" />
    </div>
    <div
      v-if="dismissable"
      data-testid="banner-close"
      class="banner__close"
      @click="close()">
      <IconClose />
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconInfo from '@privyid/persona-icon/vue/information-circle-solid/20.vue'
import IconDanger from '@privyid/persona-icon/vue/exclamation-circle-solid/20.vue'
import IconClose from '@privyid/persona-icon/vue/close/16.vue'
import type { PropType, VNode } from 'vue-demi'
import { ref, computed } from 'vue-demi'
import type { StyleVariant } from '.'

const BannerIcons = {
  danger: IconDanger,
  info  : IconInfo,
}

const props = defineProps({
  variant: {
    type   : String as PropType<StyleVariant>,
    default: 'info',
  },
  dismissable: {
    type   : Boolean,
    default: true,
  },
  noIcon: {
    type   : Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  'dismissed': [],
}>()

const show = ref(true)

const classNames = computed(() => {
  const result: string[] = ['banner']

  if (props.variant)
    result.push(`banner--${props.variant}`)

  return result
})

const icon = computed(() => {
  return BannerIcons[props.variant]
})

function close (): void {
  show.value = false

  emit('dismissed')
}

defineExpose({ close })

defineSlots<{
  'icon':() => VNode[],
  'default':(props: { close: () => void }) => VNode[],
}>()
</script>

<style lang="postcss">
.banner {
  @apply p-4 flex space-x-2 rounded text-subtle;
  @apply dark:text-dark-subtle;

  a {
    &:not(.btn) {
      @apply underline decoration-solid text-info;
      @apply dark:text-dark-info;
    }
  }

  .subheading {
    &:not(&--md) {
      @apply mb-1;
    }

    @apply mb-2;
  }

  &&--info {
    @apply bg-base;
    @apply dark:bg-dark-base;

    .banner__icon {
      @apply text-info;
      @apply dark:text-dark-info;
    }
  }

  &&--danger {
    @apply bg-danger;
    @apply dark:bg-dark-danger;

    .banner__icon {
      @apply text-danger;
      @apply dark:text-dark-danger;
    }
  }

  &__body {
    @apply grow text-sm;
  }

  &__icon,
  &__close {
    @apply shrink-0;
  }

  &__close {
    @apply cursor-pointer text-default/30 hover:text-default/50;
    @apply dark:text-dark-default/30 hover:dark:text-dark-default/50;
  }
}
</style>
