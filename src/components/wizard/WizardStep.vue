<script lang="ts">
import { defineComponent, PropType } from 'vue-demi'
import { TravelHook } from '../steps/utils/hook'

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
