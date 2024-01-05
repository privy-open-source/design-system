<template>
  <v-collapse
    data-testid="collapse"
    class="collapses"
    :class="classNames"
    :when="model || isToggleable">
    <slot />
  </v-collapse>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
} from 'vue-demi'
import { useVModel } from '../input'
import { NAVBAR_SETTINGS } from '../navbar'
import { useMediaQuery } from '@vueuse/core'
import { Collapse } from 'vue-collapsed'

export default defineComponent({
  components: { vCollapse: Collapse },
  props     : {
    modelValue: {
      type   : Boolean,
      default: false,
    },
    isNav: {
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
    const model   = useVModel(props)
    const context = inject(NAVBAR_SETTINGS, undefined, true)
    const lg      = useMediaQuery('(min-width: 1024px)')
    const md      = useMediaQuery('(min-width: 768px)')
    const sm      = useMediaQuery('(min-width: 640px)')

    const isToggleable = computed(() => {
      if (context?.toggleable?.value === 'lg')
        return lg.value

      if (context?.toggleable?.value === 'md')
        return md.value

      if (context?.toggleable?.value === 'sm')
        return sm.value

      return model.value
    })

    const classNames = computed(() => {
      const result: string[] = ['']

      if (model.value)
        result.push('collapse--show')
      else
        result.push('collapse--hide')

      if (props.isNav)
        result.push('navbar--collapse')

      return result
    })

    return {
      model,
      classNames,
      isToggleable,
    }
  },

})
</script>

<style lang="postcss">
.collapses {
  @apply transition-[height] duration-300 ease-out;
}
</style>
