<script setup>
import Cropper from './Cropper.vue'
import img from '../camera/__mocks__/sample.jpeg'
import { ref } from 'vue-demi'

const result = ref()
</script>

# Cropper
> Preview and crop image

## Usage

### Simple Usage

<preview class="flex-col">
  <cropper v-model.base64="result" :src="img" />
</preview>

<img v-if="result" :src="result" class="border" />
