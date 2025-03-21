---
title: Dropzone · Components
description: Headless component for Drag'n'Drop Files Upload.
---

<script setup>
  import pDropzone from './Dropzone.vue'
  import pHeading from '../heading/Heading.vue'
  import pCaption from '../caption/Caption.vue'
  import pSpread from '../spread/Spread.vue'
  import IconFile from '@privyid/persona-icon/vue/document-filled/32.vue'
  import IconImage from '@privyid/persona-icon/vue/image/32.vue'
  import { ref } from 'vue-demi'

  const result  = ref()
  const result2 = ref()
</script>

<style scoped lang="postcss">
  .preview {
    a {
      --p-color-info-hover: darken(theme(textColor.info.DEFAULT), 5%);
      --p-color-dark-info-hover: darken(theme(textColor.dark.info.DEFAULT), 5%);
      @apply underline text-info dark:text-dark-info hover:text-[color:var(--p-color-info-hover)] hover:dark:text-[color:var(--p-color-dark-info-hover)];
    }
  }
</style>

# Dropzone

> Headless component for Drag'n'Drop Files Upload.

## Usage

### Upload Document

<preview class="flex-col items-stretch">
  <p-dropzone accept="application/pdf">
    <template #default="{ isDragover, isHovered, model, browse }">
      <div class="flex flex-col items-center justify-center w-full p-5 space-y-3 border-2 border-dashed rounded"
        :class="[isDragover ? 'bg-info dark:bg-dark-info border-info-emphasis dark:border-dark-info-emphasis' : 'bg-default dark:bg-dark-default border-default dark:border-dark-default']">
        <p-spread :active="isDragover || isHovered">
          <IconFile class="w-16 h-16 mt-5 fill-info-emphasis dark:fill-dark-info-emphasis" />
        </p-spread>
        <p-heading element="h5">
          Upload Document
        </p-heading>
        <p-heading element="h6">
          <template v-if="!model">
            Drag your document here or click
            <a href="#" @click.prevent="browse">Browse</a>
          </template>
          <template v-else>
            {{ model.name }}
          </template>
        </p-heading>
        <p-caption weight="bold">PDF, DOC & DOCX up to 25MB each</p-caption>
        <p-caption>10 documents max for multiple upload</p-caption>
        <p-caption class="mt-16">PDF file format is recommended for a faster uploading process.</p-caption>
      </div>
    </template>
  </p-dropzone>
</preview>

```vue
<template>
  <p-dropzone accept="application/pdf">
    <template #default="{ isDragover, isHovered, model, browse }">
      <div class="flex flex-col items-center justify-center w-full p-5 space-y-3 border-2 border-dashed rounded "
        :class="[isDragover ? 'bg-info dark:bg-dark-info border-info-emphasis dark:border-dark-info-emphasis' : 'bg-default dark:bg-dark-default border-default dark:border-dark-default']">
        <p-spread :active="isDragover || isHovered">
          <IconFile class="w-16 h-16 mt-5 fill-info-emphasis dark:fill-dark-info-emphasis" />
        </p-spread>
        <p-heading element="h5">
          Upload Document
        </p-heading>
        <p-heading element="h6">
          <template v-if="!model">
            Drag your document here or click
            <a href="#" @click.prevent="browse">Browse</a>
          </template>
          <template v-else>
            {{ model.name }}
          </template>
        </p-heading>
        <p-caption weight="bold">PDF, DOC & DOCX up to 25MB each</p-caption>
        <p-caption>10 documents max for multiple upload</p-caption>
        <p-caption class="mt-16 text-sm">PDF file format is recommended for a faster uploading process.</p-caption>
      </div>
    </template>
  </p-dropzone>
</template>
```

### Add Photo

