<script lang="ts">
import {
  defineComponent,
  h,
} from 'vue-demi'
import { findAllChildren } from '../utils/vnode'

export default defineComponent({
  props: {
    active: {
      type    : Number,
      required: true,
    },
  },
  setup (props, { slots }) {
    return () => {
      return findAllChildren(slots.default(), 'ProgressItem')
        .map((vnode, index) => {
          const isActive = index <= props.active

          return h(vnode, {
            dataTabid: index,
            active   : isActive,
            class    : { 'progress--active': isActive },
          })
        })
    }
  },
})
</script>
