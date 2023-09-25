<script lang="ts">
import {
  defineComponent,
  h,
  resolveComponent,
  Transition,
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
    transition: {
      type   : String,
      default: 'slide-left',
    },
  },
  setup (props, { slots }) {
    return () => {
      const step = findAllChildren(slots.default(), 'Step').at(props.active)
      const body = () => {
        return props.keepAlive
          ? h(resolveComponent('keep-alive'), () => h(step, { key: props.active }))
          : h(step, { key: props.active })
      }

      return h(Transition, {
        name: props.transition,
        mode: 'out-in',
      }, body)
    }
  },
})
</script>
