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
import IconShow from '@privyid/persona-icon/vue/view/20.vue'
import IconHide from '@privyid/persona-icon/vue/view-off/20.vue'
import {
  Ref,
  ref,
  defineComponent,
} from 'vue-demi'

type Props = InstanceType<typeof pInput>['$props']

type Bindings = {
  isShow: Ref<boolean>,
  toggle: () => void,
}

export default defineComponent<Props, Bindings>({
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
    @apply absolute right-[0.15rem] top-1/2 -translate-y-1/2 cursor-pointer z-1 text-default/30 hover:text-subtle;
    @apply dark:text-dark-default/30 hover:dark:text-dark-subtle;

    .input--disabled ~ & {
      @apply pointer-events-none text-muted;
      @apply dark:text-dark-muted;
    }
  }

  &.input--clearable {
    @apply pr-16;

    + .input__clear {
      @apply right-10;
    }
  }
}
</style>
