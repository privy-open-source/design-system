<script setup>
  import Select from "./Select.vue"
  import FuzzyAdapter from "../select/adapter/fuzzy-adapter"
  import defineAsyncAdapter from "./adapter/async-adapter"
  import { ref } from "vue-demi"

  const value = ref('')
  const valueA = ref('')
  const asyncAdapter = defineAsyncAdapter((keyword, page, perPage) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (page >= 3)
          resolve([])

        const result = []
        const start  = (page - 1) * perPage
        const until  = start + perPage

        for (let i = start + 1; i <= until; ++i) {
          result.push({
            text : `${value.value} ${i}`,
            value: i,
          })
        }

        resolve(result)
      }, 1000)
    })
  }, [value])
</script>


# Select

## Usage

### Simple Usage

<preview>
  <Select placeholder="Coba" :options="['Apple', 'Banana', 'Grape']" v-model="value" />
</preview>

**Result:** <pre><code>{{ value }}</code></pre>

<preview>
  <Select placeholder="Coba" :options="[{ text: '🍎 Apple', value: 'Apple' }, { text: '🍇 Grape', value: 'Grape' }, { text: '🍌 Banana', value: 'Banana'}]" v-model="value" :adapter="FuzzyAdapter" />
</preview>

<preview>
  <Select placeholder="Coba" v-model="valueA" :adapter="asyncAdapter" />
</preview>
