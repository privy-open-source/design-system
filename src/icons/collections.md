<script setup>
import Fuse from 'fuse.js'
import meta from '@privyid/persona-icon'
import pCaption from '../components/caption/Caption.vue'
import pInput from '../components/input/Input.vue'
import { computed, ref } from 'vue-demi'
import { groupBy } from 'lodash-es'

const keyword = ref('')
const fuse    = new Fuse(meta, {
  threshold: 0.4,
  keys     : [
    'name',
    'aliases',
    'category',
  ]
})

const icons = computed(() => {
  const filtered = keyword.value
    ? fuse.search(keyword.value).map((result) => result.item)
    : meta

  return groupBy(filtered, 'category')
})

function getURL (icon) {
  return new URL(`../../packages/persona-icon/icons/${icon.category}/${icon.name}/32.svg`, import.meta.url).href
}
</script>

# Icon Collection

> List of all icons

<p-input placeholder="Search..." v-model="keyword" clearable />

<template v-for="(items, category) in icons">
    <h3 class="capitalize">{{ category }}</h3>
    <div class="grid grid-cols-4 gap-4 mt-8">
      <template v-for="icon in items">
        <div class="flex flex-col items-center justify-center py-5 border rounded">
          <client-only>
            <img :src="getURL(icon)" />
          </client-only>
          <p-caption class="mt-4 text-center">
            {{ icon.name }}
          </p-caption>
        </div>
      </template>
    </div>
</template>

