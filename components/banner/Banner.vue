<template>
  <div
    v-if="show"
    data-testid="banner"
    :class="classNames">
    <div class="banner__icon">
      I
    </div>
    <div class="banner__body">
      <slot />
    </div>
    <div
      v-if="dismissable"
      data-testid="banner-close"
      class="banner__close" @click="dismiss()">
      &times;
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from "vue-demi"

export default defineComponent({
  props: {
    variant: {
      type   : String as PropType<'info' | 'danger'>,
      default: 'info',
    },
    dismissable: {
      type   : Boolean,
      default: true,
    },
  },
  setup (props, { emit }) {
    const show = ref(true)

    const classNames = computed(() => {
      const result: string[] = ['banner']

      if (props.variant)
        result.push(`banner--${props.variant}`)

      return result
    })

    function dismiss (): void {
      show.value = false
      emit('dismissed')
    }

    return {
      classNames,
      show,
      dismiss,
    }
  }
})
</script>

<style lang="postcss">
.banner {
  @apply p-3 flex gap-2;
}

.banner--info {
  @apply bg-background-100;
}

.banner--danger {
  @apply bg-danger-25;
}

.banner__icon,
.banner__close {
  @apply flex-shrink-0 gap-2;
}

.banner__body {
  @apply flex-grow;
}
</style>
