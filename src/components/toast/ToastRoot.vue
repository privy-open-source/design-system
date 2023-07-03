<template>
  <div>
    <template
      v-for="item in groups.values()"
      :key="item.position">
      <ToastGroup
        :ref="item.ref"
        :position="item.position" />
    </template>
  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  Ref,
  shallowRef,
  triggerRef,
  nextTick,
} from 'vue-demi'
import ToastGroup from './ToastContainer.vue'
import { ToastOption, ToastPositionVariant } from '.'

type ToastInstance = InstanceType<typeof ToastGroup>
type ToastGroupMap = Map<ToastPositionVariant, {
  position: ToastPositionVariant,
  ref: Ref<ToastInstance[]>,
}>

export default defineComponent({
  components: { ToastGroup },
  setup () {
    const groups = shallowRef<ToastGroupMap>(new Map())

    async function add (options: ToastOption) {
      const position = options.position ?? 'top-right'

      let group = groups.value.get(position)

      if (!group) {
        group = { ref: ref(), position }
        groups.value.set(position, group)

        triggerRef(groups)

        await nextTick()
      }

      group.ref.value?.at(0).add(options)
    }

    return {
      add,
      groups,
    }
  },
})

</script>