<preview class="flex-col items-stretch">
  <p-dropzone accept="image/*">
    <template #default="{ isDragover, isHovered, model, browse }">
      <div class="flex flex-col items-center justify-center w-full p-5 space-y-3 border-2 border-dashed rounded "
        :class="[isDragover ? 'bg-info dark:bg-dark-info border-info-emphasis dark:border-dark-info-emphasis' : 'bg-default dark:bg-dark-default border-default dark:border-dark-default']">
        <p-spread :active="isDragover || isHovered">
          <IconImage class="w-16 h-16 mt-5 fill-info-emphasis dark:fill-dark-info-emphasis" />
        </p-spread>
        <p-heading element="h5">
          Add Photo
        </p-heading>
        <p-heading element="h6">
          <template v-if="!model">
            Drag your document here or click
            <a href="#" @click.prevent="browse">Browse</a>
          </template>
          <template v-else>
            {{ model.name }}
          </template>
        </p-heading>
        <p-caption weight="bold">JPG & PNG up to 5MB</p-caption>
      </div>
    </template>
  </p-dropzone>
</preview>

```vue
<template>
  <p-dropzone accept="image/*">
    <template #default="{ isDragover, isHovered, model, browse }">
      <div class="flex flex-col items-center justify-center w-full p-5 space-y-3 border-2 border-dashed rounded "
        :class="[isDragover ? 'bg-info dark:bg-dark-info border-info-emphasis dark:border-dark-info-emphasis' : 'bg-default dark:bg-dark-default border-default dark:border-dark-default']">
        <p-spread :active="isDragover || isHovered">
          <IconImage class="w-16 h-16 mt-5 fill-info-emphasis dark:fill-dark-info-emphasis" />
        </p-spread>
        <p-heading element="h5">
          Add Photo
        </p-heading>
        <p-heading element="h6">
          <template v-if="!model">
            Drag your document here or click
            <a href="#" @click.prevent="browse">Browse</a>
          </template>
          <template v-else>
            {{ model.name }}
          </template>
        </p-heading>
        <p-caption weight="bold">JPG & PNG up to 5MB</p-caption>
      </div>
    </template>
  </p-dropzone>
</template>

```

## Multiple upload

Add prop `multiple` to enable multi-selected upload.

<preview class="flex-col items-stretch">
  <p-dropzone accept="image/*" multiple maxlength="5">
    <template #default="{ isDragover, isHovered, model, browse }">
      <div class="flex flex-col items-center justify-center w-full p-5 space-y-3 border-2 border-dashed rounded "
        :class="[isDragover ? 'bg-info dark:bg-dark-info border-info-emphasis dark:border-dark-info-emphasis' : 'bg-default dark:bg-dark-default border-default dark:border-dark-default']">
        <p-spread :active="isDragover || isHovered">
          <IconImage class="w-16 h-16 mt-5 fill-info-emphasis dark:fill-dark-info-emphasis" />
        </p-spread>
        <p-heading element="h5">
          Add Photo
        </p-heading>
        <p-heading element="h6">
          <template v-if="!model">
            Drag your document here or click
            <a href="#" @click.prevent="browse">Browse</a>
          </template>
          <template v-else>
            <ol>
              <li v-for="file in model">
                {{ file.name }}
              </li>
            </ol>
          </template>
        </p-heading>
        <p-caption weight="bold">JPG & PNG up to 5MB</p-caption>
      </div>
    </template>
  </p-dropzone>
</preview>

```vue
<template>
  <p-dropzone accept="image/*" multiple maxlength="5">
    <template #default="{ isDragover, isHovered, model, browse }">
      <div class="flex flex-col items-center justify-center w-full p-5 space-y-3 border-2 border-dashed rounded "
        :class="[isDragover ? 'bg-info dark:bg-dark-info border-info-emphasis dark:border-dark-info-emphasis' : 'bg-default dark:bg-dark-default border-default dark:border-dark-default']">
        <p-spread :active="isDragover || isHovered">
          <IconImage class="w-16 h-16 mt-5 fill-info-emphasis dark:fill-dark-info-emphasis" />
        </p-spread>
        <p-heading element="h5">
          Add Photo
        </p-heading>
        <p-heading element="h6">
          <template v-if="!model">
            Drag your document here or click
            <a href="#" @click.prevent="browse">Browse</a>
          </template>
          <template v-else>
            <ol>
              <li v-for="file in model">
                {{ file.name }}
              </li>
            </ol>
          </template>
        </p-heading>
        <p-caption weight="bold">JPG & PNG up to 5MB</p-caption>
      </div>
    </template>
  </p-dropzone>
</template>
```

