<template>
  <div
    :class="classNames"
    data-testid="accordion-item"
    :disabled="disabled">
    <slot
      name="activator"
      :toggle="toggle"
      :expanded="model">
      <div
        class="accordion__item__activator"
        data-testid="accordion-item-activator"
        @click="toggle">
        <div
          class="accordion__item__title"
          :class="titleClass"
          data-testid="accordion-item-title">
          <div
            v-if="accordionIcon"
            class="accordion__item__icon"
            data-testid="accordion-item-icon"
            :class="iconClass">
            <component
              :is="accordionIcon" />
          </div>
          <slot name="title">
            <Subheading>
              {{ title }}
            </Subheading>
          </slot>
        </div>
        <slot
          v-if="!noCaret"
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

    <p-collapse
      :model-value="model"
      class="accordion__item__content"
      :class="contentClass"
      data-testid="accordion-item-content">
      <slot :expanded="model" />
    </p-collapse>
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from '../input'
import type {
  VNode, PropType, Component,
} from 'vue-demi'
import {
  computed,
  watch,
  h,
} from 'vue-demi'
import Subheading from '../subheading/Subheading.vue'
import pCollapse from '../collapse/Collapse.vue'
import ChevronUp from '@privyid/persona-icon/vue/chevron-up/16.vue'
import ChevronDown from '@privyid/persona-icon/vue/chevron-down/16.vue'

defineOptions({ name: 'AccordionItem' })

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
  icon: {
    type: [
      String,
      Object,
      Function,
    ] as PropType<string | Component>,
    default: undefined,
  },
  titleClass: {
    type: [
      String,
      Array,
      Object,
    ],
    default: undefined,
  },
  contentClass: {
    type: [
      String,
      Array,
      Object,
    ],
    default: undefined,
  },
  iconClass: {
    type: [
      String,
      Array,
      Object,
    ],
    default: undefined,
  },
})

const emit = defineEmits<{
  'update:modelValue': [boolean],
  'expand': [],
  'collapse': [],
}>()

const model = useVModel(props)

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

const accordionIcon = computed(() => {
  if (props.icon) {
    if (typeof props.icon === 'string') {
      return () => h('img', {
        'src'        : props.icon,
        'max-width'  : '100%',
        'height'     : 'auto',
        'data-testid': 'accordion-item-icon-image',
      })
    }

    return props.icon
  }
})

function toggle () {
  if (!props.disabled)
    model.value = !model.value
}

watch(model, (value) => {
  if (value)
    emit('expand')
  else
    emit('collapse')
})

defineSlots<{
  'activator'(props: { toggle: () => void, expanded: boolean }): VNode[],
  'caret'(props: { expanded: boolean }): VNode[],
  'default'(props: { expanded: boolean }): VNode[],
}>()
</script>

<style lang="postcss">
.accordion__item {
  --p-accordion-bg: theme(backgroundColor.default.DEFAULT);
  --p-accordion-bg-dark: theme(backgroundColor.dark.default.DEFAULT);
  --p-accordion-collapsed-border: theme(borderColor.default.DEFAULT);
  --p-accordion-collapsed-border-dark: theme(borderColor.dark.default.DEFAULT);
  --p-accordion-expanded-border: theme(borderColor.default.DEFAULT);
  --p-accordion-expanded-border-dark: theme(borderColor.dark.default.DEFAULT);
  --p-accordion-expanded-activator-bg: theme(backgroundColor.default.alpha);
  --p-accordion-expanded-activator-bg-dark: theme(backgroundColor.dark.default.alpha);

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
      @apply bg-[color:var(--p-accordion-expanded-activator-bg)];
      @apply dark:bg-[color:var(--p-accordion-expanded-activator-bg-dark)];
    }
  }

  &__activator {
    @apply flex justify-between items-center p-4 cursor-pointer space-x-2;

    .expanded & {
      @apply bg-[color:var(--p-accordion-expanded-activator-bg)];
      @apply dark:bg-[color:var(--p-accordion-expanded-activator-bg-dark)];
    }
  }

  &__title {
    @apply grow flex;
  }

  &__caret {
    @apply flex-shrink-0;
  }

  &:is(&--disabled) {
    @apply pointer-events-none;

    > .accordion__item__activator {
      @apply opacity-50;
    }
  }
}
</style>
