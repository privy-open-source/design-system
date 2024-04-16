---
title: Collections · Icons
description: List of all icons
---

<script setup>
import Fuse from 'fuse.js'
import meta from '@privyid/persona-icon/svg/meta.json'
import pButton from '../../components/button/Button.vue'
import pText from '../../components/text/Text.vue'
import pInput from '../../components/input/Input.vue'
import pTabs from '../../components/tabs/Tabs.vue'
import pTab from '../../components/tabs/Tab.vue'
import pModal from '../../components/modal/Modal.vue'
import pSelect from '../../components/select/Select.vue'
import pFormGroup from '../../components/form-group/FormGroup.vue'
import pLabel from '../../components/label/Label.vue'
import PiDownload16 from '@privyid/persona-icon/vue/download/16.vue'
import { createSpinner } from '../../components/avatar/utils/create-image'
import { computed, ref } from 'vue-demi'
import {
  groupBy,
  sortBy,
  startCase,
  upperFirst,
  camelCase,
  kebabCase,
} from 'lodash-es'

const pascalCase = (text) => upperFirst(camelCase(text))

const showModal = ref(false)
const selected  = ref()
const size      = ref('16')

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

function getURL (icon, size = 32) {
  return new URL(`../../../packages/persona-icon/svg/${icon.folder}/${size}.svg`, import.meta.url).href
}

function showDetail (icon) {
  selected.value  = icon
  showModal.value = true
}

function download (icon) {
  const a = document.createElement('a')

  a.href     = getURL(icon, size.value)
  a.download = kebabCase(`pi-${icon.folder}-${size.value}`)

  a.click()
}
</script>

<style lang="postcss">
#modal-icon {
  li.nav__item {
    @apply my-0;
  }

  div[class*='language-'] {
    @apply my-0;
  }
}
</style>

# Collections

> List of **{{ meta.length }}** icons

<p-input placeholder="Search..." v-model="keyword" clearable />

<template v-if="Object.values(icons).length > 0">
  <template v-for="(items, category) in icons" :key="category">
    <h3 class="capitalize">{{ category }}</h3>
    <div class="grid grid-cols-2 gap-4 mt-8 md:grid-cols-4">
      <template v-for="icon in items" :key="icon.folder">
        <p-button
          class="flex flex-col items-center justify-center"
          size="lg"
          @click="showDetail(icon)">
          <client-only>
            <template #placeholder>
              <img width="32" height="32" :src="createSpinner(32)" />
            </template>
            <img class="dark:invert" width="32" height="32" :src="getURL(icon)" />
          </client-only>
          <p-text variant="caption" class="text-center">
            {{ icon.folder }}
          </p-text>
        </p-button>
      </template>
    </div>
  </template>
</template>
<template v-else>
  <p class="text-center">
    There are no icon to show
  </p>
</template>

<p-modal
  id="modal-icon"
  v-model="showModal"
  :title="startCase(selected?.folder)"
  centered>
  <template v-if="selected">
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div
        class="flex items-center justify-center p-4 border border-default-alpha dark:border-dark-default-alpha">
        <img
          class="scale-[5] dark:invert"
          :width="size"
          :height="size"
          :src="getURL(selected, size)" />
      </div>
      <div class="flex flex-col">
        <p-form-group
          class="col-span-2"
          label="Name">
          <div class="space-gap-1">
            <p-label>
              {{ selected.folder }}
            </p-label>
            <p-label v-for="alias in selected.aliases">
              {{ alias }}
            </p-label>
          </div>
        </p-form-group>
        <p-form-group label="Category">
          <div>
            <p-label>{{ selected.category }}</p-label>
          </div>
        </p-form-group>
        <p-form-group label="Size">
          <div class="flex space-x-4">
            <p-select
              class="w-36"
              v-model="size"
              :options="['16', '20', '24', '32']" />
          </div>
        </p-form-group>
        <div>
          <p-button
            class="w-36"
            @click="download(selected)">
            <PiDownload16 />
            Get SVG
          </p-button>
        </div>
      </div>
    </div>

<p-tabs variant="lines">
<p-tab title="Vue">

```vue-vue
<template>
  <{{ kebabCase(`pi-${selected.folder}-${size}`) }} />
</template>

<script lang="ts" setup>
  import {{ pascalCase(`pi-${selected.folder}-${size}`) }} from '@privyid/persona-icon/vue/{{ selected.folder }}/{{ size }}.vue'
</script>
```

</p-tab>
<p-tab title="Fonticon">

```vue-vue
<template>
  <i class="{{ kebabCase(`pi-${selected.folder}-${size}`) }}" />
</template>
```
</p-tab>
<p-tab title="SVG">

```vue-vue
<template>
  <img class="dark:invert" :src="{{ pascalCase(`icon-${selected.folder}-${size}`) }}" />
</template>

<script lang="ts" setup>
  import {{ pascalCase(`icon-${selected.folder}-32`) }} from '@privyid/persona-icon/svg/{{ selected.folder }}/{{ size }}.svg'
</script>
```

</p-tab>
<p-tab title="CDN">

```txt-vue
https://unpkg.com/@privyid/persona-icon/svg/{{ selected.folder }}/{{ size }}.svg
```

</p-tab>
</p-tabs>

  </template>
</p-modal>
