<template>
  <div
    data-testid="avatar-group"
    class="avatar-group">
    <pAvatarTruncate
      :size="size"
      :length="length">
      <slot />
    </pAvatarTruncate>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import type { SizeVariant } from '.'
import pAvatarTruncate from './AvatarTruncate.vue'

defineProps({
  size: {
    type   : String as PropType<SizeVariant>,
    default: 'xs',
  },
  length: {
    type   : [Number, String],
    default: 5,
  },
})
</script>

<style lang="postcss">
.avatar-group {
  --p-avatar-outline-color: theme(backgroundColor.default.DEFAULT);
  --p-avatar-outline-color-dark: theme(backgroundColor.dark.default.DEFAULT);

  @apply items-center flex -space-x-1;

  .avatar {
    @apply outline outline-2 outline-offset-0 outline-[color:var(--p-avatar-outline-color)];
    @apply dark:outline-[color:var(--p-avatar-outline-color-dark)];
  }
}
</style>
