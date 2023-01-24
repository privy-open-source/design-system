<template>
  <div
    class="sheet"
    :class="classNames"
    :style="{ zIndex: zIndex }">
    <transition name="fade">
      <div
        v-show="model"
        class="sheet__backdrop"
        @click="close" />
    </transition>
    <transition :name="transition">
      <div
        v-if="model"
        ref="target"
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
  watch,
} from 'vue-demi'
import { useVModel } from '../input'
import { PositionVariant } from '../pdf-object'

export default defineComponent({
  props: {
    modelValue: {
      type   : Boolean,
      default: false,
    },
    position: {
      type   : String as PropType<PositionVariant>,
      default: 'left',
    },
    open: {
      type   : Boolean,
      default: false,
    },
    zIndex: {
      type   : Number,
      default: 50,
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
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

    watch(() => props.open, (open) => {
      model.value = open
    }, { immediate: true })

    function close () {
      model.value = false
    }

    return {
      model,
      transition,
      classNames,
      close,
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
      @apply left-0 top-0 h-full w-1/3 min-w-[250px] max-w-sm shadow-lg-right;
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
      @apply right-0 top-0 h-full w-1/3 min-w-[250px] max-w-sm shadow-lg-left;
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
      @apply right-0 top-0 w-full h-1/3 min-h-[250px] shadow-lg;
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
      @apply right-0 bottom-0 w-full h-1/3 min-h-[250px] shadow-lg-top;
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
