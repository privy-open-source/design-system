<template>
  <div class="richtext__controls-group">
    <History />
    <TextHeading />
    <FontSize />
    <FontFamily />
  </div>
  <div class="richtext__controls-group">
    <TextFormat />
  </div>
  <div class="richtext__controls-group">
    <TextAlign />
    <List />
  </div>
  <div class="richtext__controls-group">
    <Highlight />
  </div>
  <div class="richtext__controls-group">
    <Link />
    <Image />
    <Table />
  </div>
</template>

<script lang="ts" setup>
import History from './control/RichtextControlHistory.vue'
import TextAlign from './control/RichtextControlTextAlign.vue'
import TextHeading from './control/RichtextControlTextHeading.vue'
import TextFormat from './control/RichtextControlTextFormat.vue'
import FontFamily from './control/RichtextControlFontFamily.vue'
import FontSize from './control/RichtextControlFontSize.vue'
import Highlight from './control/RichtextControlHighlight.vue'
import Image from './control/RichtextControlImage.vue'
import Table from './control/RichtextControlTable.vue'
import Link from './control/RichtextControlLink.vue'
import List from './control/RichtextControlList.vue'
</script>
