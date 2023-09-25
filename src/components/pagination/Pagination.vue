<template>
  <div
    data-testid="pagination"
    :class="classNames">
    <div
      v-if="quickJump"
      class="pagination__quickjump"
      data-testid="pagination-quickjump">
      {{ pageLabel }}
      <Select
        v-model="model"
        :size="selectSize"
        data-testid="pagination-select"
        :options="pageOptions"
        @change="({ value }) => selectPage(value)" />
      <slot
        name="quick-jump-count"
        :total="totalPageCount">
        of {{ totalPageCount }}
      </slot>
    </div>
    <nav
      v-else
      class="pagination__items">
      <Button
        v-if="variant === 'far'"
        data-testid="pagination-nav-first"
        variant="solid"
        size="sm"
        :disabled="!canPrev"
        class="pagination__items__nav-first"
        icon
        @click="selectPage(1)">
        <slot name="first-navigation">
          {{ firstNavLabel }}
        </slot>
      </Button>
      <Button
        v-if="variant === 'short' || variant === 'far'"
        data-testid="pagination-nav-prev"
        variant="solid"
        size="sm"
        :disabled="!canPrev"
        class="pagination__items__nav-prev"
        icon
        @click="prev">
        <slot name="prev-navigation">
          <template v-if="navigationText">
            {{ prevNavLabel }}
          </template>
          <IconPrev v-else />
        </slot>
      </Button>
      <template v-if="!navigationOnly">
        <Button
          v-for="(page, index) in pageItems"
          :key="index"
          data-testid="pagination-item"
          variant="solid"
          size="sm"
          icon
          :readonly="typeof page === 'string'"
          :active="page === model"
          @click="selectPage(page)">
          {{ page }}
        </Button>
      </template>
      <Button
        v-if="variant === 'short' || variant === 'far'"
        data-testid="pagination-nav-next"
        variant="solid"
        size="sm"
        :disabled="!canNext"
        class="pagination__items__nav-next"
        icon
        @click="next">
        <slot name="next-navigation">
          <template v-if="navigationText">
            {{ nextNavLabel }}
          </template>
          <IconNext v-else />
        </slot>
      </Button>
      <Button
        v-if="variant === 'far'"
        data-testid="pagination-nav-last"
        variant="solid"
        size="sm"
        :disabled="!canNext"
        class="pagination__items__nav-last"
        icon
        @click="selectPage(totalPageCount)">
        <slot name="last-navigation">
          {{ lastNavLabel }}
        </slot>
      </Button>
    </nav>
    <div
      v-if="showCounter || showDetail"
      class="pagination__count"
      data-testid="pagination-count">
      <slot
        name="pagination-count"
        :range="rowRange"
        :total="total">
        {{ rowRange[0] }} - {{ rowRange[1] }} of {{ total }}
      </slot>
    </div>
    <div
      v-if="showPerPage || showDetail"
      class="pagination__options"
      data-testid="pagination-option">
      {{ showRowsLabel }}
      <Select
        v-model="rowPerPage"
        :size="selectSize"
        :options="rowPerPageOptions" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  PropType,
  watch,
} from 'vue-demi'
import Button from '../button/Button.vue'
import Select from '../select/Select.vue'
import IconPrev from '@privyid/persona-icon/vue/chevron-left/20.vue'
import IconNext from '@privyid/persona-icon/vue/chevron-right/20.vue'
import { SelectItem } from '../select'
import { useVModel } from '../input'
import { usePagination } from '.'
import { getPageRange } from './utils/calculate-page'
import { SizeVariant } from '../button'

type NavigationVariant = 'none' | 'short' | 'far'

