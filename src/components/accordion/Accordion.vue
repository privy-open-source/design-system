<template>
  <div
    :class="classNames"
    data-testid="accordion">
    <slot>
      <Item
        v-for="(item, i) in items"
        :key="i"
        :title="item.title"
        :disabled="item.disabled">
        <div class="p-4">
          {{ item.content }}
        </div>
      </Item>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { type AccordionItem, ACCORDION_CONTEXT } from '.'
import {
  PropType, computed, provide, readonly,
} from 'vue-demi'
import Item from './AccordionItem.vue'

defineOptions({ name: 'Accordion' })

const props = defineProps({
  multiple: {
    type   : Boolean,
    default: false,
  },
  flush: {
    type   : Boolean,
    default: false,
  },
  pill: {
    type   : Boolean,
    default: false,
  },
  modelValue: {
    type   : String,
    default: undefined,
  },
  noCaret: {
    type   : Boolean,
    default: false,
  },
  items: {
    type   : Array as PropType<AccordionItem[]>,
    default: () => ([] as AccordionItem[]),
  },
})

const emit = defineEmits<{
  'update:modelValue': [value: string],
}>()

const modelValue = useVModel(props, 'modelValue', emit, { passive: true })

const classNames = computed(() => {
  const result: string[] = ['accordion']

  if (props.flush)
    result.push('accordion--flush')

  if (props.pill)
    result.push('accordion--pills')

  return result
})

function setOpenItem (id: string): void {
  modelValue.value = id
}

provide(ACCORDION_CONTEXT, {
  openItem: readonly(modelValue),
  multiple: props.multiple,
  noCaret : props.noCaret,
  setOpenItem,
})
</script>

<style lang="postcss">
.accordion {
  @apply flex flex-col w-full;
  @apply border border-default rounded;
  @apply dark:border-dark-default;

  & > &__item {
    @apply first:rounded-t last:rounded-b;
  }

  &--pills {
    @apply gap-2 border-0 rounded-none;

    > .accordion__item {
      @apply border rounded border-default;
      @apply dark:border-dark-default;
    }
  }

  &:not(&--pills) {
    @apply divide-y divide-default;
    @apply dark:divide-dark-default;
  }

  &--flush {
    @apply border-0 rounded-none;

    > .accordion__item {
      @apply first:rounded-none last:rounded-none;
    }
  }
}
</style>
