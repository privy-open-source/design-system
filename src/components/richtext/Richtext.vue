<template>
  <div
    class="richtext"
    :class="classNames">
    <template v-if="editor">
      <div
        class="richtext__controls">
        <ToolbarAdvance v-if="variant === 'advanced'" />
        <ToolbarSimple v-else />
      </div>
      <FloatingMenu
        :editor="editor"
        :should-show="({ editor }) => editor.isActive('image')"
        :tippy-options="{ placement: 'top' }">
        <div class="richtext__floating-menu">
          <ImageEdit />
        </div>
      </FloatingMenu>
      <FloatingMenu
        :editor="editor"
        :should-show="({ editor }) => editor.isActive('link')"
        :tippy-options="{ placement: 'top' }">
        <div class="richtext__floating-menu">
          <LinkDetail />
        </div>
      </FloatingMenu>
    </template>
    <editor-content
      v-model="model"
      class="richtext__input"
      rows="3"
      :editor="editor" />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import {
  computed,
  provide,
  watch,
} from 'vue-demi'
import type { EditorOptions } from '@tiptap/vue-3'
import {
  useEditor,
  EditorContent,
  FloatingMenu,
} from '@tiptap/vue-3'

import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import FontFamily from '@tiptap/extension-font-family'
import Image from '@tiptap/extension-image'
import ImageAlign from './tiptap/image-align'
import FontSize from 'tiptap-extension-font-size'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Link from '@tiptap/extension-link'

import ToolbarSimple from './RichtextToolbarSimple.vue'
import ToolbarAdvance from './RichtextToolbarAdvance.vue'

import ImageEdit from './popup/RichtextPopupImageEdit.vue'
import LinkDetail from './popup/RichtextPopupLinkDetail.vue'

import { useVModel } from '../input'
import { defuFn } from 'defu'
import type { ControlVariant } from '.'
import { RICHTEXT_CONTEXT } from '.'

type Options = Partial<Omit<EditorOptions, 'content' | 'onUpdate' | 'element'>>

const props = defineProps({
  modelValue: {
    type   : String,
    default: undefined,
  },
  variant: {
    type   : String as PropType<ControlVariant>,
    default: 'simple' as ControlVariant,
  },
  placeholder: {
    type   : String,
    default: '',
  },
  readonly: {
    type   : Boolean,
    default: false,
  },
  disabled: {
    type   : Boolean,
    default: false,
  },
  error: {
    type   : Boolean,
    default: false,
  },
  options: {
    type   : Object as PropType<Options>,
    default: () => ({}),
  },
})

const model  = useVModel(props)
const editor = useEditor(defuFn<Options, [Partial<EditorOptions>]>(props.options,
  {
    editable: !props.disabled && !props.readonly,
    content : props.modelValue,
    onUpdate: () => {
      model.value = editor.value?.isEmpty
        ? undefined
        : editor.value?.getHTML()
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Underline,
      FontFamily,
      FontSize,
      Image.configure({ allowBase64: true }),
      ImageAlign,
      Placeholder.configure({ placeholder: props.placeholder }),
      Link.configure({
        defaultProtocol: 'https',
        openOnClick    : false,
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
  },
))

watch(() => [props.disabled, props.readonly], ([disabled, readonly]) => {
  if (editor.value)
    editor.value.setEditable(!disabled && !readonly)
})

const classNames = computed(() => {
  const results: string[] = []

  if (props.disabled)
    results.push('richtext--disabled')

  if (props.readonly)
    results.push('richtext--readonly')

  if (props.error)
    results.push('richtext--error', 'state--error')

  return results
})

watch(() => props.modelValue, (value) => {
  if (value !== editor.value.getHTML())
    editor.value.commands.setContent(value ?? '')
})

defineEmits<{
  'update:modelValue': [string],
}>()

provide(RICHTEXT_CONTEXT, { editor })

defineExpose({ editor })
</script>

<style lang="postcss">
.richtext {
  --p-richtext-min-height: 120px;

  @apply flex flex-col w-full;

  &__controls {
    @apply rounded-t bg-default border border-b-0 border-default py-1 flex flex-wrap;
    @apply dark:bg-dark-default dark:border-dark-default;
  }

  &__controls-group {
    @apply px-1 flex flex-shrink-0 select-none items-start space-x-1;
    @apply dark:border-dark-default;

    &:not(:last-child) {
      @apply border-r;
    }
  }

  &__input {
    @apply w-full;
  }

  &__floating-menu {
    @apply z-tooltip px-1 py-1 rounded text-xs flex space-x-1 drop-shadow-sm;
    @apply bg-default text-subtle;
    @apply dark:bg-dark-default dark:text-dark-subtle;
  }

  .tiptap {
    @apply p-3 rounded rounded-t-none border border-solid border-subtlest hover:border-subtle focus:border-subtle placeholder:text-muted w-full outline-none text-default bg-default resize-none min-h-[var(--p-richtext-min-height)] focus:ring-4 focus:ring-subtle/10 focus:z-1;
    @apply dark:border-dark-subtlest hover:dark:border-dark-subtle focus:dark:border-dark-subtle placeholder:dark:text-dark-muted dark:text-dark-default dark:bg-dark-default focus:dark:ring-dark-subtle/10;

    p.is-editor-empty:first-child::before {
      @apply content-[attr(data-placeholder)] h-0 float-left;
      @apply text-muted pointer-events-none;
      @apply dark:text-dark-muted;
    }

    img.ProseMirror-selectednode,
    figure.ProseMirror-selectednode > img {
      @apply ring ring-subtle;
      @apply dark:ring-dark-subtle;
    }

    table {
      @apply table table-fixed border-collapse w-full;

      .column-resize-handle {
        @apply bg-brand-accent/20 w-1 absolute top-0 -bottom-0.5 -right-0.5 z-1;
      }

      td,
      th {
        @apply relative bg-default;
        @apply dark:bg-dark-default;

        &.selectedCell {
          @apply bg-brand-accent/20;
          @apply dark:bg-brand-accent/20;
        }
      }

    }

    .tableWrapper {
      @apply overflow-x-auto;
    }

    &.resize-cursor {
      @apply cursor-col-resize;
    }

    ul,
    ol {
      @apply pl-6 my-4;
    }

    ul {
      @apply list-disc;
    }

    ol {
      @apply list-decimal;
    }
  }

  &--disabled {
    .tiptap {
      @apply bg-base border-subtle pointer-events-none text-muted;
      @apply dark:bg-dark-base dark:border-dark-subtle dark:text-dark-muted;
    }
  }

  .state--error,
  &--error {
    .tiptap {
      @apply border-danger-emphasis hover:border-danger-emphasis focus:ring-danger focus:border-danger-emphasis;
      @apply dark:border-dark-danger-emphasis hover:dark:border-dark-danger-emphasis focus:dark:ring-dark-danger focus:dark:border-dark-danger-emphasis;
    }
  }

  &__counter {
    @apply text-right text-muted text-xs absolute bottom-1 right-1 pointer-events-none z-1;
    @apply dark:text-dark-muted;
  }

  .btn.btn--variant-ghost[active="true"] {
    @apply bg-emphasis-alpha border-subtle-alpha text-brand-accent;
    @apply dark:bg-dark-emphasis-alpha dark:border-r-dark-subtle-alpha dark:text-dark-brand-accent;
  }

  .dropdown__item.dropdown__item--active {
    @apply bg-emphasis-alpha border-subtle-alpha;
    @apply dark:bg-dark-emphasis-alpha dark:border-r-dark-subtle-alpha;
  }
}
</style>
