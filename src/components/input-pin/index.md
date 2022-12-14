<script setup>
  import pInputPin from './InputPin.vue'
  import { ref } from 'vue-demi'

  const input = ref('12 45')
</script>

# Input Pin

> One at time input form.

## Usage

### Simple Usage

<preview>
  <p-input-pin v-model="input" />
</preview>

<preview>
  <p-input-pin disabled />
</preview>

<preview>
  <p-input-pin readonly />
</preview>

<preview>
  <p-input-pin error />
</preview>

{{ input }}
