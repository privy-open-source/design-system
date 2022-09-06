<template>
  <div
    data-testid="contextual-bar"
    class="contextual-bar"
    :class="classNames">
    <slot />
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType,
} from 'vue-demi'

type ColorVariant = 'default' | 'info' | 'danger' | 'warning'

export default defineComponent({
  props: {
    color: {
      type   : String as PropType<ColorVariant>,
      default: 'info',
    },
  },

  setup (props) {
    function init () : void {
      const navbar = document.querySelector('.nav-bar')
      // let contextualBarHeight = document.querySelector('.contextual-bar')?.getAttribute('display')

      // navbar?.classList.add('top')
      navbar?.setAttribute('style', 'top:')
    }

    const classNames = computed(() => {
      const result: string[] = ['']

      if (props.color)
        result.push(`contextual-bar--${props.color}`)

      return result
    })

    // watch (init, (value, oldValue) => {
    //   console.log(value)
    // })

    return {
      classNames,
      init,
    }
  },
})
</script>

<style lang="postcss">
.contextual-bar {
  @apply fixed top-0 left-0 py-6 w-full;

  &&--default,
  &&--danger,
  &&--warning {
    @apply text-white;
  }

  &&--default {
    @apply bg-black;
  }

  &&--info {
    @apply bg-background-100 text-body-100;
  }

  &&--danger {
    @apply bg-danger-100;
  }

  &&--warning {
    @apply bg-warning-100;
  }
}
</style>