### Appending values

When user selecting the files, and then selecting again, the old list of files is replaced with new ones. Set `multiple` prop to `'append'` if you want to keep the last ones.

<preview class="flex-col items-stretch">
  <p-dropzone accept="image/*" multiple="append" maxlength="10">
    <template #default="{ isDragover, isHovered, model, browse }">
      <div class="flex flex-col items-center justify-center w-full p-5 space-y-3 border-2 border-dashed rounded "
        :class="[isDragover ? 'bg-info dark:bg-dark-info border-info-emphasis dark:border-dark-info-emphasis' : 'bg-default dark:bg-dark-default border-default dark:border-dark-default']">
        <p-spread :active="isDragover || isHovered">
          <IconImage class="w-16 h-16 mt-5 fill-info-emphasis dark:fill-dark-info-emphasis" />
        </p-spread>
        <p-heading element="h5">
          Add Photo
        </p-heading>
        <p-heading element="h6">
          <template v-if="!model">
            Drag your document here or click
            <a href="#" @click.prevent="browse">Browse</a>
          </template>
          <template v-else>
            <ol>
              <li v-for="file in model">
                {{ file.name }}
              </li>
            </ol>
          </template>
        </p-heading>
        <p-caption weight="bold">JPG & PNG up to 5MB</p-caption>
      </div>
    </template>
  </p-dropzone>
</preview>

```vue
<template>
  <p-dropzone accept="image/*" multiple="append" maxlength="10">
    <template #default="{ isDragover, isHovered, model, browse }">
      <div class="flex flex-col items-center justify-center w-full p-5 space-y-3 border-2 border-dashed rounded "
        :class="[isDragover ? 'bg-info dark:bg-dark-info border-info-emphasis dark:border-dark-info-emphasis' : 'bg-default dark:bg-dark-default border-default dark:border-dark-default']">
        <p-spread :active="isDragover || isHovered">
          <IconImage class="w-16 h-16 mt-5 fill-info-emphasis dark:fill-dark-info-emphasis" />
        </p-spread>
        <p-heading element="h5">
          Add Photo
        </p-heading>
        <p-heading element="h6">
          <template v-if="!model">
            Drag your document here or click
            <a href="#" @click.prevent="browse">Browse</a>
          </template>
          <template v-else>
            <ol>
              <li v-for="file in model">
                {{ file.name }}
              </li>
            </ol>
          </template>
        </p-heading>
        <p-caption weight="bold">JPG & PNG up to 5MB</p-caption>
      </div>
    </template>
  </p-dropzone>
</template>
```

## Binding v-model

<preview class="flex-col items-stretch">
  <p-dropzone accept="image/*" v-model="result">
    <template #default="{ isDragover, isHovered, model, browse }">
      <div class="flex flex-col items-center justify-center w-full p-5 space-y-3 border-2 border-dashed rounded "
        :class="[isDragover ? 'bg-info dark:bg-dark-info border-info-emphasis dark:border-dark-info-emphasis' : 'bg-default dark:bg-dark-default border-default dark:border-dark-default']">
        <p-spread :active="isDragover || isHovered">
          <IconImage class="w-16 h-16 mt-5 fill-info-emphasis dark:fill-dark-info-emphasis" />
        </p-spread>
        <p-heading element="h5">
          Add Photo
        </p-heading>
        <p-heading element="h6">
          <template v-if="!model">
            Drag your document here or click
            <a href="#" @click.prevent="browse">Browse</a>
          </template>
          <template v-else>
            {{ model.name }}
          </template>
        </p-heading>
        <p-caption weight="bold">JPG & PNG up to 5MB</p-caption>
      </div>
    </template>
  </p-dropzone>
