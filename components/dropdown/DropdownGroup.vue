<template>
  <Transition
    :name="transition"
    mode="out-in">
    <div
      :key="tree._level"
      class="dropdown__group">
      <template
        v-if="canBack">
        <DropdownItem
          key="btn-back"
          class="dropdown__group-btn dropdown__group-btn-back"
          @click="back()">
          <slot name="button-back">
            <IconBack class="dropdown__group-next" />
            <div class="dropdown__group-content">
              Back
            </div>
          </slot>
        </DropdownItem>
      </template>

      <template v-if="!isRoot">
        <DropdownItem
          key="btn-next"
          class="dropdown__group-btn"
          @click="next()">
          <slot name="button-content">
            <div class="dropdown__group-content">
              {{ text }}
            </div>
            <IconNext class="dropdown__group-next" />
          </slot>
        </DropdownItem>
      </template>

      <template v-else>
        <component
          :is="view" />
      </template>
    </div>
  </Transition>
</template>

<script lang="ts">
import DropdownItem from './DropdownItem.vue'
import IconNext from '@carbon/icons-vue/lib/chevron--right/16'
import IconBack from '@carbon/icons-vue/lib/chevron--left/16'
import {
  defineComponent,
  InjectionKey,
  inject,
  provide,
  ref,
  shallowRef,
  ShallowRef,
  computed,
  watch,
  Slot,
} from 'vue-demi'

interface DropdownNode {
  _level: number, // Just id to trigger transition
  prev?: DropdownNode,
  slot: Slot,
}

interface DropdownContext {
  tree: ShallowRef<DropdownNode>,
  next: () => void,
  back: () => void,
}

const DROPDOWN_TREE: InjectionKey<DropdownContext> = Symbol('DropdownContext')

export default defineComponent({
  components: {
    DropdownItem,
    IconNext,
    IconBack,
  },
  props: {
    text: {
      type   : String,
      default: '',
    },
    backText: {
      type   : String,
      default: 'Back',
    },
  },
  setup (props, { slots }) {
    const context    = inject(DROPDOWN_TREE, undefined, true)
    const transition = ref<'slide-left' | 'slide-right' | 'none'>('slide-left')

    const isRoot = computed(() => {
      return context === undefined
    })

    const tree: DropdownContext['tree'] = context?.tree ?? shallowRef({
      _level: 0,
      slot  : slots.default,
    })

    const next: DropdownContext['next'] = () => {
      tree.value = {
        _level: tree.value._level + 1,
        prev  : tree.value,
        slot  : slots.default,
      }
    }

    const back: DropdownContext['back'] = () => {
      if (tree.value.prev)
        tree.value = tree.value.prev
    }

    const view = computed(() => {
      return tree.value.slot
    })

    const canBack = computed(() => {
      return Boolean(isRoot.value && tree.value.prev)
    })

    watch(tree, (value, oldValue) => {
      transition.value = value._level > oldValue._level
        ? 'slide-left'
        : 'slide-right'
    })

    if (isRoot.value) {
      provide(DROPDOWN_TREE, {
        tree,
        next,
        back,
      })
    }

    function reset () {
      if (isRoot.value) {
        tree.value = {
          prev  : undefined,
          _level: 0,
          slot  : slots.default,
        }
      }
    }

    return {
      isRoot,
      tree,
      view,
      next,
      back,
      reset,
      canBack,
      transition,
    }
  },
})
</script>

<style lang="postcss">
.dropdown__group {
  &-btn {
    @apply flex items-center gap-1;

    &-back {
      @apply flex-shrink-0 text-sm text-body-75 font-medium;
    }
  }

  &-content {
    @apply flex-grow;
  }

  &-next,
  &-back {
    @apply flex-shrink-0;
  }
}
</style>
