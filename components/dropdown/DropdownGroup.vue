<template>
  <Transition :name="transition" mode="out-in">
    <div class="dropdown__group" :key="tree._level">
      <template v-if="canBack" key="btn-back">
        <DropdownItem
          class="dropdown__groupBtn dropdown__groupBtnBack"
          @click="back()">
          <slot name="button-back">
            <IconBack class="dropdown__groupNext" />
            <div class="dropdown__groupContent">
              Back
            </div>
          </slot>
        </DropdownItem>
      </template>

      <template v-if="!isRoot" key="btn-next">
        <DropdownItem
          class="dropdown__groupBtn"
          @click="next()">
          <slot name="button-content">
            <div class="dropdown__groupContent">
              {{ text }}
            </div>
            <IconNext class="dropdown__groupNext" />
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
import DropdownItem from "./DropdownItem.vue"
import IconNext from "@carbon/icons-vue/lib/chevron--right/16"
import IconBack from "@carbon/icons-vue/lib/chevron--left/16"
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
  Slot
} from "vue-demi"

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

const DROPDOWN_TREE: InjectionKey<DropdownContext> = Symbol()

export default defineComponent({
  components: {
    DropdownItem,
    IconNext,
    IconBack,
  },
  props: {
    text: {
      type: String,
    },
    backText: {
      type   : String,
      default: 'Back',
    }
  },
  setup (props, { slots }) {
    const context    = inject(DROPDOWN_TREE, undefined)
    const transition = ref<'slide-left' | 'slide-right' | 'none'>('slide-left')

    const isRoot = computed(() => {
      return context === undefined
    })

    const tree: DropdownContext['tree'] = context?.tree ?? shallowRef({
      _level: 0,
      slot  : slots.default
    })

    const next: DropdownContext['next'] = () => {
      tree.value = {
        _level: tree.value._level+1,
        prev  : tree.value,
        slot  : slots.default,
      }
    }

    const back: DropdownContext['back'] = () => {
      if (tree.value.prev) {
        tree.value = tree.value.prev
      }
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
      transition
    }
  }
})
</script>

<style lang="postcss">
.dropdown__group {
  &Btn {
    @apply flex items-center gap-1;

    &Back {
      @apply flex-shrink-0 text-sm text-body-75 font-medium;
    }
  }

  &Content {
    @apply flex-grow;
  }

  &Next,
  &Back {
    @apply flex-shrink-0;
  }
}
</style>
