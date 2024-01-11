<script lang="ts">
/**
 * TODO: Migrate this component to script setup after defineRender has been release
 * https://github.com/vuejs/rfcs/discussions/585
 */
import type { PropType } from 'vue-demi'
import {
  defineComponent,
  h,
  mergeProps,
} from 'vue-demi'
import { findAllChildren } from '../utils/vnode'
import pAccordionItem from './AccordionItem.vue'

export default defineComponent({
  props: {
    modelValue: {
      type   : [Number, Array] as PropType<number | number[]>,
      default: undefined,
    },
    multiple: {
      type   : Boolean,
      default: false,
    },
    noCaret: {
      type   : Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup (props, { slots, emit }) {
    function setValue (isExpand: boolean, i: number) {
      if (props.multiple) {
        const value = Array.isArray(props.modelValue)
          ? props.modelValue
          : []

        if (isExpand)
          emit('update:modelValue', [...value, i])
        else
          emit('update:modelValue', value.filter((x) => x !== i))
      } else {
        if (isExpand)
          emit('update:modelValue', i)
        else if (props.modelValue === i)
          emit('update:modelValue')
      }
    }

    return () => {
      const items = findAllChildren(slots.default(), 'AccordionItem')

      return items.map((item, i) => {
        const isExpand = props.multiple && Array.isArray(props.modelValue)
          ? props.modelValue.includes(i)
          : props.modelValue === i

        return h(pAccordionItem, mergeProps(item.props, {
          'noCaret'            : item.props.noCaret ?? props.noCaret,
          'modelValue'         : isExpand,
          'onUpdate:modelValue': (value: boolean) => {
            setValue(value, i)
          },
        }), item.children)
      })
    }
  },
})
</script>
