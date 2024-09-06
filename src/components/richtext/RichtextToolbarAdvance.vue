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
import History from './controls/History.vue'
import TextAlign from './controls/TextAlign.vue'
import TextHeading from './controls/TextHeading.vue'
import TextFormat from './controls/TextFormat.vue'
import FontFamily from './controls/FontFamily.vue'
import FontSize from './controls/FontSize.vue'
import Highlight from './controls/Highlight.vue'
import Image from './controls/Image.vue'
import Table from './controls/Table.vue'
import Link from './controls/Link.vue'
import List from './controls/List.vue'
</script>
