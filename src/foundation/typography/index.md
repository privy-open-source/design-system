---
title: Typography · Foundation
description: Collections of typography library
---

<script setup>
  import pCaption from '../../components/caption/Caption.vue'
  import pHeading from '../../components/heading/Heading.vue'
  import pSubheading from '../../components/subheading/Subheading.vue'
  import pText from '../../components/text/Text.vue'
  import { ref, computed } from "vue-demi"
</script>

# Typography

<div class="flex">
  <div class="w-2/3">
    <div class="pb-8 pt-20 space-y-1">
      Persona's typeface is using DM Sans. This typeface is available on google fonts.
    </div>    
  </div>
</div>

## Line Height
<div class="pb-8 pt-20 space-y-1">
  <p-heading element="h5" class="mb-0">Size</p-heading>
  <p-caption class="!text-lightblue-50">token-name</p-caption>
  <p-caption class="!text-subtle">line-height / class-name</p-caption>
</div>

<div class="grid grid-cols-1 gap-y-8 mt-8">
  <div class="w-full">
    <p class="text-xl text-muted lh-tightest leading-tightest">
      A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.
    </p>
    <p-heading element="h6" class="!text-default mt-2 !text-base">Tightest</p-heading>
    <p-caption size="tn" class="!text-lightblue-50 my-1">lineHeight.tightest</p-caption>
    <p-caption size="tn" class="!text-subtle">-1.33 / leading-tightest</p-caption>
  </div>
  <div class="w-full">
    <p class="text-xl text-muted lh-tighter leading-tighter">
      A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.
    </p>
    <p-heading element="h6" class="!text-default mt-2 !text-base">Tighter</p-heading>
    <p-caption size="tn" class="!text-lightblue-50 my-1">lineHeight.tighter</p-caption>
    <p-caption size="tn" class="!text-subtle">1.42 / leading-tighter</p-caption>
  </div>
  <div class="w-full">
    <p class="text-xl text-muted lh-tight leading-tight">
      A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.
    </p>
    <p-heading element="h6" class="!text-default mt-2 !text-base">Tight</p-heading>
    <p-caption size="tn" class="!text-lightblue-50 my-1">lineHeight.tight</p-caption>
    <p-caption size="tn" class="!text-subtle" weight="bold">1.45 / leading-tight</p-caption>
  </div>
  <div class="w-full">
    <p class="text-xl text-muted lh-normal leading-normal">
      A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.
    </p>
    <p-heading element="h6" class="!text-default mt-2 !text-base">Normal</p-heading>
    <p-caption size="tn" class="!text-lightblue-50 my-1">lineHeight.normal</p-caption>
    <p-caption size="tn" class="!text-subtle" weight="bold">1.5 / leading-normal</p-caption>
  </div>
  <div class="w-full">
    <p class="text-xl text-muted lh-wide leading-wide">
      A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.
    </p>
    <p-heading element="h6" class="!text-default mt-2 !text-base">Wide</p-heading>
    <p-caption size="tn" class="!text-lightblue-50 my-1">lineHeight.wide</p-caption>
    <p-caption size="tn" class="!text-subtle" weight="bold">Auto / leading-wide</p-caption>
  </div>
</div>

## Letter Spacing

<div class="pb-8 pt-20 space-y-1">
  <p-heading element="h5" class="mb-0">Size</p-heading>
  <p-caption class="!text-lightblue-50">token-name</p-caption>
  <p-caption class="!text-subtle">spacing / class-name</p-caption>
</div>

