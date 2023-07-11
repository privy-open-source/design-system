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
        :class="buttonClass"
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
        :class="[menuClass, containerSize]">
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
import type {
  MenuSizeVariant,
} from '.'
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
    buttonClass: {
      type: [
        String,
        Array,
        Object,
      ],
      default: undefined,
    },
    menuSize: {
      type   : String as PropType<MenuSizeVariant>,
      default: 'sm',
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

    const containerSize = computed(() => {
      const result: string[] = ['']

      if (props.menuSize)
        result.push(`dropdown__menu--${props.menuSize}`)

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
      if (isOpen.value) {
        event.preventDefault()

        prevFocus()
      }
    })

    onKeyStroke(['ArrowDown'], (event) => {
      if (isOpen.value) {
        event.preventDefault()

        nextFocus()
      }
    })

    onKeyStroke(['Tab'], (event) => {
      if (isOpen.value) {
        event.preventDefault()

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
      containerSize,
      toggle,
      open,
      close,
    }
  },
})
</script>

<style lang="postcss">
.dropdown {
  --p-dropdown-z-index: theme(zIndex.dropdown);
  --p-dropdown-size-lg: 30rem; /* 480px */
  --p-dropdown-size-md: 20rem; /* 320px */
  --p-dropdown-size-sm: 15rem; /* 240px */
  --p-dropdown-max-height: theme(spacing.64);

  @apply relative inline-flex;

  &__menu {
    @apply max-h-[var(--p-dropdown-max-height)] border rounded bg-default z-[var(--p-dropdown-z-index)] border-default shadow-xl overflow-x-hidden overflow-y-auto absolute;
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

    &--lg {
      @apply w-[var(--p-dropdown-size-lg)];
    }

    &--md {
      @apply w-[var(--p-dropdown-size-md)];
    }

    &--sm {
      @apply w-[var(--p-dropdown-size-sm)];
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