export default defineComponent({
  components: {
    IconPrev, Button, IconNext, Select,
  },
  props: {
    modelValue: {
      type   : Number,
      default: 1,
    },
    quickJump: {
      type   : Boolean,
      default: false,
    },
    showCounter: {
      type   : Boolean,
      default: false,
    },
    showPerPage: {
      type   : Boolean,
      default: false,
    },
    showDetail: {
      type   : Boolean,
      default: false,
    },
    navigationText: {
      type   : Boolean,
      default: false,
    },
    navigationOnly: {
      type   : Boolean,
      default: false,
    },
    variant: {
      type   : String as PropType<NavigationVariant>,
      default: 'short',
    },
    perPage: {
      type   : Number,
      default: 10,
    },
    perPageOptions: {
      type   : Array<Number>,
      default: () => [
        10,
        20,
        30,
      ],
    },
    total: {
      type   : Number,
      default: 0,
    },
    displayLimit: {
      type   : Number,
      default: 10,
    },
    pageLabel: {
      type   : String,
      default: 'Page',
    },
    prevNavLabel: {
      type   : String,
      default: 'Previous',
    },
    nextNavLabel: {
      type   : String,
      default: 'Next',
    },
    firstNavLabel: {
      type   : String,
      default: 'First',
    },
    lastNavLabel: {
      type   : String,
      default: 'Last',
    },
    showRowsLabel: {
      type   : String,
      default: 'Show rows',
    },
    selectSize: {
      type   : String as PropType<SizeVariant>,
      default: 'md',
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: [
    'update:modelValue',
    'update:perPage',
    'change',
  ],
  setup (props, { emit }) {
    const classNames = computed(() => {
      const results: string [] = ['pagination']

      if (props.navigationOnly)
        results.push('pagination--navonly')

      return results
    })

    const model = useVModel(props)

    const {
      pageItems,
      rowRange,
      totalPageCount,
      canNext,
      canPrev,
    } = usePagination(props)

    const pageOptions = computed<SelectItem[]>(() => {
      return getPageRange(1, totalPageCount.value).map((page) => {
        return {
          text : String(page),
          value: page,
        }
      })
    })

    const rowPerPageOptions = computed<SelectItem[]>(() => {
      return props.perPageOptions.map((option) => {
        return {
          text : String(option),
          value: option,
        }
      })
    })

    const rowPerPage = computed({
      get () {
        return props.perPage
      },
      set (value) {
        emit('update:perPage', value)
      },
    })

    watch(totalPageCount, (value) => {
      if (model.value > value)
        model.value = value
    })

    function next () {
      model.value = Math.min(model.value + 1, totalPageCount.value)

      emit('change', model.value)
    }

    function prev () {
      model.value = Math.max(model.value - 1, 1)

      emit('change', model.value)
    }

    function selectPage (page: number | string) {
      if (typeof page === 'string') return

      if (model.value !== page) {
        model.value = page

        emit('change', page)
      }
    }

    return {
      model,
      classNames,
      pageOptions,
      rowPerPageOptions,
      pageItems,
      rowRange,
      totalPageCount,
      rowPerPage,
      canNext,
      canPrev,
      selectPage,
      next,
      prev,
    }
  },
})
</script>

<style lang="postcss">
/**
* Component Name: Pagination
* Component URI : https://www.figma.com/file/JIYmbyRYZHc9bnVp6Npm9K/B-A-S-E-%2F-Components?node-id=338%3A15323&t=u3Y7jHGZtoyAFn21-4
* Date Created  : December 22, 2022
* Last Update   : December 22, 2022
*/
.pagination {
  @apply relative flex flex-wrap justify-start items-center w-full;

  &&--navonly {
    .pagination {
      &__items {
        @apply order-4 ml-4 only:ml-auto;
      }

      &__count {
        @apply ml-0 mr-auto;
      }
    }
  }

  &__quickjump,
  &__items,
  &__options {
    @apply flex flex-wrap items-center text-default;
    @apply dark:text-dark-default;
  }

  &__quickjump {
    .dropdown {
      @apply mx-3;
    }
  }

  &__items {
    @apply space-x-2;

    .btn--icon.btn--sm {
      @apply px-2 py-1 min-w-[34px];
      &:is(.pagination__items__nav-first, .pagination__items__nav-prev, .pagination__items__nav-next, .pagination__items__nav-last) > svg {
        @apply my-[0.15rem];
      }
    }
  }

  &__count {
    @apply ml-5 text-default;
    @apply dark:text-dark-default;
  }

  &__options {
    @apply justify-between items-center ml-auto;

    .dropdown {
      @apply ml-3;
    }
  }

  .dropdown {
    @apply max-w-[80px];

    &__menu {
      @apply min-w-fit;
    }
  }

  .btn {
    @apply transition-none;
  }

  .btn--variant-solid {
    @apply justify-center items-center hover:shadow-none;

    &.btn--default {
      @apply bg-transparent hover:bg-base focus:bg-base border-transparent focus:border-default hover:border-default text-default font-normal focus:outline-none;
      @apply dark:bg-transparent hover:dark:bg-dark-base focus:dark:bg-dark-base dark:border-transparent focus:dark:border-dark-default hover:dark:border-dark-default dark:text-dark-default;

      &[active="true"] {
        @apply bg-info-emphasis border-info-emphasis text-state-emphasis cursor-default;
        @apply dark:bg-dark-info-emphasis dark:border-dark-info-emphasis dark:text-dark-state-emphasis;
      }

      &[readonly] {
        @apply pointer-events-none;
      }
    }
  }
}
</style>
