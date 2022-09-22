<script lang="ts">
import {
  defineComponent,
  h,
  KeepAlive,
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
    keepAlive: {
      type   : Boolean,
      default: false,
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
      const body = () => {
        return props.keepAlive
          ? h(KeepAlive, () => h(step, { key: props.active }))
          : h(step, { key: props.active })
      }

      return h(Transition, {
        name: transition.value,
        mode: 'out-in',
      }, body)
    }
  },
})
</script>
