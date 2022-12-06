<template>
  <p-input
    class="input-password"
    :type="isShow ? 'text' : 'password'">
    <template #append>
      <IconHide
        v-if="isShow"
        class="input-password__toggle"
        @click.prevent.stop="toggle" />
      <IconShow
        v-else
        class="input-password__toggle"
        @click.prevent.stop="toggle" />
    </template>
  </p-input>
</template>

<script lang="ts">
import pInput from '../input/Input.vue'
import IconShow from '@carbon/icons-vue/lib/view/16'
import IconHide from '@carbon/icons-vue/lib/view--off/16'
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  components: {
    pInput,
    IconShow,
    IconHide,
  },
  setup () {
    const isShow = ref(false)

    function toggle () {
      isShow.value = !isShow.value
    }

    return {
      isShow,
      toggle,
    }
  },
})
</script>

<style lang="postcss">
.input-password {
  @apply pr-9;

  &__toggle {
    @apply absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-secondary-hovered;
  }

  &.input--clearable {
    @apply pr-14;

    + .input__clear {
      @apply right-9;
    }
  }
}
</style>
