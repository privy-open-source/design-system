<template>
  <div
    data-testid="avatar"
    :class="classNames">
    <slot>
      <img
        data-testid="avatar-image"
        class="avatar__image"
        :class="imgClass"
        :data-type="type"
        :src="imageSrc"
        alt="Avatar Image">
    </slot>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  watch,
} from 'vue-demi'
import {
  createAlias,
  createSpinner,
  dummyAvatar,
} from './utils/create-image'
import loadImage from './utils/load-image'
import { TypeVariant, SizeVariant } from '.'

export default defineComponent({
  props: {
    variant: {
      type   : String as PropType<TypeVariant>,
      default: undefined,
    },
    src: {
      type   : String,
      default: undefined,
    },
    fallbackSrc: {
      type   : String,
      default: dummyAvatar(),
    },
    name: {
      type   : String,
      default: undefined,
    },
    size: {
      type   : String as PropType<SizeVariant>,
      default: 'md',
    },
    imgClass: {
      type: [
        String,
        Array,
        Object,
      ],
      default: undefined,
    },
  },
  emits: ['imgloaded', 'imgerror'],
  setup (props, { emit }) {
    const imageSrc = ref(createSpinner(50))

    const classNames = computed(() => {
      const result: string[] = ['avatar']

      // eslint-disable-next-line unicorn/explicit-length-check
      if (props.size)
        result.push(`avatar--${props.size}`)

      return result
    })

    const type = computed<TypeVariant>(() => {
      if (props.variant)
        return props.variant

      if (!props.src && props.name)
        return 'alias'

      return 'image'
    })

    function init () {
      if (type.value === 'alias')
        loadAlias()
      else
        load()
    }

    function load () {
      imageSrc.value = createSpinner(50)

      loadImage(props.src)
        .then(() => {
          imageSrc.value = props.src

          emit('imgloaded', props.src)
        })
        .catch((error) => {
          imageSrc.value = props.fallbackSrc
          emit('imgerror', error)
        })
    }

    function loadAlias () {
      imageSrc.value = createAlias(props.name)
    }

    watch(() => [
      props.src,
      props.name,
      props.variant,
    ], () => {
      init()
    })

    onMounted(() => {
      init()
    })

    return {
      classNames,
      type,
      imageSrc,
    }
  },
})
</script>

<style lang="postcss">
.avatar {
  @apply rounded-full inline-flex items-center justify-center overflow-hidden bg-primary-5;

  &__image {
    @apply w-full h-full object-cover;
  }

  &--xs {
    @apply w-6 h-6;
  }

  &--sm {
    @apply w-8 h-8;
  }

  &--md {
    @apply w-10 h-10;
  }

  &--lg {
    @apply w-14 h-14;
  }

  &--xl {
    @apply w-24 h-24;
  }
}
</style>
