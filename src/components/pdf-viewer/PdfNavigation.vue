<template>
  <div
    data-testid="pdf-navigation"
    class="pdf__navigation">
    <div class="pdf__navigation-container">
      <p-button
        data-testid="pdf-zoom-out"
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
        data-testid="pdf-zoom-in"
        variant="ghost"
        size="xs"
        icon
        @click="zoomIn">
        <IconZoomIn />
      </p-button>
      <p-divider vertical />
      <p-select
        v-model="page"
        :options="pages"
        size="xs" />
      <span
        data-testid="pdf-total"
        class="flex-shrink-0">of {{ totalPage }}</span>
      <p-button
        data-testid="pdf-prev"
        variant="ghost"
        size="xs"
        icon
        @click="prev">
        <IconPrev />
      </p-button>
      <p-button
        data-testid="pdf-next"
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
} from 'vue-demi'
import { usePdfContext } from '.'
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
    } = usePdfContext()

    const pages = computed<SelectItem[]>(() => {
      return Array.from({ length: totalPage.value }).map((_, i) => {
        return {
          text : `${i + 1}`,
          value: i + 1,
        }
      })
    })

    function zoomIn () {
      scale.value = (Math.round(scale.value / 0.1) * 0.1) + 0.1
    }

    function zoomOut () {
      scale.value = (Math.round(scale.value / 0.1) * 0.1) - 0.1
    }

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
    @apply absolute bottom-4 inset-x-0 justify-center items-center flex w-80 mx-auto z-10;

    &-container {
      @apply flex bg-gray-70 text-gray-30 rounded p-2 space-x-1 items-center;

      > .btn {
        @apply text-gray-30;
      }

      > .select {
        @apply w-16;

        > .input {
          @apply bg-inverse;

          > .input__form {
            @apply border-subtle bg-inverse;
          }
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
