---
layout: false
---

<script setup>
  import pButton from '../components/button/Button.vue'
  import pPdfViewer from '../components/pdf-viewer/PdfViewer.vue'
  import pPdfObject from '../components/pdf-object/PdfObject.vue'
  import pPdfObjectAddon from '../components/pdf-object/PdfObjectAddon.vue'
  import pDropzone from '../components/dropzone/Dropzone.vue'
  import pCheckbox from '../components/checkbox/Checkbox.vue'
  import pSheet from '../components/sheet/Sheet.vue'
  import pFormGroup from '../components/form-group/FormGroup.vue'
  import pInput from '../components/input/Input.vue'
  import IconClose from '@privyid/persona-icon/vue/close/16.vue'
  import IconEdit from '@privyid/persona-icon/vue/edit/16.vue'
  import { usePreview } from '../components/cropper/utils/use-preview'
  import { reactive, ref } from 'vue-demi'
  import { withBase } from 'vitepress'

  const scale           = ref(1)
  const file            = ref()
  const debug           = ref(false)
  const debugAnnotation = ref(false)
  const src             = usePreview(file, withBase('/assets/pdf/Calibrator-v3.pdf'))

  const items  = reactive([])
  const item   = ref()
  const isEdit = ref(false)


  function createText (text, width, height, bgColor, textColor) {
    return `data:image/svg+xml,<svg height="${height}" width="${width}" xmlns="http://www.w3.org/2000/svg"><rect fill="${encodeURIComponent(bgColor)}" x="0" y="0" height="${height}" width="${width}"></rect><text fill="${encodeURIComponent(textColor)}" dominant-baseline="central" text-anchor="middle" x="50%" y="50%" font-family="sans-serif" font-weight="600">${encodeURIComponent(text)}</text></svg>`
  }

  function add (width = 198, height = 106) {
    items.push({
      _key     : Symbol('ObjectId'),
      src      : createText(`${width}x${height}`, width, height, '#77AB59', '#ffffff'),
      page     : undefined,
      x        : undefined,
      y        : undefined,
      width    : width,
      height   : height,
      resizable: true,
      moveable : true,
    })
  }

  function remove (index) {
    items.splice(index, 1)
  }

  function edit (index) {
    isEdit.value = true
    item.value   = { ...items[index] }
  }

  function save () {
    const index = items.findIndex((i) => i._key === item.value._key)

    if (index > -1) {
      Object.assign(items[index], item.value)

      isEdit.value = false
      item.value   = undefined
    }
  }
</script>

<style lang="postcss">
  .pdf-viewer--debug .annotationLayer > section {
    @apply pointer-events-auto border-2 border-dashed border-info-emphasis bg-info-emphasis/5;
    @apply dark:border-dark-info-emphasis dark:bg-info-emphasis/5;
  }
</style>

<div class="flex w-full h-full">
  <p-pdf-viewer
    layout="fit"
    :class="{ 'pdf-viewer--debug': debugAnnotation }"
    :src="src"
    v-model:scale="scale">
    <template #header>
      <div class="flex flex-col gap-2 p-2 md:flex-row md:items-center">
        <p-dropzone accept="application/pdf" v-model="file">
          <template #default="{ browse }">
            <p-button @click="browse" color="info">
              Open Doc
            </p-button>
          </template>
        </p-dropzone>
        <div class="flex items-center px-2 space-x-4 shrink-0">
          <p-checkbox v-model="debug">
            Show Debug
          </p-checkbox>
          <p-checkbox v-model="debugAnnotation">
            Show Annotation Area
          </p-checkbox>
        </div>
        <div class="flex flex-wrap gap-2 shrink-0 md:flex-nowrap">
          <p-button @click="add(198, 106)">
            Add Signature
          </p-button>
          <p-button @click="add(118.79, 118.79, false)">
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
      :resizable="item.resizable"
      :moveable="item.moveable"
      :debug="debug"
      autofocus
    >
      <img
        class="w-full h-full"
        :width="item.width"
        :height="item.height"
        :src="item.src" />
      <p-pdf-object-addon class="space-y-1">
        <p-button size="sm" icon color="danger" @click="remove(i)">
          <IconClose />
        </p-button>
        <p-button size="sm" icon color="info" @click="edit(i)">
          <IconEdit />
        </p-button>
      </p-pdf-object-addon>
    </p-pdf-object>
  </p-pdf-viewer>
  <p-sheet position="right" v-model="isEdit" style="--p-sheet-size: 400px">
    <div class="flex flex-col h-full p-4">
      <h3 class="mb-6 text-lg font-bold">
        Edit Object
      </h3>
      <div class="flex-grow">
        <p-form-group label="Page">
          <p-input v-model="item.page"/>
        </p-form-group>
        <p-form-group label="Pos X">
          <p-input v-model="item.x"/>
        </p-form-group>
        <p-form-group label="Pos Y">
          <p-input v-model="item.y"/>
        </p-form-group>
        <p-form-group label="Width">
          <p-input v-model="item.width"/>
        </p-form-group>
        <p-form-group label="Height">
          <p-input v-model="item.height"/>
        </p-form-group>
      </div>
      <div class="flex flex-shrink-0">
        <p-button color="info" class="flex-grow" @click="save()">
          Save
        </p-button>
      </div>
    </div>
  </p-sheet>
</div>
