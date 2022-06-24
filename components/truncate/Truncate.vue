<template>
  <transition
    name="fade"
    mode="out-in">
    <span :key="`${expand}`">
      {{ viewText }}
      <template v-if="showMore">
        <a
          href="#"
          @click.prevent="toggle">
          {{ expand ? showLessText : showMoreText }}
        </a>
      </template>
    </span>
  </transition>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
} from 'vue-demi'

export default defineComponent({
  props: {
    text: {
      type    : String,
      required: true,
    },
    length: {
      type   : [Number, String],
      default: 100,
    },
    omission: {
      type   : String,
      default: '...',
    },
    showMore: {
      type   : Boolean,
      default: false,
    },
    showMoreText: {
      type   : String,
      default: 'Show More',
    },
    showLessText: {
      type   : String,
      default: 'Show Less',
    },
  },
  setup (props) {
    const expand   = ref(false)
    const viewText = computed(() => {
      const length = Number.parseInt(`${props.length}`) || 100

      if (expand.value || props.text.length <= length)
        return props.text

      return `${props.text.slice(0, length - props.omission.length)}${props.omission}`
    })

    function toggle () {
      expand.value = !expand.value
    }

    return {
      expand,
      viewText,
      toggle,
    }
  },
})
</script>
