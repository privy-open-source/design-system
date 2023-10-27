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
        @dismissed="remove(i)">
        <template #icon>
          <template v-if="item.icon && typeof item.icon === 'string'">
            <img
              :src="item.icon"
              alt="toast-icon">
          </template>
          <template v-else-if="item.icon">
            <component :is="item.icon" />
          </template>
        </template>
      </Toast>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import type {
  PropType,
  Ref,
} from 'vue-demi'
import {
  computed,
  defineComponent,
  ref,
} from 'vue-demi'
import type { ToastOption, ToastPositionVariant } from '.'
import Toast from './Toast.vue'

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
    const items: Ref<ToastItem[]> = ref([])

    const classNames = computed(() => {
      const result: string[] = []

      if (props.position)
        result.push(`toast-container--${props.position}`)

      return result
    })

    function add (option: ToastOption) {
      const item = { ...option, _id: Symbol('id') }

      if (props.position.startsWith('bottom'))
        items.value.push(item)
      else
        items.value.unshift(item)
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
    @apply top-2 right-4;

    .toast {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 translate-x-20;
      }
    }
  }

  &--top-center {
    @apply top-2 left-1/2 -translate-x-1/2;

    .toast {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 -translate-y-20;
      }
    }
  }

  &--top-left {
    @apply top-2 left-4;

    .toast {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 -translate-x-20;
      }
    }
  }

  &--bottom-right {
    @apply bottom-2 right-4;

    .toast {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 translate-x-20;
      }
    }
  }

  &--bottom-center {
    @apply  bottom-2 left-1/2 -translate-x-1/2;

    .toast {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 translate-y-20;
      }
    }
  }

  &--bottom-left {
    @apply bottom-2 left-4;

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
