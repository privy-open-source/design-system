---
title: Collections · Icons
description: List of all icons
---

<script setup>
import Fuse from 'fuse.js'
import meta from '@privyid/persona-ilustration/svg/meta.json'
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
const size      = ref('spot')

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

function getURL (icon, size = 'spot') {
  return new URL(`../../../packages/persona-ilustration/svg/${icon.folder}/${size}.svg`, import.meta.url).href
}

function showDetail (icon) {
  selected.value  = icon
  showModal.value = true
}

function download (icon) {
  const a = document.createElement('a')

  a.href     = getURL(icon, size.value)
  a.download = kebabCase(`pil-${icon.folder}-${size.value}`)

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

  .img__preview {
    @apply bg-[url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAGklEQVR4AWNYJYoK92ihwpGiAF0AXcMIUQAAbIfSgRmCFqkAAAAASUVORK5CYII=)];
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
              <img width="94" height="94" :src="createSpinner(94)" />
            </template>
            <img width="94" height="94" :src="getURL(icon)" />
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
    <div class="grid grid-cols-1 gap-4 mb-4">
      <div
        class="flex items-center justify-center p-4 border border-default-alpha dark:border-dark-default-alpha img__preview h-[300px]">
        <img
          :src="getURL(selected, size)" />
      </div>
      <div class="grid grid-cols-2">
        <div>
          <p-form-group
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
        </div>
        <div>
          <p-form-group label="Size">
            <div class="flex space-x-4">
              <p-select
                class="w-36"
                v-model="size"
                :options="['dot-small', 'dot-large', 'spot', 'spot-hero-small', 'spot-hero-large']" />
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
    </div>

<p-tabs variant="lines">
<p-tab title="Vue">

```vue-vue
<template>
  <{{ kebabCase(`pil-${selected.folder}-${size}`) }} />
</template>

<script lang="ts" setup>
  import {{ pascalCase(`pil-${selected.folder}-${size}`) }} from '@privyid/persona-ilustration/vue/{{ selected.folder }}/{{ size }}.vue'
</script>
```

</p-tab>
<p-tab title="SVG">

```vue-vue
<template>
  <img :src="{{ pascalCase(`img-${selected.folder}-${size}`) }}" />
</template>

<script lang="ts" setup>
  import {{ pascalCase(`img-${selected.folder}-32`) }} from '@privyid/persona-ilustration/svg/{{ selected.folder }}/{{ size }}.svg'
</script>
```

</p-tab>
<p-tab title="CDN">

**UNPKG**

```txt-vue
https://unpkg.com/@privyid/persona-ilustration/svg/{{ selected.folder }}/{{ size }}.svg
```

**JsDeliver**

```txt-vue
https://cdn.jsdelivr.net/npm/@privyid/persona-ilustration/svg/{{ selected.folder }}/{{ size }}.svg
```

</p-tab>
</p-tabs>

  </template>
</p-modal>
