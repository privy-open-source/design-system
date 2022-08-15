<template>
  <Nav
    :title="title"
    vertical
    :variant="variant"
    :align="align">
    <slot />
  </Nav>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue-demi'
import Nav from '../nav/Nav.vue'
import { NAV_SETUP } from './Sidebar.vue'

export default defineComponent({
  components: { Nav },
  props     : {
    title: {
      type   : String,
      default: undefined,
    },
  },

  setup () {
    const settings = inject(NAV_SETUP, undefined, true)
    const variant  = settings?.variant
    const align    = settings?.align

    return {
      variant,
      align,
    }
  },

})
</script>
