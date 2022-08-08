<script setup>
  import Filterbar from "./Filterbar.vue"
  import { ref } from 'vue-demi'
  import { defineFilter } from './use-filterbar'

  const query = ref({ my_doc: true })

  const schema = defineFilter([
    {
      type: 'toggle',
      key : 'my_doc',
    },
    {
      type   : 'select',
      key    : 'nganu',
      label  : 'Nganu',
      options: [
        'Jakarta',
        'Bandung',
        'Surabaya',
      ]
    },
    {
      type   : 'multiselect',
      key    : 'location',
      label  : 'Location',
      options: [
        'Jakarta',
        'Bandung',
        'Surabaya',
      ]
    }
  ])
</script>

# Filterbar

## Usage

### Simple Usage
<preview>
  <Filterbar v-model="query" :schema="schema" />
</preview>

**Result :**

<pre><code>{{ query }}</code></pre>
