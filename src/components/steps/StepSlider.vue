<script lang="ts">
import {
  defineComponent,
  h,
  ref,
  Transition,
  watch,
} from 'vue-demi'
import { findAllChildren } from '../utils/vnode'

export default defineComponent({
  props: {
    active: {
      type   : Number,
      default: 0,
    },
  },
  setup (props, { slots }) {
    const transition = ref('slide-left')

    watch(() => props.active, (value, old) => {
      transition.value = value > old
        ? 'slide-left'
        : 'slide-right'
    })

    return () => {
      const step = findAllChildren(slots.default(), 'Step').at(props.active)

      return h(Transition, {
        name: transition.value,
        mode: 'out-in',
      }, { default: () => step && h(step, { key: props.active }) })
    }
  },
})
</script>
