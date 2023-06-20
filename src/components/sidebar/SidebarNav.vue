<template>
  <div
    v-if="title"
    class="sidebar__title"
    data-testid="sidebar-title"
    :class="{ 'sidebar__title__collapsible' : (collapsible && type !== 'narrow') }"
    @click.prevent="collapse">
    <Caption
      weight="bold"
      transform="capitalize">
      {{ title }}
    </Caption>
    <Text
      v-if="titleActionLabel && titleActionUrl"
      data-testid="sidebar-nav-action"
      variant="caption"
      :href="titleActionUrl">
      {{ titleActionLabel }}
    </Text>

    <IconArrow
      v-if="collapsible"
      data-testid="sidebar-title-caret"
      class="sidebar__title__caret" />
  </div>
  <Nav
    v-if="!bottom"
    class="sidebar__nav"
    data-testid="sidebar-nav"
    vertical
    :title="title"
    :variant="variant"
    :condensed="condensed"
    :align="align">
    <slot />
  </Nav>
  <template v-else>
    <div class="sidebar__bottom">
      <Nav
        class="sidebar__nav"
        data-testid="sidebar-nav"
        vertical
        :title="title"
        :variant="variant"
        :condensed="condensed"
        :align="align"
        :class="classNames">
        <slot />
      </Nav>
    </div>
  </template>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
} from 'vue-demi'
import Nav from '../nav/Nav.vue'
import Caption from '../caption/Caption.vue'
import Text from '../text/Text.vue'
import { SIDEBAR_SETTINGS } from '.'
import IconArrow from '@privyid/persona-icon/vue/chevron-down/16.vue'

export default defineComponent({
  components: {
    Nav, Caption, Text, IconArrow,
  },
  props: {
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
  },

  setup (props) {
    const settings = inject(SIDEBAR_SETTINGS, undefined, true)
    const variant  = settings?.variant
    const align    = settings?.align
    const type     = settings?.type

    const classNames = computed(() => {
      const result: string[] = ['']

      if (props.bottom)
        result.push('sidebar__nav--bottom')

      return result
    })

    function collapse (event: Event): void {
      if (props.collapsible && props.title && type !== 'narrow') {
        const title = (event.target as HTMLDivElement).closest('.sidebar__title')

        title?.classList.toggle('sidebar__title--collapsed')
        title?.nextElementSibling?.classList.toggle('sidebar__nav--collapsed')
      }
    }

    return {
      variant,
      align,
      type,
      classNames,
      collapse,
    }
  },

})
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

    &&--collapsed {
      @apply hidden;
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
    @apply relative z-1 flex items-center justify-between -mb-9 px-3 mt-5;

    &__collapsible {
      @apply cursor-pointer;
    }

    &__caret {
      @apply absolute right-2 rotate-180 origin-center ease-in-out duration-150;
    }

    &&--collapsed {
      .sidebar__title__caret {
        @apply rotate-0 ease-in-out duration-150;
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
