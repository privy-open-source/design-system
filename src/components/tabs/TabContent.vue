<script lang="ts">
/**
 * TODO: Migrate this component to script setup after defineRender has been release
 * https://github.com/vuejs/rfcs/discussions/585
 */
import {
  Transition,
  h,
  ref,
  watch,
  resolveComponent,
  defineComponent,
} from 'vue-demi'
import { findAllChildren, toBoolean } from '../utils/vnode'

export default defineComponent({
  props: {
    active: {
      type    : Number,
      required: true,
    },
    keepAlive: {
      type   : Boolean,
      default: false,
    },
    vertical: {
      type   : Boolean,
      default: false,
    },
  },
  setup (props, { slots }) {
    const transition = ref(props.vertical ? 'slide-top' : 'slide-left')

    watch(() => props.active, (value, last) => {
      transition.value = value < last
        ? (props.vertical ? 'slide-bottom' : 'slide-right')
        : (props.vertical ? 'slide-top' : 'slide-left')
    })

    return () => {
      const tab = findAllChildren(slots.default(), 'Tab')
        .map((vnode, index) => {
          const isDisabled = toBoolean(vnode.props?.disabled)
          const isActive   = index === props.active && !isDisabled

          return h(vnode, {
            key      : index,
            dataTabid: index,
            style    : { display: isActive ? 'block' : 'none' },
          })
        })
        .at(props.active)

      const body = () => {
        return props.keepAlive
          ? h(resolveComponent('keep-alive'), () => tab)
          : tab
      }

      return h(Transition, {
        name: transition.value,
        mode: 'out-in',
      }, body)
    }
  },
})
</script>
