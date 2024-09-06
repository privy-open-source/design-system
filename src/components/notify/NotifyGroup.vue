<template>
  <div
    data-testid="notify-group"
    class="notify-group"
    :class="classNames">
    <TransitionGroup
      tag="div"
      name="notify"
      class="notify-group__container">
      <template
        v-for="item in items"
        :key="item._id">
        <pNotifyItem
          :option="item"
          @update:option="update(item._id, $event)"
          @dismissed="remove(item._id)" />
      </template>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import type {
  PropType,
  Ref,
} from 'vue-demi'
import {
  computed,
  shallowRef,
  triggerRef,
} from 'vue-demi'
import type {
  NotifyInstance,
  NotifyOption,
  NotifyPositionVariant,
} from '.'
import pNotifyItem from './NotifyItem.vue'
import defu from 'defu'

interface NotifyItem extends NotifyOption {
  _id: symbol,
}

const props = defineProps({
  position: {
    type   : String as PropType<NotifyPositionVariant>,
    default: 'bottom-left',
  },
  noAnimation: {
    type   : Boolean,
    default: false,
  },
})

const items: Ref<NotifyItem[]> = shallowRef([])

const classNames = computed(() => {
  const result: string[] = []

  if (props.position)
    result.push(`notify-group--${props.position}`)

  return result
})

function add (option: NotifyOption) {
  const _id  = Symbol('NotifyID')
  const item = { ...option, _id }

  items.value.push(item)

  triggerRef(items)

  return _id
}

function remove (id: symbol) {
  items.value.splice(items.value.findIndex((item) => item._id === id), 1)

  triggerRef(items)
}

function update (id: symbol, option: Partial<NotifyOption>) {
  const i = items.value.findIndex((i) => i._id === id)

  if (i > -1)
    items.value[i] = defu(option, items.value[i])

  triggerRef(items)
}

function show (option: NotifyOption): NotifyInstance {
  const id = add(option)

  return {
    update (option: Partial<NotifyOption>) {
      update(id, option)
    },
    close () {
      remove(id)
    },
  }
}

defineExpose({
  add,
  show,
  remove,
  update,
})
</script>

<style lang="postcss">
.notify-group {
  --p-notify-z-index: theme(zIndex.notify);

  @apply z-[var(--p-notify-z-index)] fixed;

  &__container {
    @apply flex space-y-2 h-full overflow-visible;
  }

  &--top-right {
    .notify-group__container {
      @apply items-end;
    }

    .notify {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 translate-x-20;
      }
    }
  }

  &--top-center {
    @apply left-1/2 -translate-x-1/2;

    .notify-group__container {
      @apply items-center;
    }

    .notify {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 -translate-y-20;
      }
    }
  }

  &--top-left {
    .notify-group__container {
      @apply items-start;
    }

    .notify {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 -translate-x-20;
      }
    }
  }

  &--bottom-right {
    .notify-group__container {
      @apply items-end;
    }

    .notify {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 translate-x-20;
      }
    }
  }

  &--bottom-center {
    @apply left-1/2 -translate-x-1/2;

    .notify-group__container {
      @apply items-center;
    }

    .notify {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 translate-y-20;
      }
    }
  }

  &--bottom-left {
    .notify-group__container {
      @apply items-start;
    }

    .notify {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 -translate-x-20;
      }
    }
  }

  &--top-left,
  &--top-center,
  &--top-right {
    @apply top-8;

    .notify-group__container {
      @apply justify-start flex-col-reverse space-y-reverse;
    }
  }

  &--top-right,
  &--bottom-right {
    @apply right-8;
  }

  &--top-left,
  &--bottom-left {
    @apply left-8;
  }

  &--bottom-left,
  &--bottom-center,
  &--bottom-right {
    @apply bottom-8;

    .notify-group__container {
      @apply justify-end flex-col;
    }
  }
}

.notify {
  @apply will-change-[opacity,transform];

  &-enter-active,
  &-leave-active {
    @apply transition-all duration-150;
  }
}
</style>
