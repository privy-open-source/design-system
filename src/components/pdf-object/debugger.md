---
layout: false
footer: false
---

<script setup>
  import pButton from '../button/Button.vue'
  import pPdfViewer from '../pdf-viewer/PdfViewer.vue'
  import pPdfObject from './PdfObject.vue'
  import pPdfObjectAddon from './PdfObjectAddon.vue'
  import pDropzone from '../dropzone/Dropzone.vue'
  import IconClose from '@privyid/persona-icon/vue/close/16.vue'
  import { usePreview } from '../cropper/utils/use-preview'
  import { reactive, ref } from 'vue-demi'
  import { withBase } from 'vitepress'

  const scale = ref(1)
  const file  = ref()
  const items = reactive([])
  const src   = usePreview(file, withBase('/assets/pdf/Calibrator-v3.pdf'))

  function add (width = 198, height = 106) {
    items.push({
      _key  : Symbol('ObjectId'),
      text  : '',
      page  : undefined,
      x     : undefined,
      y     : undefined,
      width : width,
      height: height,
      fixed : false,
    })
  }

  function remove (index) {
    items.splice(index, 1)
  }
</script>

<div class="flex w-full h-full">
  <p-pdf-viewer
    layout="fit"
    :src="src"
    v-model:scale="scale">
    <template #header>
      <div class="flex p-1">
        <p-dropzone accept="application/pdf" v-model="file">
          <template #default="{ browse }">
            <p-button @click="browse" color="primary">
              Open Doc
            </p-button>
          </template>
        </p-dropzone>
        <div class="flex space-x-2 shrink-0">
          <p-button @click="add(198, 106)">
            Add Signature
          </p-button>
          <p-button @click="add(118.79, 118.79)">
            Add E-Metere
          </p-button>
          <p-button @click="add(106, 106)">
            Add Seal
          </p-button>
        </div>
      </div>
    </template>
    <p-pdf-object
      v-for="(item, i) in items"
      :key="item.key"
      v-model:text="item.text"
      v-model:page="item.page"
      v-model:width="item.width"
      v-model:height="item.height"
      v-model:x="item.x"
      v-model:y="item.y"
      debug
    >
      <img
        class="w-full h-full"
        :width="item.width"
        :height="item.height"
        :src="`https://via.placeholder.com/${Math.round(item.width)}x${Math.round(item.height)}/77AB59/fff`" />
      <p-pdf-object-addon>
        <p-button size="sm" icon color="danger" @click="remove(i)">
          <IconClose />
        </p-button>
      </p-pdf-object-addon>
    </p-pdf-object>
  </p-pdf-viewer>
</div>
