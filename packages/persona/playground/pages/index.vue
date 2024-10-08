<template>
  <h1>Dashboard</h1>
  <div class="w-full">
    <p-pdf-viewer :src="PDF_URL" />
  </div>
</template>

<script setup lang="ts">
import PDF_URL from '../../../../src/public/assets/pdf/Calibrator-v3.pdf?url'
</script>
