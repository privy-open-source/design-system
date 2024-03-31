---
title: Collections · Icons
---

<script setup>
  import meta from '@privyid/persona-icon/svg/meta.json'
  import PiDownload16 from '@privyid/persona-icon/vue/download/16.vue'
  import pButton from '../../../components/button/Button.vue'
  import pText from '../../../components/text/Text.vue'
  import pInput from '../../../components/input/Input.vue'
  import pTabs from '../../../components/tabs/Tabs.vue'
  import pTab from '../../../components/tabs/Tab.vue'
  import pModal from '../../../components/modal/Modal.vue'
  import pSelect from '../../../components/select/Select.vue'
  import pFormGroup from '../../../components/form-group/FormGroup.vue'
  import pLabel from '../../../components/label/Label.vue'
  import { computed, ref } from 'vue-demi'
  import { useData } from 'vitepress'
  import {
    startCase,
    upperFirst,
    camelCase,
    kebabCase,
  } from 'lodash-es'

  const pascalCase = (text) => upperFirst(camelCase(text))

  const { params } = useData()
  const selected   = ref(meta.find(i => i.folder === params.value.name))
  const size       = ref('16')

  function getURL (icon, size = 32) {
    return new URL(`../../../../packages/persona-icon/svg/${icon.folder}/${size}.svg`, import.meta.url).href
  }
</script>

# {{ startCase($params.name) }}

---

<template v-if="selected">
  <div class="grid grid-cols-2 gap-4 my-4">
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

