<template>
  <div
    data-testid="popup-container"
    class="popup-container"
    :class="classNames">
    <TransitionGroup
      tag="div"
      name="popup">
      <Popup
        v-for="(item, i) in items"
        :key="item._id"
        :title="item.title"
        :text="item.text"
        :type="item.type"
        :variant="item.variant"
        :duration="item.duration"
        :icon-color="item.iconColor"
        :class="item.popupClass"
        @dismissed="remove(i)">
        <template #icon>
          <template v-if="item.icon && typeof item.icon === 'string'">
            <img
              :src="item.icon"
              alt="popup-icon">
          </template>
          <template v-else-if="item.icon">
            <component :is="item.icon" />
          </template>
        </template>
      </Popup>
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
import type { PopupOption, PopupPositionVariant } from '.'
import Popup from './Popup.vue'

interface PopupItem extends PopupOption {
  _id: symbol,
}

export default defineComponent({
  components: { Popup },
  props     : {
    position: {
      type   : String as PropType<PopupPositionVariant>,
      default: 'bottom-left',
    },
  },
  setup (props) {
    const items: Ref<PopupItem[]> = ref([])

    const classNames = computed(() => {
      const result: string[] = []

      if (props.position)
        result.push(`popup-container--${props.position}`)

      return result
    })

    function add (option: PopupOption) {
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
.popup-container {
  --p-popup-z-index: theme(zIndex.toast);

  @apply z-[var(--p-popup-z-index)] fixed flex flex-col space-y-2 max-h-screen overflow-visible;

  &--top-right {
    @apply top-2 right-4;

    .popup {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 translate-x-20;
      }
    }
  }

  &--top-center {
    @apply top-2 left-1/2 -translate-x-1/2;

    .popup {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 -translate-y-20;
      }
    }
  }

  &--top-left {
    @apply top-2 left-4;

    .popup {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 -translate-x-20;
      }
    }
  }

  &--bottom-right {
    @apply bottom-2 right-4;

    .popup {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 translate-x-20;
      }
    }
  }

  &--bottom-center {
    @apply  bottom-2 left-1/2 -translate-x-1/2;

    .popup {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 translate-y-20;
      }
    }
  }

  &--bottom-left {
    @apply bottom-2 left-4;

    .popup {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 -translate-x-20;
      }
    }
  }

  &--top-left,
  &--top-center,
  &--top-right {
    @apply justify-start;
  }

  &--bottom-left,
  &--bottom-center,
  &--bottom-right {
    @apply justify-end;
  }
}

.popup {
  @apply will-change-[opacity,transform] my-2;

  &-enter-active,
  &-leave-active {
    @apply transition-all duration-150;
  }
}
</style>
