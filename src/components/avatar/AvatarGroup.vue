<template>
  <div
    data-testid="avatar-group"
    class="avatar-group">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { ref, provide } from 'vue-demi'
import type { SizeVariant } from '.'
import { AVATARGROUP_SETTING } from '.'

const size = ref<SizeVariant>('xs')

provide(AVATARGROUP_SETTING, { size: size })
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
