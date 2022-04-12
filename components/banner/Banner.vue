<template>
  <div
    v-if="show"
    data-testid="banner"
    :class="classNames">
    <div class="banner__icon">
      <component
        v-if="icon"
        :is="icon" />
    </div>
    <div class="banner__body">
      <slot :close="close" />
    </div>
    <div
      v-if="dismissable"
      data-testid="banner-close"
      class="banner__close" @click="close()">
      <IconClose />
    </div>
  </div>
</template>

<script lang="ts">
import IconInfo from "@carbon/icons-vue/lib/information--filled/20"
import IconDanger from "@carbon/icons-vue/lib/warning--filled/20"
import IconClose from "@carbon/icons-vue/lib/close/16"
import { defineComponent, PropType, ref, computed } from "vue-demi"

type StyleVariant = 'info' | 'danger'

const BannerIcons = {
  'danger': IconDanger,
  'info'  : IconInfo,
}

export default defineComponent({
  components: { IconInfo, IconClose, IconDanger },
  props     : {
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'info',
    },
    dismissable: {
      type   : Boolean,
      default: true,
    },
  },
  emits: ['dismissed'],
  setup (props, { emit }) {
    const show = ref(true)

    const classNames = computed(() => {
      const result: string[] = ['banner']

      if (props.variant)
        result.push(`banner--${props.variant}`)

      return result
    })

    const icon = computed(() => {
      return BannerIcons[props.variant]
    })

    function close (): void {
      show.value = false
      emit('dismissed')
    }

    return {
      classNames,
      show,
      icon,
      close,
    }
  }
})
</script>

<style lang="postcss">
.banner {
  @apply p-4 flex gap-2 rounded;
}

.banner--info {
  @apply bg-background-100;
}

.banner--info .banner__icon {
  @apply text-primary-100;
}

.banner--danger {
  @apply bg-danger-25;
}

.banner--danger .banner__icon {
  @apply text-danger-100;
}

.banner__icon,
.banner__close {
  @apply flex-shrink-0;
}

.banner__body {
  @apply flex-grow;
}

.banner__close {
  @apply text-secondary-50 cursor-pointer hover:text-secondary-100;
}
</style>
