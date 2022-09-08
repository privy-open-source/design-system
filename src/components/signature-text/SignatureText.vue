<template>
  <img
    data-testid="signature-text"
    class="signature--text"
    :width="width"
    :height="height"
    :src="src">
</template>

<script lang="ts">
import {
  ref,
  computed,
  defineComponent,
  onMounted,
  watch,
} from 'vue-demi'
import { useVModel } from '../input/use-input'
import { createSpinner } from '../avatar/utils/create-image'
import { formatName } from './utils/formatter'
import generate from './utils/generate-text'

export default defineComponent({
  props: {
    modelValue: {
      type   : String,
      default: undefined,
    },
    width: {
      type   : Number,
      default: 430,
    },
    height: {
      type   : Number,
      default: 230,
    },
    text: {
      type   : String,
      default: '',
    },
    limit: {
      type   : Number,
      default: 2,
    },
    font: {
      type   : String,
      default: 'Herr Von Muellerhoff',
    },
    color: {
      type   : String,
      default: '#000000',
    },
  },
  setup (props) {
    const ready = ref(false)
    const model = useVModel(props)

    const src = computed(() => {
      if (!ready.value)
        return createSpinner(props.width, props.height)

      return model.value
    })

    const name = computed(() => {
      if (!props.text)
        return '- No Image -'

      return formatName(
        String(props.text)
          .split(' ')
          .filter(Boolean)
          .slice(0, props.limit)
          .join(' '),
      )
    })

    watch(() => [
      props.text,
      props.font,
      props.color,
      props.width,
      props.height,
      props.limit,
    ], () => {
      load()
    })

    onMounted(() => {
      load()
    })

    function load () {
      ready.value = false

      const options = {
        text  : name.value,
        font  : props.font,
        width : props.width,
        height: props.height,
        color : props.color,
      }

      generate(options)
        .then((base64Encoded) => {
          model.value = base64Encoded
          ready.value = true
        })
        .catch(console.error)
    }

    return { src }
  },
})
</script>

<style lang="postcss">
  .signature--text {
    @apply max-w-full h-auto;
  }
</style>
