---
layout: false
---

<script setup>
  import pButton from '../components/button/Button.vue'
  import pPdfViewer from '../components/pdf-viewer/PdfViewer.vue'
  import pDropzone from '../components/dropzone/Dropzone.vue'
  import pSpread from '../components/spread/Spread.vue'
  import pHeading from '../components/heading/Heading.vue'
  import pCaption from '../components/caption/Caption.vue'
  import { showOverlay, hideOverlay } from '../components/overlay'
  import IconFile from '@privyid/persona-icon/vue/document-filled/32.vue'
  import IconImage from '@privyid/persona-icon/vue/image/32.vue'
  import { usePreview } from '../components/cropper/utils/use-preview'
  import { optimizePDF } from '@privyid/ghoulscript'
  import {
    ref,
    watch,
    watchEffect,
    computed,
  } from 'vue-demi'

  const input  = ref()
  const output = ref()

  const inputViewer  = ref()
  const outputViewer = ref()

  const inputUrl  = usePreview(input)
  const outputUrl = usePreview(output)

  const scale = ref()

  const diff = computed(() => {
    if (input.value && output.value) {
      return Math.round((output.value.size - input.value.size) / input.value.size * 100)
    }
  })

  watch(input, async (value) => {
    if (value) {
      try {
        showOverlay()

        const result = await optimizePDF(value)
        const name   = input.value.name.replace('.pdf', '.compressed.pdf')

        output.value = new File([result], name, { type: 'application/pdf' })
      } finally {
        hideOverlay()
      }
    }
  })

  watchEffect((onCleanup) => {
    const inputContainer  = inputViewer.value?.container
    const outputContainer = outputViewer.value?.container

    if (inputContainer && outputContainer) {
      const onInputScroll  = () => syncScroll(inputContainer, outputContainer)
      const onOutputScroll = () => syncScroll(outputContainer, inputContainer)

      inputContainer.addEventListener('scroll', onInputScroll, { passive: true })
      outputContainer.addEventListener('scroll', onOutputScroll, { passive: true })

      onCleanup(() => {
        inputContainer.removeEventListener('scroll', onInputScroll)
        outputContainer.removeEventListener('scroll', onOutputScroll)
      })
    }
  })

  function syncScroll (source, target) {
    target.scrollLeft = source.scrollLeft
    target.scrollTop  = source.scrollTop
  }

  function bytes (bytes, decimal = 2, k = 1024) {
    if (bytes === 0)
      return '0 Bytes'

    const sizes = [
      `${bytes > 1 ? 'Bytes' : 'Byte'}`,
      'KB',
      'MB',
      'GB',
      'TB',
      'PB',
      'EB',
      'ZB',
      'YB',
    ]

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(decimal))} ${sizes[i]}`
  }

  function close () {
    input.value  = undefined
    output.value = undefined
  }
</script>

<div class="flex w-full min-h-screen">
  <div
    v-if="!output"
    class="flex items-center justify-center w-full min-h-screen">
    <div class="w-1/3 p-6 text-center">
      <div class="mb-4">
        <p-heading element="h3">
          PDF Optimizer
        </p-heading>
      </div>
      <p-dropzone v-model="input" accept="application/pdf">
        <template #default="{ isDragover, isHovered, model, browse }">
          <div class="flex flex-col items-center justify-center w-full p-6 space-y-3 border-2 border-dashed rounded aspect-video "
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
                <a class="text-info hover:underline" href="#" @click.prevent="browse">Browse</a>
              </template>
              <template v-else>
                {{ model.name }}
              </template>
            </p-heading>
          </div>
        </template>
      </p-dropzone>
      <p-caption class="my-4">
        Powered by: <a href="https://github.com/privy-open-source/ghoulscript" target="_blank"><b>Ghoulscript</b></a>
      </p-caption>
    </div>
  </div>
  <template v-else>
    <div class="w-full border">
      <p-pdf-viewer v-model:scale="scale" ref="inputViewer" :src="inputUrl" layout="fit">
        <template #header>
          <div class="flex p-2">
            <div class="flex-grow">
              Original Size:&nbsp;<b>{{ bytes(input.size) }}</b>&nbsp;
            </div>
            <p-button size="xs" @click="close">
              Close
            </p-button>
          </div>
        </template>
      </p-pdf-viewer>
    </div>
    <div class="w-full border">
      <p-pdf-viewer v-model:scale="scale" ref="outputViewer" :src="outputUrl" layout="fit">
        <template #header>
          <div class="flex p-2">
            <div class="flex-grow">
              Result Size:&nbsp;<b>{{ bytes(output.size) }}</b>&nbsp;
              <span :class="diff < 0 ? 'text-green-50' : 'text-red-50'"> ({{ diff }}%)</span>
            </div>
            <p-button
              :href="outputUrl"
              :download="output.name"
              color="info"
              size="xs">
              Download Result
            </p-button>
          </div>
        </template>
      </p-pdf-viewer>
    </div>
  </template>
</div>
