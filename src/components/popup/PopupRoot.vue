<template>
  <div>
    <template
      v-for="item in groups.values()"
      :key="item.position">
      <PopupGroup
        :ref="item.ref"
        :position="item.position" />
    </template>
  </div>
</template>

<script lang="ts">
import type { Ref } from 'vue-demi'
import {
  ref,
  defineComponent,
  shallowRef,
  triggerRef,
  nextTick,
} from 'vue-demi'
import PopupGroup from './PopupContainer.vue'
import type { PopupOption, PopupPositionVariant } from '.'

type PopupInstance = InstanceType<typeof PopupGroup>
type PopupGroupMap = Map<PopupPositionVariant, {
  position: PopupPositionVariant,
  ref: Ref<PopupInstance[]>,
}>

export default defineComponent({
  components: { PopupGroup },
  setup () {
    const groups = shallowRef<PopupGroupMap>(new Map())

    async function add (options: PopupOption) {
      const position = options.position
        || 'bottom-left'

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
