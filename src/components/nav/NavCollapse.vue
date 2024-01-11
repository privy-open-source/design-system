<template>
  <NavItem
    ref="root"
    class="nav__collapse"
    :class="{ 'nav__collapse--expand': isExpand }"
    data-testid="nav-collapse"
    v-bind="$attrs"
    @click.prevent="toggleExpand">
    <template #icon>
      <IconMore class="nav__collapse__icon" />
    </template>
    {{ isExpand ? showLessText : showMoreText }}
  </NavItem>
  <Collapse :model-value="isExpand">
    <slot />
  </Collapse>
</template>

<script lang="ts" setup>
import Collapse from '../collapse/Collapse.vue'
import NavItem from '../nav/NavItem.vue'
import IconMore from '@privyid/persona-icon/vue/chevron-down/20.vue'
import { onMounted, ref } from 'vue-demi'

defineProps({
  showMoreText: {
    type   : String,
    default: 'More',
  },
  showLessText: {
    type   : String,
    default: 'Less',
  },
})

const root     = ref<InstanceType<typeof NavItem>>()
const isExpand = ref(false)

function toggleExpand () {
  isExpand.value = !isExpand.value
}

onMounted(() => {
  if (root.value.$el) {
    isExpand.value = root.value.$el
      .querySelectorAll('.router-link-active:not(.nav__link--exact),.router-link-exact-active.nav__link--exact')
      .length > 0
  }
})
</script>

<style lang="postcss">
.nav__collapse {
  @apply select-none;

  &__icon {
    @apply transition-transform duration-150 ease-in-out;
  }

  &--expand {
    .nav__collapse__icon {
      @apply rotate-180;
    }
  }
}
</style>
