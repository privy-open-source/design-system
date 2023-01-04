<template>
  <div class="pdf__navigation">
    <div class="pdf__navigation-container">
      <p-button
        variant="ghost"
        size="xs"
        icon
        @click="zoomOut">
        <IconZoomOut />
      </p-button>
      <span class="pdf__navigation-scale">
        {{ (scale * 100).toFixed(0) }}%
      </span>
      <p-button
        variant="ghost"
        size="xs"
        icon
        @click="zoomIn">
        <IconZoomIn />
      </p-button>
      <p-divider vertical />
      <p-select
        v-model="page"
        class="w-16"
        :options="pages"
        size="xs" />
      <span class="flex-shrink-0">of {{ totalPage }}</span>
      <p-button
        variant="ghost"
        size="xs"
        icon
        @click="prev">
        <IconPrev />
      </p-button>
      <p-button
        variant="ghost"
        size="xs"
        icon
        @click="next">
        <IconNext />
      </p-button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
} from 'vue-demi'
import { PDF_VIEWER_CONTEXT } from '.'
import IconZoomIn from '@carbon/icons-vue/lib/zoom--in/16'
import IconZoomOut from '@carbon/icons-vue/lib/zoom--out/16'
import IconPrev from '@carbon/icons-vue/lib/chevron--up/16'
import IconNext from '@carbon/icons-vue/lib/chevron--down/16'
import pButton from '../button/Button.vue'
import pDivider from '../divider/Divider.vue'
import pSelect from '../select/Select.vue'
import { SelectItem } from '../select'

export default defineComponent({
  components: {
    IconZoomIn,
    IconZoomOut,
    IconPrev,
    IconNext,
    pButton,
    pDivider,
    pSelect,
  },
  setup () {
    const {
      page,
      scale,
      totalPage,
      zoomIn,
      zoomOut,
    } = inject(PDF_VIEWER_CONTEXT)

    const pages = computed<SelectItem[]>(() => {
      return Array.from({ length: totalPage.value }).map((_, i) => {
        return {
          text : `${i + 1}`,
          value: i + 1,
        }
      })
    })

    function next () {
      page.value++
    }

    function prev () {
      page.value--
    }

    return {
      page,
      pages,
      scale,
      totalPage,
      zoomIn,
      zoomOut,
      next,
      prev,
    }
  },
})
</script>

<style lang="postcss">
.pdf {
  &__navigation {
    @apply absolute bottom-4 inset-x-0 justify-center items-center flex w-80 mx-auto;

    &-container {
      @apply flex bg-gray-70 text-gray-30 rounded p-2 space-x-1 items-center;

      > .btn {
        @apply text-gray-30;
      }

      > .select > .input {
        @apply bg-emphasis-subtle;

        > .input__form {
          @apply border-on-emphasis-subtle;
        }
      }

      > .divider {
        @apply border-none bg-gray-50;
      }
    }

    &-page {
      @apply w-20 inline-flex;
    }
  }
}
</style>
