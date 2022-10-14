<template>
  <div
    data-testid="tabs"
    class="tabs"
    :class="classNames">
    <nav
      data-testid="tabs-nav-wrapper"
      class="tabs__nav"
      :class="navWrapperClass">
      <Nav
        class="nav"
        data-testid="tabs-nav"
        :variant="variant"
        :align="align"
        :vertical="vertical"
        :justified="justified"
        :fill="fill">
        <NavItem
          v-for="(tab, i) in tabs"
          :key="i"
          data-testid="tab"
          :disabled="tab.disabled"
          :active="i === active"
          :class="[{ 'nav__item--no-icon' : (!tab.slots.icon) }, { 'nav__item--no-label' : (!tab.title && !tab.slots.title) }]"
          @click="selectTab(i, tab)">
          <template #icon>
            <template v-if="tab.slots.icon">
              <component :is="tab.slots.icon" />
            </template>
          </template>
          <template v-if="tab.slots.title">
            <component :is="tab.slots.title" />
          </template>
          <template v-else>
            {{ tab.title }}
          </template>
        </NavItem>
      </Nav>
    </nav>

    <div class="tabs__content">
      <tab-content :active="active">
        <slot />
      </tab-content>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  Slots,
} from 'vue-demi'
import Nav, { StyleVariant as TabsStyleVariant, AlignVariant as TabsAlignVariant } from '../nav/Nav.vue'
import NavItem from '../nav/NavItem.vue'
import TabContent from './TabContent.vue'
import { useVModel } from '../input/use-input'
import { findAllChildren, toBoolean } from '../utils/vnode'

interface TabContext {
  title: string,
  disabled: boolean,
  slots: Slots,
}

export default defineComponent({
  components: {
    Nav,
    NavItem,
    TabContent,
  },
  props: {
    variant: {
      type   : String as PropType<TabsStyleVariant>,
      default: 'tabs',
    },
    align: {
      type   : String as PropType<TabsAlignVariant>,
      default: 'left',
    },
    vertical: {
      type   : Boolean,
      default: false,
    },
    fill: {
      type   : Boolean,
      default: false,
    },
    justified: {
      type   : Boolean,
      default: false,
    },
    navWrapperClass: {
      type   : String,
      default: undefined,
    },
    modelValue: {
      type   : Number,
      default: 0,
    },
  },
  setup (props, { slots }) {
    const classNames = computed(() => {
      const result: string[] = []

      if (props.vertical && props.align)
        result.push(`tabs--vertical-align-${props.align}`)

      return result
    })

    const active = useVModel(props)
    const tabs   = computed<TabContext[]>(() => {
      const vnodes = slots.default ? slots.default() : []
      const tabs   = findAllChildren(vnodes, 'Tab')

      return tabs.map((vnode) => {
        return {
          title   : vnode.props?.title,
          disabled: toBoolean(vnode.props?.disabled),
          slots   : vnode.children as Slots,
        }
      })
    })

    function selectTab (index: number, tab: TabContext) {
      if (!tab.disabled)
        active.value = index
    }

    return {
      classNames,
      active,
      tabs,
      selectTab,
    }
  },
})

</script>

<style lang="postcss">
/**
* Component Name: Tabs
* Component URI : https://www.figma.com/file/tVQNwXeQkMtZlX1x3qjJu8/B-A-S-E-%2F-Style-Guide?node-id=262%3A2160
* Date Created  : Aug 11, 2022
* Last Update   : Aug 12, 2022
*/
.tabs {

  /**
  * tab content
  */
  &__content {
    @apply py-6 w-full;
  }

  /**
  * set border bottom
  * for navigation
  */
  .nav {
    @apply border-b border-b-secondary-25/50;

    &__link {
      .badge {
        @apply ml-2;
      }
    }

    &--vertical {
      @apply pb-2 border-b-0 border-r border-r-secondary-25/50;
    }
  }

  /**
  * alignment tabs in vertical
  * orientation
  */
  &--vertical-align-right,
  &--vertical-align-left {
    @apply w-full flex items-start;

    .tabs {
      &__nav {
        @apply shrink-0;
      }

      &__content {
        @apply grow p-6;
      }
    }
  }

  /**
  * right align for
  * vertical navigation
  */
  &--vertical-align-right {
    @apply flex-row-reverse;

    .nav {
      @apply border-b-0 border-r-0 border-l border-l-secondary-25/50;
    }
  }
}
</style>
