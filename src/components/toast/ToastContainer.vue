<template>
  <TransitionGroup
    tag="div"
    name="toast"
    class="toast-container"
    :class="classNames"
    data-testid="toast-container">
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

interface ToastItem extends ToastOption {
  _id: symbol,
}

export default defineComponent({
  components: { Toast },
  props     : {
    position: {
      type   : String as PropType<ToastPositionVariant>,
      default: 'top-left',
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
      items.value.unshift({
        ...option,
        _id: Symbol('id'),
      })
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
  @apply z-[var(--p-toast-z-index)] fixed top-0 right-0 flex flex-col space-y-2 max-h-screen overflow-visible;

  &--top-left {
    @apply left-0 top-0;
  }
}

.toast {
  @apply will-change-[opacity,transform];

  &-enter-active,
  &-leave-active {
    @apply transition-all duration-150;
  }

  &-enter-from,
  &-leave-to {
    @apply opacity-0 translate-x-20;
  }
}
</style>