<div class="grid grid-cols-1 gap-y-8 mt-8">
  <div class="w-full">
    <p class="font-bold text-xl text-muted tracking-tighter">The quick brown fox jumps over the lazy dog.</p>
    <p-heading element="h6" class="!text-default mt-2 !text-base">Tighter</p-heading>
    <p-caption size="tn" class="!text-lightblue-50 my-1">letterSpacing.tighter</p-caption>
    <p-caption size="tn" class="!text-subtle">-0.4px / tracking-tighter</p-caption>
  </div>
  <div class="w-full">
    <p class="font-bold text-xl text-muted tracking-tight">The quick brown fox jumps over the lazy dog.</p>
    <p-heading element="h6" class="!text-default mt-2 !text-base">Tight</p-heading>
    <p-caption size="tn" class="!text-lightblue-50 my-1">letterSpacing.tight</p-caption>
    <p-caption size="tn" class="!text-subtle">-0.2px / tracking-tight</p-caption>
  </div>
  <div class="w-full">
    <p class="font-bold text-xl text-muted tracking-normal">The quick brown fox jumps over the lazy dog.</p>
    <p-heading element="h6" class="!text-default mt-2 !text-base">Normal</p-heading>
    <p-caption size="tn" class="!text-lightblue-50 my-1">letterSpacing.normal</p-caption>
    <p-caption size="tn" class="!text-subtle" weight="bold">0px / tracking-normal</p-caption>
  </div>
  <div class="w-full">
    <p class="font-bold text-xl text-muted tracking-wide">The quick brown fox jumps over the lazy dog.</p>
    <p-heading element="h6" class="!text-default mt-2 !text-base">Wide</p-heading>
    <p-caption size="tn" class="!text-lightblue-50 my-1">letterSpacing.wide</p-caption>
    <p-caption size="tn" class="!text-subtle" weight="bold">0.2px / tracking-wide</p-caption>
  </div>
  <div class="w-full">
    <p class="font-bold text-xl text-muted tracking-wider">The quick brown fox jumps over the lazy dog.</p>
    <p-heading element="h6" class="!text-default mt-2 !text-base">Wider</p-heading>
    <p-caption size="tn" class="!text-lightblue-50 my-1">letterSpacing.wider</p-caption>
    <p-caption size="tn" class="!text-subtle" weight="bold">0.4px / tracking-wider</p-caption>
  </div>
  <div class="w-full">
    <p class="font-bold text-xl text-muted tracking-widest">The quick brown fox jumps over the lazy dog.</p>
    <p-heading element="h6" class="!text-default mt-2 !text-base">Widest</p-heading>
    <p-caption size="tn" class="!text-lightblue-50 my-1">letterSpacing.widest</p-caption>
    <p-caption size="tn" class="!text-subtle" weight="bold">0.8px / tracking-widest</p-caption>
  </div>
</div>

## Font Size

<div class="pb-8 pt-20 space-y-1">
  <p-heading element="h5" class="mb-0">Size</p-heading>
  <p-caption class="!text-subtle"><strong class="!text-lightblue-50">token-name</strong> / class-name</p-caption>
  <p-caption class="!text-subtle" weight="bold">font-size / line-height</p-caption>
  <p-caption class="!text-subtle">letter-spacing</p-caption>
</div>

