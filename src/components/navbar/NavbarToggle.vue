<template>
  <Button
    class="navbar__toggle"
    data-testid="navbar-toggle"
    variant="outline"
    :class="classNames"
    icon
    @click="expanded">
    <slot :expanded="expand">
      <IconClose v-if="expand" />
      <IconMenu v-else />
    </slot>
  </Button>
</template>

<script lang="ts" setup>
import {
  inject,
  ref,
  computed,
} from 'vue-demi'
import Button from '../button/Button.vue'
import IconMenu from '@privyid/persona-icon/vue/menu-burger/20.vue'
import IconClose from '@privyid/persona-icon/vue/close/20.vue'
import { NAVBAR_SETTINGS } from '.'

const expand     = ref(false)
const settings   = inject(NAVBAR_SETTINGS, undefined, false)
const toggleable = settings?.toggleable

const classNames = computed(() => {
  const result: string[] = []

  if (toggleable?.value)
    result.push(`navbar__toggle--${toggleable?.value}`)

  return result
})

function expanded () {
  expand.value = !expand.value
}
</script>

<style lang="postcss">
.navbar {
  &__toggle {
    @apply inline-flex;

    &:is(.btn--variant-outline, .btn--default) {
      @apply bg-base hover:shadow-none text-subtle;
      @apply dark:bg-dark-base dark:text-dark-subtle;
    }

    &&--all {
      @apply flex;
    }

    &&--lg {
      @apply lg:hidden;
    }

    &&--md {
      @apply md:hidden;
    }

    &&--sm {
      @apply sm:hidden;
    }
  }
}
</style>
