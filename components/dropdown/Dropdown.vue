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
      :is-open="isOpen">
      <Button
        :disabled="disabled"
        @click="toggle">
        {{ text }}
      </Button>
    </slot>

    <Transition name="fade">
      <div
        v-show="isOpen"
        ref="menu"
        class="dropdown__menu">
        <DropdownGroup
          ref="wizard"
          class="dropdown__menuContainer">
          <slot />
        </DropdownGroup>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  watch,
} from 'vue-demi'
import {
  templateRef,
  onClickOutside,
  onKeyStroke,
} from '@vueuse/core'
import Button from '../button/Button.vue'
import DropdownGroup from './DropdownGroup.vue'
import { useFocus } from './use-focus'
import { PoppperOption, usePopper } from './use-popper'
import { useVModel } from '../input/use-input'

type DropdownGroupElement = InstanceType<typeof DropdownGroup> & HTMLDivElement

export default defineComponent({
  components: {
    Button,
    DropdownGroup,
  },
  props: {
    modelValue: {
      type   : Boolean,
      default: false,
    },
    text: {
      type   : String,
      default: '',
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
          ],
        }
      },
    },
    disabled: {
      type   : Boolean,
      default: false,
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue'],
  setup (props) {
    const target = templateRef<HTMLDivElement>('dropdown')
    const menu   = templateRef<HTMLDivElement>('menu')
    const wizard = templateRef<DropdownGroupElement>('wizard')
    const popper = usePopper(target, menu, props.popper)
    const isOpen = useVModel(props)

    const { next: nextFocus,
      prev: prevFocus } = useFocus(menu)

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

    onClickOutside(menu, () => {
      if (isOpen.value)
        toggle()
    }, { ignore: [target] })

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

    watch(isOpen, (show) => {
      if (show && popper.value)
        popper.value.update()
      else
        wizard.value.reset()
    })

    return {
      isOpen,
      toggle,
      open,
      close,
    }
  },
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
</style>
