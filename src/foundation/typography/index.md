<script setup>
  import pCaption from '../../components/caption/Caption.vue'
  import pHeading from '../../components/heading/Heading.vue'
  import { ref, computed } from "vue-demi"
</script>

# Typography

<div class="flex">
  <div class="w-2/3 text-center mx-auto">
    <div class="pb-8 pt-20 space-y-1">
      <p-heading element="h4">DM Sans</p-heading>
      <p-caption class="!text-default" weight="bold">FONT SIZE / LINE HEIGHT / LETTER SPACING</p-caption>
      <p-caption><span class="!text-lightblue-50">Tailwind FONT-SIZE</span> • Tailwind LINE-HEIGHT • Tailwind LETTER-SPACING</p-caption>
    </div>    
  </div>
</div>

## Font Size

## Letter Spacing

<div class="pb-8 pt-20 space-y-1">
  <p-heading element="h5" class="mb-0">Size</p-heading>
  <p-caption class="!text-lightblue-50">class-name</p-caption>
  <p-caption class="!text-subtle">spacing</p-caption>
</div>

<div class="grid grid-cols-1 gap-y-8 mt-8">
  <div class="w-full">
    <p class="font-bold text-xl text-muted tracking-tighter">The quick brown fox jumps over the lazy dog.</p>
    <p-heading element="h6" class="!text-default mt-2 !text-base">Tighter</p-heading>
    <p-caption class="!text-lightblue-50 my-1">tracking-tighter</p-caption>
    <p-caption class="!text-subtle">-0.8px</p-caption>
  </div>
  <div class="w-full">
    <p class="font-bold text-xl text-muted tracking-tight">The quick brown fox jumps over the lazy dog.</p>
    <p-heading element="h6" class="!text-default mt-2 !text-base">Tight</p-heading>
    <p-caption class="!text-lightblue-50 my-1">tracking-tight</p-caption>
    <p-caption class="!text-subtle">-0.4px</p-caption>
  </div>
  <div class="w-full">
    <p class="font-bold text-xl text-muted tracking-normal">The quick brown fox jumps over the lazy dog.</p>
    <p-heading element="h6" class="!text-default mt-2 !text-base">Normal</p-heading>
    <p-caption class="!text-lightblue-50 my-1">tracking-normal</p-caption>
    <p-caption class="!text-subtle" weight="bold">0px</p-caption>
  </div>
  <div class="w-full">
    <p class="font-bold text-lg text-muted tracking-wide">The quick brown fox jumps over the lazy dog.</p>
    <p-heading element="h6" class="!text-default mt-2 !text-base">Wide</p-heading>
    <p-caption class="!text-lightblue-50 my-1">tracking-wide</p-caption>
    <p-caption class="!text-subtle" weight="bold">0.4px</p-caption>
  </div>
  <div class="w-full">
    <p class="font-bold text-lg text-muted tracking-wider">The quick brown fox jumps over the lazy dog.</p>
    <p-heading element="h6" class="!text-default mt-2 !text-base">Wider</p-heading>
    <p-caption class="!text-lightblue-50 my-1">tracking-wider</p-caption>
    <p-caption class="!text-subtle" weight="bold">0.8px</p-caption>
  </div>
  <div class="w-full">
    <p class="font-bold text-xl text-muted tracking-widest">The quick brown fox jumps over the lazy dog.</p>
    <p-heading element="h6" class="!text-default mt-2 !text-base">Widest</p-heading>
    <p-caption class="!text-lightblue-50 my-1">tracking-widest</p-caption>
    <p-caption class="!text-subtle" weight="bold">1.6px</p-caption>
  </div>
</div>

## Line Height

## Element