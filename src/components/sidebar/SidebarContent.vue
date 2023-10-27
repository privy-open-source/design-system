<script lang="ts">
import {
  defineComponent,
  h,
} from 'vue-demi'
import { findAllChildren, toBoolean } from '../utils/vnode'

export default defineComponent({
  props: {
    bottom: {
      type   : Boolean,
      default: false,
    },
  },
  setup (props, { slots }) {
    return () => {
      const navs = props.bottom
        ? findAllChildren(slots.default(), 'SidebarNav').filter((vnode) => toBoolean(vnode.props?.bottom))
        : findAllChildren(slots.default(), '*').filter((vnode) => toBoolean(vnode.props?.bottom) !== true)

      return navs.map((nav) => h(nav))
    }
  },
})
</script>
