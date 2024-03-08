<script lang="ts">
/**
 * TODO: Migrate this component to script setup after defineRender has been release
 * https://github.com/vuejs/rfcs/discussions/585
 */
import type { PropType } from 'vue-demi'
import {
  h,
  defineComponent,
} from 'vue-demi'
import { findAllChildren } from '../utils/vnode'
import type { SizeVariant } from '.'
import pAvatar from './Avatar.vue'

export default defineComponent({
  props: {
    size: {
      type   : String as PropType<SizeVariant>,
      default: 'xs',
    },
    length: {
      type   : [Number, String],
      default: 0,
    },
  },
  setup (props, { slots }) {
    return () => {
      const maxlength  = Number(props.length)
      const items      = findAllChildren(slots.default(), 'Avatar')
      const shownItems = items.length > maxlength
        ? items.slice(0, maxlength - 1)
        : items

      const result = shownItems.map((avatar) => {
        return h(avatar, { size: props.size })
      })

      if (items.length > maxlength)
        result.push(h(pAvatar, { size: props.size }, () => `+${((items.length + 1) - maxlength)}`))

      return result
    }
  },
})
</script>