</preview>

**result:**

<pre class="truncate"><code>{{ result }}</code></pre>

```vue
<template class="flex-col items-stretch">
  <p-dropzone accept="image/*" v-model="result">
    <template #default="{ isDragover, isHovered, model, browse }">
      <div class="flex flex-col items-center justify-center w-full p-5 space-y-3 border-2 border-dashed rounded "
        :class="[isDragover ? 'bg-info dark:bg-dark-info border-info-emphasis dark:border-dark-info-emphasis' : 'bg-default dark:bg-dark-default border-default dark:border-dark-default']">
        <p-spread :active="isDragover || isHovered">
          <IconImage class="w-16 h-16 mt-5 fill-info-emphasis dark:fill-dark-info-emphasis" />
        </p-spread>
        <p-heading element="h5">
          Add Photo
        </p-heading>
        <p-heading element="h6">
          <template v-if="!model">
            Drag your document here or click
            <a href="#" @click.prevent="browse">Browse</a>
          </template>
          <template v-else>
            {{ model.name }}
          </template>
        </p-heading>
        <p-caption weight="bold">JPG & PNG up to 5MB</p-caption>
      </div>
    </template>
  </p-dropzone>
</template>
```

### Encode to base64

By default, this component keep v-model value as [File][file] object.
If you need [base64-dataURI][data-uri] format, you can add modifier `base64` to your `v-model`.

<preview class="flex-col items-stretch">
  <p-dropzone accept="image/*" v-model.base64="result2">
    <template #default="{ isDragover, isHovered, rawModel, browse }">
      <div class="flex flex-col items-center justify-center w-full p-5 space-y-3 border-2 border-dashed rounded "
        :class="[isDragover ? 'bg-info dark:bg-dark-info border-info-emphasis dark:border-dark-info-emphasis' : 'bg-default dark:bg-dark-default border-default dark:border-dark-default']">
        <p-spread :active="isDragover || isHovered">
          <IconImage class="w-16 h-16 mt-5 fill-info-emphasis dark:fill-dark-info-emphasis" />
        </p-spread>
        <p-heading element="h5">
          Add Photo
        </p-heading>
        <p-heading element="h6">
          <template v-if="!rawModel">
            Drag your document here or click
            <a href="#" @click.prevent="browse">Browse</a>
          </template>
          <template v-else>
            {{ rawModel.name }}
          </template>
        </p-heading>
        <p-caption weight="bold">JPG & PNG up to 5MB</p-caption>
      </div>
    </template>
  </p-dropzone>
</preview>

**result:**

<pre class="truncate"><code>{{ result2 }}</code></pre>

```vue
<template>
  <p-dropzone accept="image/*" v-model.base64="result">
    <template #default="{ isDragover, isHovered, rawModel, browse }">
      <div class="flex flex-col items-center justify-center w-full p-5 space-y-3 border-2 border-dashed rounded "
        :class="[isDragover ? 'bg-info dark:bg-dark-info border-info-emphasis dark:border-dark-info-emphasis' : 'bg-default dark:bg-dark-default border-default dark:border-dark-default']">
        <p-spread :active="isDragover || isHovered">
          <IconImage class="w-16 h-16 mt-5 fill-info-emphasis dark:fill-dark-info-emphasis" />
        </p-spread>
        <p-heading element="h5">
          Add Photo
        </p-heading>
        <p-heading element="h6">
          <template v-if="!rawModel">
            Drag your document here or click
            <a href="#" @click.prevent="browse">Browse</a>
          </template>
          <template v-else>
            {{ rawModel.name }}
          </template>
        </p-heading>
        <p-caption weight="bold">JPG & PNG up to 5MB</p-caption>
      </div>
    </template>
  </p-dropzone>
</template>
```

