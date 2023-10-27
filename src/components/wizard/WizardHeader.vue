<script lang="ts">
import type { Slots } from 'vue-demi'
import {
  defineComponent,
  h,
  mergeProps,
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
  setup (props, { slots }) {
    return () => {
      const vnodes = findAllChildren(slots.default(), 'WizardStep')

      return h(Progress, { 'data-testid': 'wizard-progress' }, {
        default: () => {
          return vnodes.map((vnode, index) => {
            const vprops = mergeProps(vnode.props, {
              'active'     : index <= props.active,
              'data-testid': 'wizard-progress-item',
            })

            const vslots = {
              icon : (vnode.children as Slots)?.icon,
              title: (vnode.children as Slots)?.title,
            }

            return h(ProgressItem, vprops, vslots)
          })
        },
      })
    }
  },
})
</script>
