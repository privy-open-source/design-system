<script lang="ts">
/**
 * TODO: Migrate this component to script setup after defineRender has been release
 * https://github.com/vuejs/rfcs/discussions/585
 */
import {
  defineComponent,
  h,
  KeepAlive,
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
          ? h(KeepAlive, h(step, { key: props.active }))
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
