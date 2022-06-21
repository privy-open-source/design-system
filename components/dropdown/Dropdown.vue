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
        data-testid="dropdown-activator"
        :variant="variant"
        :color="color"
        :size="size"
        :icon="icon"
        :pill="pill"
        :disabled="disabled"
        @click.prevent="toggle">
        <slot name="button-content">
          {{ text }}
        </slot>
      </Button>
    </slot>

    <Transition name="fade">
      <div
        v-show="isOpen"
        ref="menu"
        data-testid="dropdown-menu"
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
  InjectionKey,
  PropType,
  provide,
  Ref,
  watch,
  toRef,
} from 'vue-demi'
import {
  templateRef,
  onClickOutside,
  onKeyStroke,
} from '@vueuse/core'
import Button from '../button/Button.vue'
import DropdownGroup from '../dropdown-group/DropdownGroup.vue'
import { useFocus } from './utils/use-focus'
import { usePopper, Placement } from './utils/use-popper'
import { useVModel } from '../input/use-input'
import type {
  StyleVariant,
  ColorVariant,
  SizeVariant,
} from '../button/Button.vue'

type DropdownGroupElement = InstanceType<typeof DropdownGroup> & HTMLDivElement

interface DropdownContext {
  close: () => void,
  open: () => void,
  toggle: () => void,
  isOpen: Ref<boolean>,
}

export const DROPDOWN_CONTEXT: InjectionKey<DropdownContext> = Symbol('DropdownContext')

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
    placement: {
      type   : String as PropType<Placement>,
      default: 'bottom-start',
    },
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'solid',
    },
    color: {
      type   : String as PropType<ColorVariant>,
      default: 'primary',
    },
    size: {
      type   : String as PropType<SizeVariant>,
      default: 'md',
    },
    icon: {
      type   : Boolean,
      default: false,
    },
    pill: {
      type   : Boolean,
      default: false,
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
    const target    = templateRef<HTMLDivElement>('dropdown')
    const menu      = templateRef<HTMLDivElement>('menu')
    const wizard    = templateRef<DropdownGroupElement>('wizard')
    const placement = toRef(props, 'placement')
    const popper    = usePopper(target, menu, placement)
    const isOpen    = useVModel(props)

    const { next: nextFocus, prev: prevFocus } = useFocus(menu)

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
      if (isOpen.value) {
        // Add little delay too prevent race condition with v-model changing
        setTimeout(() => {
          close()
        })
      }
    }, { ignore: [target] })

    onKeyStroke('Escape', (event) => {
      const target = event.target as HTMLElement

      if (isOpen.value) {
        close()

        /* In HappyDOM, blur() is undefined, which shouldn't happen in Real Browser */
        /* c8 ignore next 2 */
        if (typeof target.blur === 'function')
          target.blur()
      }
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

    onKeyStroke(['Tab'], (event) => {
      event.preventDefault()

      if (isOpen.value) {
        if (event.shiftKey)
          prevFocus()
        else
          nextFocus()
      }
    })

    watch(isOpen, (value) => {
      if (value && popper.value)
        popper.value.update()
      else if (wizard.value)
        wizard.value.reset()
    }, { immediate: true })

    provide(DROPDOWN_CONTEXT, {
      isOpen,
      toggle,
      open,
      close,
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
