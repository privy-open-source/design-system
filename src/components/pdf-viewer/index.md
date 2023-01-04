<script setup>
  import pPdfViewer from './PdfViewer.vue'
  import pPdfObject from '../pdf-object/PdfObject.vue'
  import pPdfObjectText from '../pdf-object-text/PdfObjectText.vue'
  import FILE from './assets/Calibrator-v3.pdf?url'
  import FILE2 from './assets/sample.pdf?url'
  import { reactive, ref } from 'vue-demi'
  import { delay } from 'nanodelay'

  const src   = ref(FILE)
  const items = reactive([
    {
      _key  : Symbol('ObjectId'),
      text  : '',
      page  : 6,
      x     : 0,
      y     : 0,
      width : 198,
      height: 106,
      fixed : false,
    },
    {
      _key  : Symbol('ObjectId'),
      text  : '',
      page  : 6,
      x     : 596,
      y     : 0,
      width : 198,
      height: 106,
      fixed : false,
    },
    {
      _key  : Symbol('ObjectId'),
      text  : '',
      page  : 6,
      x     : 0,
      y     : 1017.333,
      width : 198,
      height: 106,
      fixed : false,
    },
    {
      _key  : Symbol('ObjectId'),
      text  : '',
      page  : 6,
      x     : 596,
      y     : 1017.333,
      width : 198,
      height: 106,
      fixed : false,
    },
    {
      _key  : Symbol('ObjectId'),
      text  : '',
      page  : 10,
      x     : 50,
      y     : 100,
      width : 99,
      height: 53,
      fixed : false,
    },
    {
      _key  : Symbol('ObjectId'),
      text  : '',
      page  : 10,
      x     : 50,
      y     : 250,
      width : 53,
      height: 53,
      fixed : false,
    },
    {
      _key  : Symbol('ObjectId'),
      text  : '',
      page  : 10,
      x     : 400,
      y     : 400,
      width : 118.79,
      height: 118.79,
      fixed : false,
    },
    {
      _key  : Symbol('ObjectId'),
      text  : '',
      page  : 10,
      x     : 50,
      y     : 700,
      width : 396,
      height: 212,
      fixed : false,
    },
    {
      _key  : Symbol('ObjectId'),
      text  : '',
      page  : 10,
      x     : 500,
      y     : 700,
      width : 212,
      height: 212,
      fixed : false,
    },
    {
      _key  : Symbol('ObjectId'),
      text  : '',
      page  : 11,
      x     : 48,
      y     : 974,
      width : 100,
      height: 100,
      fixed : false,
    },
    {
      _key  : Symbol('ObjectId'),
      text  : '',
      page  : 11,
      x     : 645,
      y     : 974,
      width : 100,
      height: 100,
      fixed : false,
    },
  ])

  function toggle () {
    src.value = src.value === FILE
      ? FILE2
      : FILE
  }

  async function add () {
    items.push({
      _key  : Symbol('ObjectId'),
      text  : '',
      page  : undefined,
      x     : undefined,
      y     : undefined,
      width : 198,
      height: 106,
      fixed : false,
    })
  }
</script>

# PDF Viewer

## Usage

### Simple Usage

<preview>
  <p-pdf-viewer :src="src" layout="fit" :offset-top="72">
    <template #navbar>
      <button @click="toggle">NGanu</button>
      <button @click="add">Add ({{ items.length }})</button>
    </template>
    <p-pdf-object-text
      v-for="item in items"
      :key="item.key"
      v-model:text="item.text"
      v-model:page="item.page"
      v-model:width="item.width"
      v-model:height="item.height"
      v-model:x="item.x"
      v-model:y="item.y"
    >
      <img
        class="w-full h-full"
        :width="item.width"
        :height="item.height"
        :src="`https://via.placeholder.com/${Math.round(item.width)}x${Math.round(item.height)}/77AB59/fff`" />
    </p-pdf-object-text>
  </p-pdf-viewer>
</preview>
