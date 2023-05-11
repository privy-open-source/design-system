<template>
  <div
    ref="dropdown"
    class="dropdown"
    :class="[{ 'dropdown--open': isOpen, 'dropdown--no-caret' : noCaret }, classNames]"
    data-testid="dropdown">
    <slot
      name="activator"
      :toggle="toggle"
      :open="open"
      :close="close"
      :is-open="isOpen">
      <Button
        data-testid="dropdown-activator"
        class="dropdown__activator"
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
        <IconArrow
          v-if="!noCaret"
          class="dropdown__caret"
          data-testid="dropdown-caret" />
      </Button>
    </slot>

    <Transition name="fade">
      <div
        v-show="isOpen"
        ref="menu"
        data-testid="dropdown-menu"
        class="dropdown__menu"
        :class="menuClass">
        <DropdownGroup
          ref="wizard"
          class="dropdown__menu__container">
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
  provide,
  watch,
  toRef,
  watchEffect,
  computed,
} from 'vue-demi'
import {
  templateRef,
  onClickOutside,
  onKeyStroke,
} from '@vueuse/core'
import Button from '../button/Button.vue'
import DropdownGroup from '../dropdown-subitem/DropdownSubitem.vue'
import { useFocus } from './utils/use-focus'
import {
  Placement,
  autoUpdate,
  computePosition,
  offset,
  flip,
  shift,
} from '@floating-ui/dom'
import { useVModel } from '../input'
import IconArrow from '@carbon/icons-vue/lib/chevron--down/16'
import type {
  StyleVariant,
  ColorVariant,
  SizeVariant,
} from '../button'
import { DROPDOWN_CONTEXT } from '.'

type DropdownSubitemElement = InstanceType<typeof DropdownGroup> & HTMLDivElement

export default defineComponent({
  components: {
    Button,
    DropdownGroup,
    IconArrow,
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
      default: 'default',
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
    noCaret: {
      type   : Boolean,
      default: false,
    },
    divider: {
      type   : Boolean,
      default: false,
    },
    menuClass: {
      type: [
        String,
        Array,
        Object,
      ],
      default: undefined,
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: [
    'show',
    'hide',
    'update:modelValue',
  ],
  setup (props, { emit }) {
    const target    = templateRef<HTMLDivElement>('dropdown')
    const menu      = templateRef<HTMLDivElement>('menu')
    const wizard    = templateRef<DropdownSubitemElement>('wizard')
    const placement = toRef(props, 'placement')
    const isOpen    = useVModel(props)

    const { next: nextFocus, prev: prevFocus } = useFocus(menu)

    const classNames = computed(() => {
      const result: string[] = ['']

      if (props.divider)
        result.push('dropdown--divider')

      return result
    })

    function toggle () {
      if (!props.disabled) {
        if (isOpen.value)
          close()
        else
          open()
      }
    }

    function open () {
      if (!props.disabled) {
        isOpen.value = true

        emit('show')
      }
    }

    function close () {
      if (!props.disabled) {
        isOpen.value = false

        emit('hide')
      }
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

    watchEffect((onCleanup) => {
      if (target.value && menu.value) {
        const cleanup = autoUpdate(target.value, menu.value, () => {
          computePosition(target.value, menu.value, {
            strategy  : 'absolute',
            placement : placement.value,
            middleware: [
              flip(),
              shift(),
              offset(8),
            ],
          }).then(({ x, y, placement }) => {
            if (menu.value) {
              menu.value.dataset.popperPlacement = placement

              menu.value.style.left = `${x || 0}px`
              menu.value.style.top  = `${y || 0}px`
            }
          })
        })

        onCleanup(cleanup)
      }
    }, { flush: 'post' })

    watch(isOpen, (value) => {
      if (!value && wizard.value)
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
      classNames,
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
    @apply max-h-64 border rounded w-full min-w-[15rem] bg-default z-10 border-default shadow-xl overflow-x-hidden overflow-y-auto absolute;
    @apply dark:bg-dark-default dark:border-dark-default;

    &__container {
      > .dropdown__item {
        &:first-child,
        .dropdown__subitem:first-child & {
          @apply rounded-t-sm;
        }

        &:last-child,
        .dropdown__subitem:last-child & {
          @apply rounded-b-sm;
        }
      }
    }
  }

  &__activator > &__caret {
    @apply self-center -mr-[3px];
  }

  &&--divider {
    .dropdown {
      &__menu {
        :where(.checkbox, .radio, .dropdown__item) {
          @apply border-b border-solid border-b-subtle-alpha last:border-b-0;
          @apply dark:border-b-dark-subtle-alpha;
        }
      }
    }
  }
}
</style>
