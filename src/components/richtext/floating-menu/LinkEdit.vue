<template>
  <p-input-group size="sm">
    <p-input-group-addon>
      <IconLink />
    </p-input-group-addon>

    <p-input
      ref="input"
      v-model="model"
      placeholder="Enter URL"
      title="Enter URL"
      @keyup.esc.prevent="cancel()"
      @keyup.enter.prevent="submit()" />
  </p-input-group>
  <p-button
    size="sm"
    icon
    variant="ghost"
    :disabled="!model"
    title="Save"
    @click="submit()">
    <IconSubmit />
  </p-button>
  <p-button
    size="sm"
    icon
    variant="ghost"
    title="Cancel"
    @click="cancel()">
    <IconClose />
  </p-button>
</template>

<script lang="ts" setup>
import pInput from '../../input/Input.vue'
import pInputGroup from '../../input-group/InputGroup.vue'
import pInputGroupAddon from '../../input-group/InputGroupAddon.vue'
import pButton from '../../button/Button.vue'
import IconLink from '@privyid/persona-icon/vue/link/20.vue'
import IconSubmit from '@privyid/persona-icon/vue/checkmark/20.vue'
import IconClose from '@privyid/persona-icon/vue/close/20.vue'
import { useVModel } from '../../input'
import { onMounted, ref } from 'vue-demi'

const props = defineProps({
  modelValue: {
    type   : String,
    default: '',
  },
})

const model = useVModel(props)
const input = ref<InstanceType<typeof pInput>>()

const emit = defineEmits<{
  'update:modelValue': [string],
  'submit': [string],
  'cancel': [],
}>()

onMounted(() => {
  setTimeout(() => {
    input.value?.input.focus()
  }, 300)
})

function submit () {
  emit('submit', model.value)
}

function cancel () {
  emit('cancel')
}
</script>