<div class="grid grid-cols-1 gap-y-8 mt-8">
  <div class="w-full">
    <div class="font-bold text-tn text-muted py-4">The quick brown fox jumps over the lazy dog.</div>
    <p-heading element="h6" class="!text-default my-2 !text-base">tn</p-heading>
    <p-caption size="tn" class="!text-subtle"><strong class="!text-lightblue-50">fontSize.tn</strong> / text-tn</p-caption>
    <p-caption size="tn" class="!text-subtle my-1" weight="bold">11px / $lineHeight.snug</p-caption>
    <p-caption size="tn" class="!text-subtle">$letterSpacing.wider</p-caption>
  </div>
  <div class="w-full">
    <div class="font-bold text-xs text-muted py-4">The quick brown fox jumps over the lazy dog.</div>
    <p-heading element="h6" class="!text-default my-2 !text-base">xs</p-heading>
    <p-caption size="tn" class="!text-subtle"><strong class="!text-lightblue-50">fontSize.xs</strong> / text-xs</p-caption>
    <p-caption size="tn" class="!text-subtle my-1" weight="bold">12px / $lineHeight.snug</p-caption>
    <p-caption size="tn" class="!text-subtle">$letterSpacing.wide</p-caption>
  </div>
  <div class="w-full">
    <div class="font-bold text-sm text-muted py-4">The quick brown fox jumps over the lazy dog.</div>
    <p-heading element="h6" class="!text-default my-2 !text-base">sm</p-heading>
    <p-caption size="tn" class="!text-subtle"><strong class="!text-lightblue-50">fontSize.sm</strong> / text-sm</p-caption>
    <p-caption size="tn" class="!text-subtle my-1" weight="bold">14px / $lineHeight.snug</p-caption>
    <p-caption size="tn" class="!text-subtle">$letterSpacing.normal</p-caption>
  </div>
  <div class="w-full">
    <div class="font-bold text-base text-muted py-4">The quick brown fox jumps over the lazy dog.</div>
    <p-heading element="h6" class="!text-default my-2 !text-base">base</p-heading>
    <p-caption size="tn" class="!text-subtle"><strong class="!text-lightblue-50">fontSize.base</strong> / text-base</p-caption>
    <p-caption size="tn" class="!text-subtle my-1" weight="bold">14px / $lineHeight.snug</p-caption>
    <p-caption size="tn" class="!text-subtle">$letterSpacing.normal</p-caption>
  </div>
  <div class="w-full">
    <div class="font-bold text-xl text-muted py-4">The quick brown fox jumps over the lazy dog.</div>
    <p-heading element="h6" class="!text-default my-2 !text-base">xl</p-heading>
    <p-caption size="tn" class="!text-subtle"><strong class="!text-lightblue-50">fontSize.xl</strong> / text-xl</p-caption>
    <p-caption size="tn" class="!text-subtle my-1" weight="bold">20px / $lineHeight.snug</p-caption>
    <p-caption size="tn" class="!text-subtle">$letterSpacing.normal</p-caption>
  </div>
  <div class="w-full">
    <div class="font-bold text-2xl text-muted py-4">The quick brown fox jumps over the lazy dog.</div>
    <p-heading element="h6" class="!text-default my-2 !text-base">2xl</p-heading>
    <p-caption size="tn" class="!text-subtle"><strong class="!text-lightblue-50">fontSize.2xl</strong> / text-2xl</p-caption>
    <p-caption size="tn" class="!text-subtle my-1" weight="bold">24px / $lineHeight.snug</p-caption>
    <p-caption size="tn" class="!text-subtle">$letterSpacing.normal</p-caption>
  </div>
  <div class="w-full">
    <div class="font-bold text-4xl text-muted py-4">The quick brown fox jumps over.</div>
    <p-heading element="h6" class="!text-default my-2 !text-base">4xl</p-heading>
    <p-caption size="tn" class="!text-subtle"><strong class="!text-lightblue-50">fontSize.4xl</strong> / text-4xl</p-caption>
    <p-caption size="tn" class="!text-subtle my-1" weight="bold">36px / $lineHeight.snug</p-caption>
    <p-caption size="tn" class="!text-subtle">$letterSpacing.normal</p-caption>
  </div>
  <div class="w-full">
    <div class="font-bold text-5xl text-muted py-4">The quick brown fox jumps.</div>
    <p-heading element="h6" class="!text-default my-2 !text-base">5xl</p-heading>
    <p-caption size="tn" class="!text-subtle"><strong class="!text-lightblue-50">fontSize.5xl</strong> / text-5xl</p-caption>
    <p-caption size="tn" class="!text-subtle my-1" weight="bold">48px / $lineHeight.snug</p-caption>
    <p-caption size="tn" class="!text-subtle">$letterSpacing.normal</p-caption>
  </div>
  <div class="w-full">
    <div class="font-bold text-6xl text-muted py-4">The quick brown fox.</div>
    <p-heading element="h6" class="!text-default my-2 !text-base">6xl</p-heading>
    <p-caption size="tn" class="!text-subtle"><strong class="!text-lightblue-50">fontSize.6xl</strong> / text-6xl</p-caption>
    <p-caption size="tn" class="!text-subtle my-1" weight="bold">60px / $lineHeight.snug</p-caption>
    <p-caption size="tn" class="!text-subtle">$letterSpacing.tight</p-caption>
  </div>
  <div class="w-full">
    <div class="font-bold text-7xl text-muted py-4">The quick brown.</div>
    <p-heading element="h6" class="!text-default my-2 !text-base">7xl</p-heading>
    <p-caption size="tn" class="!text-subtle"><strong class="!text-lightblue-50">fontSize.7xl</strong> / text-7xl</p-caption>
    <p-caption size="tn" class="!text-subtle my-1" weight="bold">72px / $lineHeight.snug</p-caption>
    <p-caption size="tn" class="!text-subtle">$letterSpacing.tight</p-caption>
  </div>
