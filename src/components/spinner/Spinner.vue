<template>
  <svg
    data-testid="spinner"
    class="spinner spinner-basic"
    width="1em"
    height="1em"
    viewBox="0 0 19 19"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg">
    <rect
      class="spinner-basic__bar"
      x="8.125"
      width="2.5"
      height="6.25"
      rx="1.25"
      fill="currentColor"
      fill-opacity="60%">
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="1s"
        begin="0"
        repeatCount="indefinite" />
    </rect>
    <rect
      class="spinner-basic__bar"
      x="15.1202"
      y="1.86199"
      width="2.5"
      height="6.25"
      rx="1.25"
      transform="rotate(45 15.1202 1.86199)"
      fill="currentColor"
      fill-opacity="60%">
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="1s"
        begin="0.125s"
        repeatCount="indefinite" />
    </rect>
    <rect
      class="spinner-basic__bar"
      x="18.75"
      y="8.125"
      width="2.5"
      height="6.25"
      rx="1.25"
      transform="rotate(90 18.75 8.125)"
      fill="currentColor"
      fill-opacity="60%">
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="1s"
        begin="0.250s"
        repeatCount="indefinite" />
    </rect>
    <rect
      class="spinner-basic__bar"
      x="16.888"
      y="15.1202"
      width="2.5"
      height="6.25"
      rx="1.25"
      transform="rotate(135 16.888 15.1202)"
      fill="currentColor"
      fill-opacity="60%">
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="1s"
        begin="0.375s"
        repeatCount="indefinite" />
    </rect>
    <rect
      class="spinner-basic__bar"
      x="8.125"
      y="12.5"
      width="2.5"
      height="6.25"
      rx="1.25"
      fill="currentColor"
      fill-opacity="60%">
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="1s"
        begin="0.500s"
        repeatCount="indefinite" />
    </rect>
    <rect
      class="spinner-basic__bar"
      x="6.2814"
      y="10.7008"
      width="2.5"
      height="6.25"
      rx="1.25"
      transform="rotate(45 6.2814 10.7008)"
      fill="currentColor"
      fill-opacity="60%">
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="1s"
        begin="0.625s"
        repeatCount="indefinite" />
    </rect>
    <rect
      class="spinner-basic__bar"
      x="6.25"
      y="8.125"
      width="2.5"
      height="6.25"
      rx="1.25"
      transform="rotate(90 6.25 8.125)"
      fill="currentColor"
      fill-opacity="60%">
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="1s"
        begin="0.750s"
        repeatCount="indefinite" />
    </rect>
    <rect
      class="spinner-basic__bar"
      x="8.04917"
      y="6.2814"
      width="2.5"
      height="6.25"
      rx="1.25"
      transform="rotate(135 8.04917 6.2814)"
      fill="currentColor"
      fill-opacity="60%">
      <animate
        attributeName="opacity"
        values="1;0"
        keyTimes="0;1"
        dur="1s"
        begin="0.875s"
        repeatCount="indefinite" />
    </rect>
  </svg>
</template>

<script lang="ts" setup>
//
</script>
