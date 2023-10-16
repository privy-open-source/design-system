<template>
  <div
    v-if="title || titleActionLabel || collapsible"
    class="sidebar__title"
    data-testid="sidebar-title"
    :class="{
      'sidebar__title__collapsible': (collapsible && type !== 'narrow'),
      'sidebar__title--collapsed': !isExpand,
    }"
    v-bind="$attrs"
    @click.prevent="toggleExpand">
    <Caption
      v-if="title"
      class="sidebar__title__caption"
      weight="bold"
      transform="capitalize">
      {{ title }}
    </Caption>
    <Text
      v-if="titleActionLabel && titleActionUrl"
      data-testid="sidebar-nav-action"
      class="sidebar__title__action"
      variant="caption"
      :href="titleActionUrl">
      {{ titleActionLabel }}
    </Text>

    <IconArrow
      v-if="collapsible"
      data-testid="sidebar-title-caret"
      class="sidebar__title__caret" />
  </div>
  <Collapse
    v-if="!bottom"
    :model-value="isExpand">
    <Nav
      class="sidebar__nav"
      :class="{ 'sidebar__nav--collapsed' : !isExpand }"
      data-testid="sidebar-nav"
      vertical
      :title="title"
      :title-action-label="titleActionLabel"
      :title-action-url="titleActionUrl"
      :variant="variant"
      :condensed="condensed"
      :align="align">
      <slot />
    </Nav>
  </Collapse>
  <template v-else>
    <Nav
      class="sidebar__nav sidebar__nav--bottom"
      data-testid="sidebar-nav"
      vertical
      :title="title"
      :variant="variant"
      :condensed="condensed"
      :align="align">
      <slot />
    </Nav>
  </template>
</template>

<script lang="ts" setup>
import {
  inject,
  ref,
} from 'vue-demi'
import Nav from '../nav/Nav.vue'
import Caption from '../caption/Caption.vue'
import Text from '../text/Text.vue'
import { SIDEBAR_SETTINGS } from '.'
import Collapse from '../collapse/Collapse.vue'
import IconArrow from '@privyid/persona-icon/vue/chevron-down/16.vue'

defineOptions({
  name        : 'SidebarNav',
  inheritAttrs: false,
})

const props = defineProps({
  title: {
    type   : String,
    default: undefined,
  },
  titleActionLabel: {
    type   : String,
    default: undefined,
  },
  titleActionUrl: {
    type   : String,
    default: undefined,
  },
  bottom: {
    type   : Boolean,
    default: false,
  },
  condensed: {
    type   : Boolean,
    default: false,
  },
  collapsible: {
    type   : Boolean,
    default: false,
  },
})

const settings = inject(SIDEBAR_SETTINGS, undefined, true)
const variant  = settings?.variant
const align    = settings?.align
const type     = settings?.type
const isExpand = ref(true)

function toggleExpand (): void {
  if (props.collapsible)
    isExpand.value = !isExpand.value
}
</script>

<style lang="postcss">
.sidebar {
  &__nav {
    &.nav--pills.nav--vertical {
      @apply pl-0 pr-0;

      .nav__link {
        @apply pr-3;
      }
    }

    .nav__title {
      @apply hidden;
    }

    .nav__subitem &.nav {
      @apply pt-0;
    }
  }

  &&--narrow {
    .nav__link {
      @apply flex-col justify-center text-center text-tn;

      &__label {
        @apply ml-0 mt-3 justify-center break-all;
      }
    }

    .nav--pills {
      .nav__link {
        &:is(.nav__link--icon) {
          @apply p-0;

          .nav__link__icon {
            @apply rounded p-3 inline-block;
          }

          .nav__link__label {
            @apply mt-0 px-1 pb-3;
          }

          &.nav__link--active {
            @apply bg-transparent text-default;
            @apply dark:bg-transparent dark:text-dark-default;

            .nav__link__icon {
              @apply bg-subtle;
              @apply dark:bg-dark-subtle;
            }
          }
        }

        &:not(.nav__link--icon) {
          .nav__link__icon {
            @apply hidden;
          }

          .nav__link__label {
            @apply mt-0;
          }
        }
      }
    }

    .nav--tabs {
      .nav__link {
        @apply px-0;

        &--active {
          @apply bg-default;
          @apply dark:bg-dark-default;
        }

        &__label {
          @apply px-2;
        }
      }
    }

    .nav__title {
      @apply hidden;
    }
  }

  &__title {
    @apply relative z-1 flex items-center -mb-9 px-3 mt-5 justify-end;

    &__caption {
      @apply grow;
    }

    &__action {
      @apply shrink-0;
    }

    &__collapsible {
      @apply cursor-pointer select-none;
    }

    &__caret {
      @apply absolute right-2 rotate-180 origin-center ease-in-out duration-150;
    }

    &&--collapsed {
      .sidebar__title__caret {
        @apply rotate-0;
      }
    }

    &:is(&__collapsible) {
      a {
        @apply mr-5;
      }
    }

    .caption {
      @apply text-subtle;
      @apply dark:text-dark-subtle;
    }
  }
}
</style>
