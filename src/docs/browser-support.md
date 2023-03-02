<script setup>
  import { ref, onMounted } from 'vue-demi'
  import pTable from '../components/table/Table.vue'
  import pLabel from '../components/label/Label.vue'
  import { defineTable } from '../components/table'
  import { withBase } from 'vitepress'

  const fields = defineTable([
    { key: 'browser' },
    {
      key    : 'version',
      label  : 'Min Version',
      width  : 25,
      tdClass: 'text-end',
      thClass: 'text-end',
    },
  ])

  const items = ref([
    {
      browser: 'Chrome',
      icon   : 'chrome',
      version: '80',
    },
    {
      browser: 'Firefox',
      icon   : 'firefox',
      version: '102',
    },
    {
      browser: 'Edge',
      icon   : 'edge',
      version: '105',
    },
    {
      browser: 'Opera',
      icon   : 'opera',
      version: '90',
    },
    {
      browser: 'Safari',
      icon   : 'safari',
      version: '15.6',
    },
    {
      browser: 'Safari on iOS',
      icon   : 'ios_saf',
      version: '14.0',
    },
    {
      browser: 'Samsung Internet',
      icon   : 'samsung',
      version: '17.0',
    },
    {
      browser: 'Opera Mobile',
      icon   : 'op_mob',
      version: '64',
    },
    {
      browser: 'Android Browser',
      icon   : 'android',
      version: '107',
    },
    {
      browser: 'UC Browser',
      icon   : 'and_uc',
      version: '13.4',
    },
    {
      browser: 'QQ Browser',
      icon   : 'and_qq',
      version: '13.1',
    },
  ])
</script>

# Browser Support
> Browser Compability and recommendation

We try our best to support many browsers as possible but technologies always grow with very fast speed.
_We need to keep moving forward, and savoring the journey_ 😎

{{ isSupport }}

## Support List

<p-table variant="static" :fields="fields" :items="items">
  <template #cell(browser)="{ item }">
    <img
      class="inline mr-2"
      width="24"
      height="24"
      :src="withBase(`assets/images/browsers-logos/${item.icon}.svg`)"
      :alt="item.browser">
    {{ item.browser }}
  </template>
  <template #cell(version)="{ item }">
    <p-label size="sm">{{ item.version }}</p-label>
  </template>
</p-table>
