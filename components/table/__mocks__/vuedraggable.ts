import {
  defineComponent,
  h,
  onMounted,
} from 'vue-demi'

export default defineComponent({
  props: {
    modelValue: {
      type   : Array,
      default: () => ([]),
    },
  },
  emits: ['update:modelValue'],
  setup (props, { slots, attrs, emit }) {
    onMounted(() => {
      emit('update:modelValue', [...props.modelValue].reverse())
    })

    return () => h('div', attrs, props.modelValue.map((element, index) => {
      return slots.item({ element, index })
    }))
  },
})
