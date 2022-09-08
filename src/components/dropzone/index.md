<script setup>
  import pDropzone from './Dropzone.vue'
  import pHeading from '../heading/Heading.vue'
  import pCaption from '../caption/Caption.vue'
  import pSpread from '../spread/Spread.vue'
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
  <p-dropzone accept="application/pdf">
    <template #default="{ isDragover, isHovered, model, browse }">
      <div class="flex flex-col items-center justify-center w-full gap-3 p-5 border-2 border-dashed rounded"
        :class="[isDragover ? 'bg-primary-5 border-primary-100' : 'bg-background-100 border-secondary-25']">
        <p-spread :active="isDragover || isHovered">
          <IconFile class="w-16 h-16 mt-5 fill-primary-100" />
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
        <p-caption bold>PDF, DOC & DOCX up to 25MB each</p-caption>
        <p-caption>10 documents max for multiple upload</p-caption>
        <p-caption class="mt-16 text-sm">PDF file format is recommended for a faster uploading process.</p-caption>
      </div>
    </template>
  </p-dropzone>
</preview>

```vue
<template class="flex-col items-stretch">
  <p-dropzone accept="application/pdf">
    <template #default="{ isDragover, isHovered, model, browse }">
      <div class="flex flex-col items-center justify-center w-full gap-3 p-5 border-2 border-dashed rounded "
        :class="[isDragover ? 'bg-primary-5 border-primary-100' : 'bg-background-100 border-secondary-25']">
        <p-spread :active="isDragover || isHovered">
          <IconFile class="w-16 h-16 mt-5 fill-primary-100" />
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
        <p-caption bold>PDF, DOC & DOCX up to 25MB each</p-caption>
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
      <div class="flex flex-col items-center justify-center w-full gap-3 p-5 border-2 border-dashed rounded "
        :class="[isDragover ? 'bg-primary-5 border-primary-100' : 'bg-background-100 border-secondary-25']">
        <p-spread :active="isDragover || isHovered">
          <IconImage class="w-16 h-16 mt-5 fill-primary-100" />
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
        <p-caption bold>JPG & PNG up to 5MB</p-caption>
      </div>
    </template>
  </p-dropzone>
</preview>

```vue
<template class="flex-col items-stretch">
  <p-dropzone accept="image/*">
    <template #default="{ isDragover, isHovered, model, browse }">
      <div class="flex flex-col items-center justify-center w-full gap-3 p-5 border-2 border-dashed rounded "
        :class="[isDragover ? 'bg-primary-5 border-primary-100' : 'bg-background-100 border-secondary-25']">
        <p-spread :active="isDragover || isHovered">
          <IconImage class="w-16 h-16 mt-5 fill-primary-100" />
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
        <p-caption bold>JPG & PNG up to 5MB</p-caption>
      </div>
    </template>
  </p-dropzone>
</template>

```
