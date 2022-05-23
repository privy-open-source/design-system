<template>
  <TransitionGroup
    tag="div"
    name="toast"
    class="toast-container"
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
import { defineComponent, ref } from "vue-demi"
import { ToastOption } from "./use-toast"
import Toast from "./Toast.vue"

interface ToastItem extends ToastOption {
  _id: symbol,
}

export default defineComponent({
  components: { Toast },
  setup () {
    const items = ref<ToastItem[]>([])

    function add (option: ToastOption) {
      items.value.unshift({
        ...option,
        _id: Symbol(),
      })
    }

    function remove (index: number) {
      items.value.splice(index, 1)
    }

    return {
      add,
      remove,
      items,
    }
  }
})
</script>

<style lang="postcss">
.toast-container {
  @apply fixed top-0 right-0 z-40 flex flex-col gap-2 max-h-screen overflow-visible;
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
