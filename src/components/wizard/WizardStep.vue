<script lang="ts">
import type { PropType } from 'vue-demi'
import { defineComponent } from 'vue-demi'
import type { TravelHook } from '../steps'

export default defineComponent({
  name : 'WizardStep',
  props: {
    title: {
      type   : String,
      default: '',
    },
    onBeforePrev: {
      type   : Function as PropType<TravelHook>,
      default: undefined,
    },
    onBeforeNext: {
      type   : Function as PropType<TravelHook>,
      default: undefined,
    },
  },
})
</script>
