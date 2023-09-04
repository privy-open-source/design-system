<template>
  <div
    :class="classNames"
    data-testid="accordion-item"
    :disabled="disabled"
    :data-accordion-item-id="uid">
    <slot
      name="activator"
      :toggle="toggle"
      :expanded="model">
      <div
        class="accordion__item__activator"
        data-testid="accordion-item-activator"
        @click="toggle">
        <Subheading>
          {{ title }}
        </Subheading>
        <slot
          v-if="!hideCaret"
          name="caret"
          :expanded="model">
          <ChevronUp
            v-if="model"
            class="accordion__item__caret"
            data-testid="accordion-item-caret" />
          <ChevronDown
            v-else
            class="accordion__item__caret"
            data-testid="accordion-item-caret" />
        </slot>
      </div>
    </slot>

    <Collapse
      :when="model"
      data-testid="accordion-item-content">
      <slot :expanded="model" />
    </Collapse>
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { ACCORDION_CONTEXT, generateId } from '.'
import {
  computed, inject, watch,
} from 'vue-demi'

import Subheading from '../subheading/Subheading.vue'
import { Collapse } from 'vue-collapsed'
import ChevronUp from '@privyid/persona-icon/vue/chevron-up/16.vue'
import ChevronDown from '@privyid/persona-icon/vue/chevron-down/16.vue'

const uid = generateId(undefined, 'accordion-item')

const parentData = inject(ACCORDION_CONTEXT)

const props = defineProps({
  modelValue: {
    type   : Boolean,
    default: false,
  },
  title: {
    type   : String,
    default: '',
  },
  disabled: {
    type   : Boolean,
    default: false,
  },
  noCaret: {
    type   : Boolean,
    default: false,
  },
})
const emit  = defineEmits([
  'update:modelValue',
  'expand',
  'collapse',
])

const model = useVModel(props, 'modelValue', emit, { passive: true })

const hideCaret = computed(() => {
  return props.noCaret || (parentData?.noCaret)
})

const classNames = computed(() => {
  const result: string[] = ['accordion__item']

  if (props.disabled)
    result.push('accordion__item--disabled')

  if (model.value)
    result.push('expanded')
  else
    result.push('collapsed')

  return result
})

function toggle () {
  if (props.disabled)
    return

  model.value = !model.value
}

watch(
  () => parentData?.openItem.value,
  () => {
    model.value = parentData?.openItem.value === uid.value && !parentData?.multiple
  },
)
watch(
  () => model.value,
  (value) => {
    if (value && !parentData?.multiple) parentData?.setOpenItem(uid.value)

    if (value)
      emit('expand')
    else
      emit('collapse')
  },
)
</script>

<style lang="postcss">
.accordion__item {
  --p-accordion-bg: theme(backgroundColor.default.DEFAULT);
  --p-accordion-bg-dark: theme(backgroundColor.dark.default.DEFAULT);
  --p-accordion-collapsed-border: theme(borderColor.default.DEFAULT);
  --p-accordion-collapsed-border-dark: theme(borderColor.dark.default.DEFAULT);
  --p-accordion-expanded-border: theme(borderColor.default.DEFAULT);
  --p-accordion-expanded-border-dark: theme(borderColor.dark.default.DEFAULT);

  @apply w-full bg-[color:var(--p-accordion-bg)];
  @apply dark:bg-[color:var(--p-accordion-bg-dark)];

  &:not(.accordion &) {
    @apply rounded border;

    &.collapsed {
      @apply border-[color:var(--p-accordion-collapsed-border)];
      @apply dark:border-[color:var(--p-accordion-collapsed-border-dark)];
    }

    &.expanded {
      @apply border-[color:var(--p-accordion-expanded-border)];
      @apply dark:border-[color:var(--p-accordion-expanded-border-dark)];
    }

    .accordion__item__activator {
      @apply bg-default-alpha;
      @apply dark:bg-dark-default-alpha;
    }
  }

  &__activator {
    @apply flex justify-between items-center p-4 cursor-pointer;

    .expanded & {
      @apply bg-default-alpha;
      @apply dark:bg-dark-default-alpha;
    }
  }

  &:is(&--disabled) {
    @apply pointer-events-none;

    > .accordion__item__activator {
      @apply opacity-50;
    }
  }
}
</style>
