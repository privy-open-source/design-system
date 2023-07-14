<template>
  <div
    data-testid="toast-container"
    class="toast-container"
    :class="classNames">
    <TransitionGroup
      tag="div"
      name="toast">
      <Toast
        v-for="(item, i) in items"
        :key="item._id"
        :title="item.title"
        :text="item.text"
        :type="item.type"
        :variant="item.variant"
        :duration="item.duration"
        :class="item.toastClass"
        @dismissed="remove(i)" />
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import {
  PropType,
  computed,
  defineComponent,
  ref,
} from 'vue-demi'
import { ToastOption, ToastPositionVariant } from '.'
import Toast from './Toast.vue'
import { startsWith } from 'lodash-es'

interface ToastItem extends ToastOption {
  _id: symbol,
}

export default defineComponent({
  components: { Toast },
  props     : {
    position: {
      type   : String as PropType<ToastPositionVariant>,
      default: 'bottom-left',
    },
  },
  setup (props) {
    const items = ref<ToastItem[]>([])

    const classNames = computed(() => {
      const result: string[] = []

      if (props.position)
        result.push(`toast-container--${props.position}`)

      return result
    })

    function add (option: ToastOption) {
      if (startsWith(option.position, 'bottom')) {
        items.value.push({
          ...option,
          _id: Symbol('id'),
        })
      } else {
        items.value.unshift({
          ...option,
          _id: Symbol('id'),
        })
      }
    }

    function remove (index: number) {
      items.value.splice(index, 1)
    }

    return {
      add,
      remove,
      items,
      classNames,
    }
  },
})
</script>

<style lang="postcss">
.toast-container {
  --p-toast-z-index: theme(zIndex.toast);
  @apply z-[var(--p-toast-z-index)] fixed flex flex-col space-y-2 max-h-screen overflow-visible;

  &--top-right {
    @apply top-0 right-0;

    .toast {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 translate-x-20;
      }
    }
  }

  &--top-center {
    @apply top-0 left-1/2 -translate-x-1/2;

    .toast {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 -translate-y-20;
      }
    }
  }

  &--top-left {
    @apply top-0 left-0;

    .toast {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 -translate-x-20;
      }
    }
  }

  &--bottom-right {
    @apply bottom-0 right-0;

    .toast {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 translate-x-20;
      }
    }
  }

  &--bottom-center {
    @apply  bottom-0 left-1/2 -translate-x-1/2;

    .toast {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 translate-y-20;
      }
    }
  }

  &--bottom-left {
    @apply bottom-0 left-0;

    .toast {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 -translate-x-20;
      }
    }
  }
}

.toast {
  @apply will-change-[opacity,transform] my-2;

  &-enter-active,
  &-leave-active {
    @apply transition-all duration-150;
  }
}
</style>
