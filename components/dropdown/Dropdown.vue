<template>
  <div
    ref="dropdown"
    class="dropdown"
    :class="{ 'dropdown--open': isOpen }"
    data-testid="dropdown">
    <slot
      name="activator"
      :toggle="toggle"
      :open="open"
      :close="close"
      :isOpen="isOpen">
      <Button
        @click="toggle"
        :disabled="disabled">
        {{ text }}
      </Button>
    </slot>

    <Transition name="fade">
      <div
        v-show="isOpen"
        ref="menu"
        class="dropdown__menu">
        <DropdownGroup class="dropdown__menuContainer" ref="wizard">
          <slot />
        </DropdownGroup>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue-demi"
import { createPopper, Instance as Popper } from "@popperjs/core"
import Button from "../button/Button.vue"
import DropdownGroup from "./DropdownGroup.vue"
import { useFocus } from "./use-focus"
import { templateRef, tryOnMounted, onClickOutside, useVModel, syncRef, onKeyStroke } from "@vueuse/core"

type PoppperOption        = (typeof createPopper) extends (a: unknown, b: unknown, c: infer O) => unknown ? O : never
type DropdownGroupElement = InstanceType<typeof DropdownGroup> & HTMLDivElement

export default defineComponent({
  components: {
    Button,
    DropdownGroup
  },
  props: {
    modelValue: {
      type   : Boolean,
      default: false,
    },
    text: {
      type: String,
    },
    popper: {
      type   : Object as PropType<PoppperOption>,
      default: (): PoppperOption => {
        return {
          placement: 'bottom-start',
          modifiers: [
            {
              name   : 'offset',
              options: { offset: [0, 6] },
            },
            { name: 'preventOverflow' },
          ]
        }
      }
    },
    disabled: {
      type   : Boolean,
      default: false,
    }
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: [
    'update:modelValue',
  ],
  setup (props) {
    const target = templateRef<HTMLDivElement>('dropdown')
    const menu   = templateRef<HTMLDivElement>('menu')
    const wizard = templateRef<DropdownGroupElement>('wizard')
    const popper = ref<Popper>()
    const isOpen = ref(false)
    const model  = useVModel(props)

    const {
      next: nextFocus,
      prev: prevFocus,
    } = useFocus(menu)

    function toggle () {
      if (!props.disabled)
        isOpen.value = !isOpen.value
    }

    function open () {
      if (!props.disabled)
        isOpen.value = true
    }

    function close () {
      if (!props.disabled)
        isOpen.value = false
    }

    tryOnMounted(() => {
      popper.value = createPopper(target.value, menu.value, props.popper)
    })

    onClickOutside(menu, () => {
      if (isOpen.value)
        toggle()
    }, { ignore: [target]})

    onKeyStroke('Escape', () => {
      if (isOpen.value)
        close()
    })

    onKeyStroke(['ArrowUp'], (event) => {
      event.preventDefault()

      if (isOpen.value)
        prevFocus()
    })

    onKeyStroke(['ArrowDown'], (event) => {
      event.preventDefault()

      if (isOpen.value)
        nextFocus()
    })

    watch (isOpen, (show) => {
      if (show && popper.value) {
        popper.value.update()
      } else {
        wizard.value.reset()
      }
    })

    syncRef(isOpen, model)

    return {
      isOpen,
      toggle,
      open,
      close,
    }
  }
})
</script>

<style lang="postcss">
.dropdown {
  @apply relative inline-flex;

  &__menu {
    @apply max-h-64 border rounded w-full min-w-[15rem] bg-white z-10 border-secondary-25 shadow-xl overflow-x-hidden overflow-y-auto relative;
  }

  &__menuContainer > .dropdown__item:first-child,
  &__menuContainer > .dropdown__group:first-child .dropdown__item {
    @apply rounded-t;
  }

  &__menuContainer > .dropdown__item:last-child,
  &__menuContainer > .dropdown__group:last-child .dropdown__item {
    @apply rounded-b;
  }
}

.fade {
  &-enter-active,
  &-leave-active {
    @apply transition-opacity duration-200;
  }

  &-enter-from,
  &-leave-to {
    @apply opacity-0;
  }
}
</style>
