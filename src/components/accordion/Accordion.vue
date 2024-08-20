<template>
  <div
    :class="classNames"
    data-testid="accordion">
    <AccordionItems
      v-model="model"
      :no-caret="noCaret"
      :multiple="multiple">
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
    </AccordionItems>
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from '../input'
import { type AccordionItem } from '.'
import type { PropType } from 'vue-demi'
import { computed } from 'vue-demi'
import Item from './AccordionItem.vue'
import AccordionItems from './AccordionItems.vue'

const props = defineProps({
  modelValue: {
    type   : [Number, Array] as PropType<number | number[]>,
    default: undefined,
  },
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
  noCaret: {
    type   : Boolean,
    default: false,
  },
  items: {
    type   : Array as PropType<AccordionItem[]>,
    default: () => ([] as AccordionItem[]),
  },
})

defineEmits<{
  'update:modelValue': [unknown],
}>()

const model = useVModel(props)

const classNames = computed(() => {
  const result: string[] = ['accordion']

  if (props.flush)
    result.push('accordion--flush')

  if (props.pill)
    result.push('accordion--pills')

  return result
})
</script>

<style lang="postcss">
.accordion {
  --p-accordion-border: theme(borderColor.default.DEFAULT);
  --p-accordion-border-dark: theme(borderColor.dark.default.DEFAULT);
  --p-accordion-item-border: theme(borderColor.default.DEFAULT);
  --p-accordion-item-border-dark: theme(borderColor.dark.default.DEFAULT);
  --p-accordion-divide: theme(divideColor.default.DEFAULT);
  --p-accordion-divide-dark: theme(divideColor.dark.default.DEFAULT);

  @apply flex flex-col w-full;
  @apply border border-[var(--p-accordion-border)] rounded;
  @apply dark:border-[var(--p-accordion-border-dark)];

  & > &__item {
    @apply first:rounded-t last:rounded-b;
  }

  &--pills {
    @apply gap-2 border-0 rounded-none;

    > .accordion__item {
      @apply border rounded border-[var(--p-accordion-item-border)];
      @apply dark:border-[var(--p-accordion-item-border-dark)];

      > .accordion__item__activator {
        @apply rounded-t-sm;
      }
    }
  }

  &:not(&--pills) {
    @apply divide-y divide-[var(--p-accordion-divide)];
    @apply dark:divide-[var(--p-accordion-divide-dark)];
  }

  &--flush {
    @apply border-0 rounded-none;

    > .accordion__item {
      @apply first:rounded-none last:rounded-none;
    }
  }
}
</style>