</div>

## Element

<div class="flex">
  <div class="w-2/3">
    <div class="pb-8 pt-20 space-y-1">
      <p-heading element="h4">DM Sans</p-heading>
      <p-caption class="!text-default" weight="bold">FONT SIZE / LINE HEIGHT / LETTER SPACING</p-caption>
      <p-caption><span class="!text-lightblue-50">Tailwind FONT-SIZE</span> • Tailwind LINE-HEIGHT • Tailwind LETTER-SPACING</p-caption>
    </div>    
  </div>
</div>

### Heading

<div class="grid grid-cols-1 gap-y-8 py-8">
  <div class="w-full">
    <p-heading class="!text-default py-4" element="h1">Heading 1</p-heading>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Regular</p-caption>
    <p-caption size="tn" class="my-1">72px / Auto / -0.2px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-7xl</span> • leading-wide • tracking-tight</p-caption>
  </div>
  <div class="w-full">
    <p-heading class="!text-default py-4" element="h2">Heading 2</p-heading>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Regular</p-caption>
    <p-caption size="tn" class="my-1">72px / Auto / -0.2px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-7xl</span> • leading-wide • tracking-tight</p-caption>
  </div>
  <div class="w-full">
    <p-heading class="!text-default py-4" element="h3">Heading 3</p-heading>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Regular</p-caption>
    <p-caption size="tn" class="my-1">48px / Auto / 0px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-5xl</span> • leading-wide • tracking-normal</p-caption>
  </div>
  <div class="w-full">
    <p-heading class="!text-default py-4" element="h4">Heading 4</p-heading>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Medium</p-caption>
    <p-caption size="tn" class="my-1">36px / Auto / 0px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-4xl</span> • leading-wide • tracking-normal</p-caption>
  </div>
  <div class="w-full">
    <p-heading class="!text-default py-4" element="h5" weight="medium">Heading 5</p-heading>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Medium</p-caption>
    <p-caption size="tn" class="my-1">24px / Auto / 0px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-2xl</span> • leading-wide • tracking-normal</p-caption>
  </div>
  <div class="w-full">
    <p-heading class="!text-default py-4" element="h6" weight="medium">Heading 6</p-heading>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Regular</p-caption>
    <p-caption size="tn" class="my-1">20px / Auto / 0px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-xl</span> • leading-wide • tracking-normal</p-caption>
  </div>
</div>

### Subheading

<div class="grid grid-cols-1 gap-y-8 py-8">
  <div class="w-full">
    <p-subheading class="!text-default py-4" size="md" weight="medium">Sub Heading 1</p-subheading>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Medium</p-caption>
    <p-caption size="tn" class="my-1">16px / 1.5 / 0.2px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-base</span> • leading-normal • tracking-wide</p-caption>
  </div>
  <div class="w-full">
    <p-subheading class="!text-default py-4" size="sm" weight="medium">Sub Heading 2</p-subheading>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Medium</p-caption>
    <p-caption size="tn" class="my-1">14px / 1.42 / 0.2px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-sm</span> • leading-tighter • tracking-wide</p-caption>
  </div>
</div>

### Body

