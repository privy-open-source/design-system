<template>
  <div data-testid="notify">
    <template
      v-for="item in groups.values()"
      :key="item.position">
      <NotifyGroup
        :ref="(el: any) => { item.ref.value = el}"
        :position="item.position" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue-demi'
import {
  ref,
  shallowRef,
  triggerRef,
  nextTick,
} from 'vue-demi'
import NotifyGroup from './NotifyGroup.vue'
import type { NotifyOption, NotifyPositionVariant } from '.'

type NotifyGroupInstance = InstanceType<typeof NotifyGroup>

type NotifyGroupMap = Map<NotifyPositionVariant, {
  position: NotifyPositionVariant,
  ref: Ref<NotifyGroupInstance>,
}>

const groups = shallowRef<NotifyGroupMap>(new Map())

async function show (options: NotifyOption) {
  const position = options.position ?? 'bottom-left'

  let group = groups.value.get(position)

  if (!group) {
    group = { ref: ref(), position }
    groups.value.set(position, group)

    triggerRef(groups)

    await nextTick()
  }

  return group.ref.value?.show(options)
}

defineExpose({ show })
</script>
