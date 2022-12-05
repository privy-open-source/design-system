<template>
  <Button
    class="navbar__toggle"
    data-testid="navbar-toggle"
    variant="outline"
    color="secondary"
    :class="classNames"
    icon
    @click="expanded">
    <slot :expanded="expand">
      <IconClose v-if="expand" />
      <IconMenu v-else />
    </slot>
  </Button>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  ref,
  computed,
} from 'vue-demi'
import Button from '../button/Button.vue'
import IconMenu from '@carbon/icons-vue/lib/menu/20'
import IconClose from '@carbon/icons-vue/lib/close/20'
import { NAVBAR_SETTINGS } from '.'

export default defineComponent({
  components: {
    Button,
    IconMenu,
    IconClose,
  },
  setup () {
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

    return {
      expanded,
      expand,
      classNames,
    }
  },
})
</script>

<style lang="postcss">
.navbar {
  &__toggle {
    @apply inline-flex;
    /* @apply inline-flex absolute right-5; */

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
