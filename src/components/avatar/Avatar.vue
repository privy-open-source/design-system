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

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import {
  computed,
  onMounted,
  ref,
  watch,
} from 'vue-demi'
import {
  createAlias,
  createSpinner,
  dummyAvatar,
} from './utils/create-image'
import loadImage from './utils/load-image'
import type { TypeVariant, SizeVariant } from '.'

defineOptions({ name: 'Avatar' })

const props = defineProps({
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
  square: {
    type   : Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  'imgloaded': [string],
  'imgerror': [Error],
}>()

const imageSrc = ref(createSpinner(50))

const classNames = computed(() => {
  const result: string[] = ['avatar']

  // eslint-disable-next-line unicorn/explicit-length-check
  if (props.size)
    result.push(`avatar--${props.size}`)

  if (props.square)
    result.push('avatar--square')

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
</script>

<style lang="postcss">
.avatar {
  @apply inline-flex items-center justify-center overflow-hidden text-subtle bg-base;
  @apply dark:text-dark-subtle dark:bg-dark-base;

  &:not(&--square) {
    @apply rounded-full;
  }

  &__image {
    @apply w-full h-full object-cover;
  }

  &--xs {
    @apply w-6 h-6 text-tn;
  }

  &--sm {
    @apply w-8 h-8 text-xs;
  }

  &--md {
    @apply w-10 h-10 text-sm;
  }

  &--lg {
    @apply w-14 h-14 text-base;
  }

  &--xl {
    @apply w-24 h-24 text-lg;
  }

  &--square {
    &.avatar {
      &--xs {
        @apply rounded-xs;
      }

      &--sm {
        @apply rounded-sm;
      }

      &--md {
        @apply rounded;
      }

      &--lg,
      &--xl {
        @apply rounded-md;
      }
    }
  }
}
</style>
