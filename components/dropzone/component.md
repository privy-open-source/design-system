<script setup>
  import Dropzone from './Dropzone.vue'
  import Heading from '../heading/Heading.vue'
  import Caption from '../caption/Caption.vue'
  import Spread from '../spread/Spread.vue'
  import IconFile from '@carbon/icons-vue/lib/document/32'
  import IconImage from '@carbon/icons-vue/lib/image/32'
</script>

<style lang="postcss">
  .preview .h5 {
    @apply mt-0;
  }
</style>

# Dropzone

Headless component for Drag'n'Drop or Upload files.

## Usage

### Upload Document

<preview class="flex-col items-stretch">
  <Dropzone accept="application/pdf">
    <template #default="{ isDragover, model, browse }">
      <div class="flex flex-col items-center justify-center w-full gap-3 p-5 border-2 border-dashed rounded"
        :class="[isDragover ? 'bg-primary-5 border-primary-100' : 'bg-background-100 border-secondary-25']">
        <Spread :active="isDragover">
          <IconFile class="w-16 h-16 mt-5 fill-primary-100" />
        </Spread>
        <Heading element="h5">
          Upload Document
        </Heading>
        <Heading element="h6">
          <template v-if="!model">
            Drag your document here or click
            <a href="#" @click.prevent="browse">Browse</a>
          </template>
          <template v-else>
            {{ model.name }}
          </template>
        </Heading>
        <Caption bold>PDF, DOC & DOCX up to 25MB each</Caption>
        <Caption>10 documents max for multiple upload</Caption>
        <Caption class="mt-16 text-sm">PDF file format is recommended for a faster uploading process.</Caption>
      </div>
    </template>
  </Dropzone>
</preview>

```vue
<template class="flex-col items-stretch">
  <Dropzone accept="application/pdf">
    <template #default="{ isDragover, model, browse }">
      <div class="flex flex-col items-center justify-center w-full gap-3 p-5 border-2 border-dashed rounded "
        :class="[isDragover ? 'bg-primary-5 border-primary-100' : 'bg-background-100 border-secondary-25']">
        <Spread :active="isDragover">
          <IconFile class="w-16 h-16 mt-5 fill-primary-100" />
        </Spread>
        <Heading element="h5">
          Upload Document
        </Heading>
        <Heading element="h6">
          <template v-if="!model">
            Drag your document here or click
            <a href="#" @click.prevent="browse">Browse</a>
          </template>
          <template v-else>
            {{ model.name }}
          </template>
        </Heading>
        <Caption bold>PDF, DOC & DOCX up to 25MB each</Caption>
        <Caption>10 documents max for multiple upload</Caption>
        <Caption class="mt-16 text-sm">PDF file format is recommended for a faster uploading process.</Caption>
      </div>
    </template>
  </Dropzone>
</template>

```

### Add Photo

<preview class="flex-col items-stretch">
  <Dropzone accept="image/*">
    <template #default="{ isDragover, isHovered, model, browse }">
      <div class="flex flex-col items-center justify-center w-full gap-3 p-5 border-2 border-dashed rounded "
        :class="[isDragover ? 'bg-primary-5 border-primary-100' : 'bg-background-100 border-secondary-25']">
        <Spread :active="isDragover || isHovered">
          <IconImage class="w-16 h-16 mt-5 fill-primary-100" />
        </Spread>
        <Heading element="h5">
          Add Photo
        </Heading>
        <Heading element="h6">
          <template v-if="!model">
            Drag your document here or click
            <a href="#" @click.prevent="browse">Browse</a>
          </template>
          <template v-else>
            {{ model.name }}
          </template>
        </Heading>
        <Caption bold>JPG & PNG up to 5MB</Caption>
      </div>
    </template>
  </Dropzone>
</preview>

```vue
<template class="flex-col items-stretch">
  <Dropzone accept="image/*">
    <template #default="{ isDragover, model, browse }">
      <div class="flex flex-col items-center justify-center w-full gap-3 p-5 border-2 border-dashed rounded "
        :class="[isDragover ? 'bg-primary-5 border-primary-100' : 'bg-background-100 border-secondary-25']">
        <Spread :active="isDragover">
          <IconImage class="w-16 h-16 mt-5 fill-primary-100" />
        </Spread>
        <Heading element="h5">
          Add Photo
        </Heading>
        <Heading element="h6">
          <template v-if="!model">
            Drag your document here or click
            <a href="#" @click.prevent="browse">Browse</a>
          </template>
          <template v-else>
            {{ model.name }}
          </template>
        </Heading>
        <Caption bold>JPG & PNG up to 5MB</Caption>
      </div>
    </template>
  </Dropzone>
</template>

```
