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

<script lang="ts">
import type { PropType } from 'vue-demi'
import {
  computed,
  defineComponent,
} from 'vue-demi'
import type {
  RouteLocationRaw,
} from 'vue-router'

export default defineComponent({
  inheritAttrs: false,
  props       : {
    href: {
      type   : [String, Object] as PropType<RouteLocationRaw>,
      default: undefined,
    },
    replace: {
      type   : Boolean,
      default: false,
    },
  },
  setup (props) {
    const isExternalLink = computed(() => {
      return typeof props.href === 'string'
        && (props.href.startsWith('http') || props.href.startsWith('#'))
    })

    return { isExternalLink }
  },
})
</script>
