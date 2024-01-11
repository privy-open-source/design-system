<template>
  <svg
    data-testid="spinner"
    class="spinner spinner-ring"
    width="1em"
    height="1em"
    viewBox="0 0 18 18"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="9"
      cy="9"
      r="8"
      stroke-dasharray="50.2654825"
      stroke-dashoffset="10"
      stroke-linecap="round"
      stroke-width="2px"
      fill="transparent"
      stroke="currentColor">
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="rotate"
        from="0 9 9"
        to="360 9 9"
        dur="1s"
        repeatCount="indefinite" />
    </circle>
  </svg>
</template>

<script lang="ts" setup>
//
</script>