<div class="grid grid-cols-1 gap-y-8 py-8">
  <div class="w-full">
    <p-text class="!text-default block py-4" variant="body">Body 1</p-text>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Regular</p-caption>
    <p-caption size="tn" class="my-1">16px / 1.5 / 0.2px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-base</span> • leading-normal • tracking-wide</p-caption>
  </div>
  <div class="w-full">
    <p-text class="!text-default block py-4" variant="body2">Body 2</p-text>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Regular</p-caption>
    <p-caption size="tn" class="my-1">14px / 1.42 / 0.2px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-sm</span> • leading-tighter • tracking-wide</p-caption>
  </div>
  <div class="w-full">
    <ul class="!my-0 py-4">
      <li><p-text class="!text-default" variant="body">Body List 1</p-text></li>
    </ul>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Regular</p-caption>
    <p-caption size="tn" class="my-1">16px / 1.5 / 0.2px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-base</span> • leading-normal • tracking-wide</p-caption>
  </div>
  <div class="w-full">
    <ul class="!my-0 py-4">
      <li><p-text class="!text-default" variant="body2">Body List 2</p-text></li>
    </ul>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Regular</p-caption>
    <p-caption size="tn" class="my-1">14px / 1.42 / 0.2px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-sm</span> • leading-tighter • tracking-wide</p-caption>
  </div>
  <div class="w-full">
    <p-text class="!text-default block py-4" variant="body" hyperlink>Hyperlink (text)</p-text>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Regular</p-caption>
    <p-caption size="tn" class="my-1">16px / 1.5 / 0.2px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-base</span> • leading-normal • tracking-wide</p-caption>
  </div>
  <div class="w-full">
    <p-text class="!text-default block py-4" variant="body2" hyperlink>Hyperlink (subtext)</p-text>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Regular</p-caption>
    <p-caption size="tn" class="my-1">14px / 1.42 / 0.2px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-sm</span> • leading-tighter • tracking-wide</p-caption>
  </div>
</div>

### Button
<div class="grid grid-cols-1 gap-y-8 py-8">
  <div class="w-full">
    <p-text class="!text-default py-4" variant="btn">button 1</p-text>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Medium</p-caption>
    <p-caption size="tn" class="my-1">16px / 1.5 / 0.4px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-base</span> • leading-normal • tracking-wider</p-caption>
  </div>
  <div class="w-full">
    <p-text class="!text-default py-4" variant="btn2">button 2</p-text>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Medium</p-caption>
    <p-caption size="tn" class="my-1">14px / 1.42 / 0.4px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-sm</span> • leading-tighter • tracking-wider</p-caption>
  </div>
  <div class="w-full">
    <p-text class="!text-default py-4" variant="btn" hyperlink>button Link 1</p-text>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Medium</p-caption>
    <p-caption size="tn" class="my-1">16px / 1.5 / 0.4px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-base</span> • leading-normal • tracking-wider</p-caption>
  </div>
  <div class="w-full">
    <p-text class="!text-default py-4" variant="btn2" hyperlink>button Link 2</p-text>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Medium</p-caption>
    <p-caption size="tn" class="my-1">14px / 1.42 / 0.4px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-sm</span> • leading-tighter • tracking-wider</p-caption>
  </div>
</div>

### Caption

<div class="grid grid-cols-1 gap-y-8 py-8">
  <div class="w-full">
    <p-caption class="!text-default py-4" size="xs">Caption</p-caption>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Regular</p-caption>
    <p-caption size="tn" class="my-1">12px / 1.33 / 0.2px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-xs</span> • leading-tightest • tracking-wide</p-caption>
  </div>
  <div class="w-full">
    <p-caption class="!text-default py-4" size="tn">Caption 2 (known as small text)</p-caption>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Regular</p-caption>
    <p-caption size="tn" class="my-1">11px / 1.45 / 0.4px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-tn</span> • leading-tight • tracking-wider</p-caption>
  </div>
  <div class="w-full">
    <p-text class="!text-default block py-4" variant="caption" hyperlink>Hyperlink (caption)</p-text>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Medium</p-caption>
    <p-caption size="tn" class="my-1">12px / 1.33 / 0.2px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-xs</span> • leading-tightest • tracking-wide</p-caption>
  </div>
  <div class="w-full">
    <p-text class="!text-default block py-4" variant="caption2" hyperlink>Hyperlink (caption 2)</p-text>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Medium</p-caption>
    <p-caption size="tn" class="my-1">11px / 1.45 / 0.4px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-tn</span> • leading-tight • tracking-wider</p-caption>
  </div>
</div>

### Overline

<div class="grid grid-cols-1 gap-y-8 py-8">
  <div class="w-full">
    <p-text class="!text-default block py-4" variant="overline">Overline</p-text>
    <p-caption size="tn" weight="bold" class="mt-2">DM Sans Regular</p-caption>
    <p-caption size="tn" class="my-1">11px / 1.45 / 0.8px</p-caption>
    <p-caption size="tn"><span class="!text-lightblue-50">text-tn</span> • leading-tight • tracking-widest</p-caption>
  </div>
</div>
