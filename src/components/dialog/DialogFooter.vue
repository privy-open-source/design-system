<template>
  <div
    data-testid="dialog-footer"
    :class="footerClassNames">
    <Button
      v-if="cancelVisible"
      :class="cancelClass"
      :color="cancelColor"
      :variant="cancelVariant"
      @click="cancel">
      {{ cancelText }}
    </Button>

    <Button
      v-if="confirmVisible"
      :class="confirmClass"
      :color="confirmColor"
      :variant="confirmVariant"
      @click="confirm">
      {{ confirmText }}
    </Button>
  </div>
</template>

<script lang="ts">
import Button from '../button/Button.vue'
import {
  defineComponent,
  PropType,
  computed,
} from 'vue-demi'
import type {
  StyleVariant as FooterButtonStyleVariant,
  ColorVariant as FooterButtonColorVariant,
} from '../button/Button.vue'

export type FooterAlignVariant = 'start' | 'end'

export type {
  StyleVariant as FooterButtonStyleVariant,
  ColorVariant as FooterButtonColorVariant,
} from '../button/Button.vue'

export default defineComponent({
  components: { Button },
  props     : {
    align: {
      type   : String as PropType<FooterAlignVariant>,
      default: 'start',
    },
    cancelClass: {
      type   : String,
      default: undefined,
    },
    cancelVisible: {
      type   : Boolean,
      default: true,
    },
    cancelColor: {
      type   : String as PropType<FooterButtonColorVariant>,
      default: 'secondary',
    },
    cancelVariant: {
      type   : String as PropType<FooterButtonStyleVariant>,
      default: 'link',
    },
    cancelText: {
      type   : String,
      default: 'Cancel',
    },
    confirmClass: {
      type   : String,
      default: undefined,
    },
    confirmVisible: {
      type   : Boolean,
      default: true,
    },
    confirmColor: {
      type   : String as PropType<FooterButtonColorVariant>,
      default: 'primary',
    },
    confirmVariant: {
      type   : String as PropType<FooterButtonStyleVariant>,
      default: 'solid',
    },
    confirmText: {
      type   : String,
      default: 'Confirm',
    },
  },

  emits: ['cancel', 'confirm'],

  setup (props, { emit }) {
    const footerClassNames = computed(() => {
      const result: string[] = ['footer']

      if (props.align)
        result.push(`footer--align-${props.align}`)

      return result
    })

    function cancel (): void {
      emit('cancel')
    }

    function confirm (): void {
      emit('confirm')
    }

    return {
      footerClassNames,
      cancel,
      confirm,
    }
  },
})
</script>

<style lang="postcss">
.footer {
  @apply flex items-center;

  .btn {
    + .btn {
      @apply ml-6;
    }
  }

  &--align {
    &-left,
    &-start {
      @apply justify-start;
    }

    &-right,
    &-end {
      @apply justify-end;
    }

    &-center {
      @apply justify-center;
    }
  }
}
</style>
