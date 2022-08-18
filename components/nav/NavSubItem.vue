<template>
  <li
    data-testid="nav-subitem"
    :class="classNames">
    <div class="nav__subitem__parent">
      <span
        v-if="$slots.icon"
        class="nav__link__icon">
        <slot name="icon" />
      </span>
      <span class="nav__link__label">
        {{ text }}
      </span>
    </div>
    <slot />
  </li>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue-demi'

export default defineComponent({
  props: {
    text: {
      type   : String,
      default: undefined,
    },
  },

  setup (props, { slots }) {
    const classNames = computed(() => {
      const result: string[] = ['nav__subitem']

      if (slots.icon)
        result.push('nav__subitem--icon')

      return result
    })

    return { classNames }
  },
})
</script>

<style lang="postcss">
.nav {
  &__subitem {
    @apply block text-base text-body-50;

    &__parent {
      @apply flex flex-row items-center p-3 border border-transparent cursor-pointer;
    }

    .nav {
      @apply pt-0 ml-5;
    }

    &&--icon {
      .nav {
        @apply ml-5;
      }

      .nav__link__icon {
        @apply grow-0;
      }

      .nav__link__label {
        @apply shrink ml-3 w-full;

        .badge {
          @apply ml-auto;
        }
      }
    }
  }
}
</style>
