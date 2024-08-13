<template>
  <svg
    data-testid="spinner"
    class="spinner spinner--ringgo"
    width="1em"
    height="1em"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg">
    <circle
      class="spinner-ringgo__track"
      cx="9"
      cy="9"
      r="8"
      fill="transparent"
      stroke-width="2px"
      stroke-opacity="10%"
      stroke="currentColor" />
    <g>
      <circle
        class="spinner-ringgo__ring"
        cx="9"
        cy="9"
        r="8"
        stroke-dasharray="50.2654825"
        stroke-linecap="round"
        stroke-width="2px"
        fill="transparent"
        stroke="currentColor">
        <animate
          attributeName="stroke-dashoffset"
          values="45.2389342;5.02654825;45.2389342"
          keyTimes="0;.5;1"
          dur="1.5s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          values="0 9 9;45 9 9;360 9 9"
          dur="1.5s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
      </circle>
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="rotate"
        from="0 9 9"
        to="360 9 9"
        dur="2s"
        repeatCount="indefinite" />
    </g>
  </svg>
</template>

<script lang="ts" setup>
/**
 * Special thank to: Glenn McComb
 * https://glennmccomb.com/articles/building-a-pure-css-animated-svg-spinner/
 */
</script>
