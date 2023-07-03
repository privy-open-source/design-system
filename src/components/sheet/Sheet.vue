<template>
  <div
    class="sheet"
    data-testid="sheet"
    :class="classNames"
    :style="{ zIndex: zIndex }">
    <transition name="fade">
      <div
        v-show="model"
        data-testid="sheet-backdrop"
        class="sheet__backdrop"
        @click="onClickBackdrop" />
    </transition>
    <transition :name="transition">
      <div
        v-if="model"
        ref="target"
        data-testid="sheet-content"
        class="sheet__content"
        v-bind="$attrs">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
} from 'vue-demi'
import { useVModel } from '../input'
import { AddonPositionVariant } from '../pdf-object'

export default defineComponent({
  props: {
    modelValue: {
      type   : Boolean,
      default: false,
    },
    position: {
      type   : String as PropType<AddonPositionVariant>,
      default: 'left',
    },
    zIndex: {
      type   : Number,
      default: 20,
    },
    noCloseOnBackdrop: {
      type   : Boolean,
      default: false,
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: [
    'update:modelValue',
    'hide',
    'show',
  ],
  setup (props) {
    const model = useVModel(props)

    const classNames = computed(() => {
      const result: string[] = []

      if (props.position)
        result.push(`sheet--${props.position}`)

      return result
    })

    const transition = computed(() => {
      return `sheet--${props.position}`
    })

    function onClickBackdrop () {
      if (!props.noCloseOnBackdrop)
        model.value = false
    }

    return {
      model,
      transition,
      classNames,
      onClickBackdrop,
    }
  },
})
</script>

<style lang="postcss">
.sheet {
  @apply relative;

  &__content {
    @apply fixed bg-default overflow-auto;
  }

  &__backdrop {
    @apply fixed inset-0 bg-emphasis/20;
  }

  &--left {
    .sheet__content {
      @apply left-0 top-0 h-full w-2/3 md:w-1/3 lg:w-1/4 xl:w-1/6 min-w-[250px] shadow-lg-right;
    }

    &-enter-active,
    &-leave-active {
      @apply transition-[opacity,transform];
    }

    &-enter-from,
    &-leave-to {
      @apply opacity-0 -translate-x-full;
    }
  }

  &--right {
    .sheet__content {
      @apply right-0 top-0 h-full w-2/3 md:w-1/3 lg:w-1/4 xl:w-1/6 min-w-[250px] shadow-lg-left;
    }

    &-enter-active,
    &-leave-active {
      @apply transition-[opacity,transform];
    }

    &-enter-from,
    &-leave-to {
      @apply opacity-0 translate-x-full;
    }
  }

  &--top {
    .sheet__content {
      @apply right-0 top-0 w-full h-1/4 min-h-[250px] shadow-lg;
    }

    &-enter-active,
    &-leave-active {
      @apply transition-[opacity,transform];
    }

    &-enter-from,
    &-leave-to {
      @apply opacity-0 -translate-y-full;
    }
  }

  &--bottom {
    .sheet__content {
      @apply right-0 bottom-0 w-full h-1/4 min-h-[250px] shadow-lg-top;
    }

    &-enter-active,
    &-leave-active {
      @apply transition-[opacity,transform];
    }

    &-enter-from,
    &-leave-to {
      @apply opacity-0 translate-y-full;
    }
  }
}
</style>
