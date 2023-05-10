---
title: Collections · Icons
description: List of all icons
---

<script setup>
import Fuse from 'fuse.js'
import meta from '@privyid/persona-icon/svg/meta.json'
import pText from '../components/text/Text.vue'
import pInput from '../components/input/Input.vue'
import { createSpinner } from '../components/avatar/utils/create-image'
import { computed, ref } from 'vue-demi'
import { groupBy, sortBy } from 'lodash-es'

const keyword = ref('')
const fuse    = new Fuse(meta, {
  threshold: 0.5,
  keys     : [
    'name',
    'folder',
    'aliases',
    'category',
  ]
})

const icons = computed(() => {
  const filtered = keyword.value
    ? fuse.search(keyword.value).map((result) => result.item)
    : sortBy(meta, ['category', 'folder'])

  return groupBy(filtered, 'category')
})

function getURL (icon) {
  return new URL(`../../packages/persona-icon/svg/${icon.folder}/32.svg`, import.meta.url).href
}
</script>

# Collections

> List of **{{ meta.length }}** icons


<p-input placeholder="Search..." v-model="keyword" clearable />

<template v-if="Object.values(icons).length > 0">
  <template v-for="(items, category) in icons" :key="category">
    <h3 class="capitalize">{{ category }}</h3>
    <div class="grid grid-cols-2 gap-4 mt-8 md:grid-cols-4">
      <template v-for="icon in items" :key="icon.folder">
        <div class="flex flex-col items-center justify-center py-5 border rounded border-default dark:border-dark bg-default-alpha dark:bg-dark-default-alpha">
          <client-only>
            <template #placeholder>
              <img width="32" height="32" :src="createSpinner(32)" />
            </template>
            <img class="dark:invert" width="32" height="32" :src="getURL(icon)" />
          </client-only>
          <p-text variant="caption" class="mt-4 text-center">
            {{ icon.folder }}
          </p-text>
        </div>
      </template>
    </div>
  </template>
</template>
<template v-else>
  <p class="text-center">
    There are no icon to show
  </p>
</template>
