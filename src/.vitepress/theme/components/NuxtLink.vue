<template>
  <a
    v-if="isExternalLink || !href"
    v-bind="$attrs"
    :href="href?.toString()"
    target="_blank">
    <slot />
  </a>
  <router-link
    v-else
    v-slot="{ href: routeHref, navigate, isActive, isExactActive }"
    :to="href"
    :replace="replace"
    custom>
    <a
      :href="routeHref"
      :class="{
        'router-link-active': isActive,
        'router-link-exact-active': isExactActive,
      }"
      v-bind="$attrs"
      @click="navigate">
      <slot />
    </a>
  </router-link>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import { hasProtocol } from 'ufo'
import { computed } from 'vue-demi'
import type { RouteLocationRaw } from 'vue-router'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  href: {
    type   : [String, Object] as PropType<RouteLocationRaw>,
    default: undefined,
  },
  replace: {
    type   : Boolean,
    default: false,
  },
})

const isExternalLink = computed(() => {
  return typeof props.href === 'string'
    && (hasProtocol(props.href) || props.href.startsWith('#'))
})
</script>
