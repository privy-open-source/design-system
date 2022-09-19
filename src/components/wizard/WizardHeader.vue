<script lang="ts">
import {
  defineComponent,
  h,
  mergeProps,
  Slots,
} from 'vue-demi'
import { findAllChildren } from '../utils/vnode'
import Progress from '../progress/Progress.vue'
import ProgressItem from '../progress/ProgressItem.vue'

export default defineComponent({
  props: {
    active: {
      type   : Number,
      default: 0,
    },
  },
  setup (props, { slots, attrs }) {
    return () => {
      const vnodes = findAllChildren(slots.default(), 'WizardStep')

      return h(Progress, {}, {
        default: () => {
          return vnodes.map((vnode, index) => {
            return h(ProgressItem, mergeProps(vnode.props, attrs, { active: index <= props.active }), {
              icon : (vnode.children as Slots)?.icon,
              title: (vnode.children as Slots)?.title,
            })
          })
        },
      })
    }
  },
})
</script>