### Clear on cancel

By default, if you browse the file and cancel it, this component keep the last selected file as value for v-model.
If you want reset the value when canceling, use `clearOnCancel` prop to reset the value.

<preview class="flex-col items-stretch">
  <p-dropzone accept="image/*" v-model.base64="result2" clear-on-cancel>
    <template #default="{ isDragover, isHovered, rawModel, browse }">
      <div class="flex flex-col items-center justify-center w-full p-5 space-y-3 border-2 border-dashed rounded "
        :class="[isDragover ? 'bg-info dark:bg-dark-info border-info-emphasis dark:border-dark-info-emphasis' : 'bg-default dark:bg-dark-default border-default dark:border-dark-default']">
        <p-spread :active="isDragover || isHovered">
          <IconImage class="w-16 h-16 mt-5 fill-info-emphasis dark:fill-dark-info-emphasis" />
        </p-spread>
        <p-heading element="h5">
          Add Photo
        </p-heading>
        <p-heading element="h6">
          <template v-if="!rawModel">
            Drag your document here or click
            <a href="#" @click.prevent="browse">Browse</a>
          </template>
          <template v-else>
            {{ rawModel.name }}
          </template>
        </p-heading>
        <p-caption bold>JPG & PNG up to 5MB</p-caption>
      </div>
    </template>
  </p-dropzone>
</preview>

```vue
<template>
  <p-dropzone accept="image/*" v-model.base64="result2" clear-on-cancel>
    <template #default="{ isDragover, isHovered, rawModel, browse }">
      <div class="flex flex-col items-center justify-center w-full p-5 space-y-3 border-2 border-dashed rounded "
        :class="[isDragover ? 'bg-info dark:bg-dark-info border-info-emphasis dark:border-dark-info-emphasis' : 'bg-default dark:bg-dark-default border-default dark:border-dark-default']">
        <p-spread :active="isDragover || isHovered">
          <IconImage class="w-16 h-16 mt-5 fill-info-emphasis dark:fill-dark-info-emphasis" />
        </p-spread>
        <p-heading element="h5">
          Add Photo
        </p-heading>
        <p-heading element="h6">
          <template v-if="!rawModel">
            Drag your document here or click
            <a href="#" @click.prevent="browse">Browse</a>
          </template>
          <template v-else>
            {{ rawModel.name }}
          </template>
        </p-heading>
        <p-caption bold>JPG & PNG up to 5MB</p-caption>
      </div>
    </template>
  </p-dropzone>
</template>
```

## API

### Props

| Props             |              Type               | Default | Description                                                                    |
|-------------------|:-------------------------------:|:-------:|--------------------------------------------------------------------------------|
| `multiple`        |       `Boolean`, `String`       | `false` | Enable multiple mode, set to `append` to [appening values](#appending-values)  |
| `maxlength`       |            `Number`             |   `-`   | Maxlength selected files, only work on multiple mode                           |
| `accept`          |            `String`             |   `-`   | Limitting file type can be selected, see [HTML attribute: accept][attr-accept] |
| `clearOnCanel`    |            `Boolean`            | `false` | Clear v-model when user cancel the browse file                                 |
| `modelValue`      |             `File`              |   `-`   | v-model value                                                                  |
| `container-class` | `String` or `Array` or `Object` |   `-`   | CSS class to add in the dropzone container                                     |

### Slots

| Name      | Description                   |
|-----------|-------------------------------|
| `default` | Content to place for dropzone |

### Events
| Name     | Arguments | Description                           |
|----------|-----------|---------------------------------------|
| `change` | Files     | Event when value changed              |
| `cancel` | -         | Event when user cancel selecting file |

## See Also

- [Input File](/components/input-file/)

[file]: https://developer.mozilla.org/en-US/docs/Web/API/File
[data-uri]: https://en.wikipedia.org/wiki/Data_URI_scheme
[attr-accept]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
