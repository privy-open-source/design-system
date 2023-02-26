---
title: Shadows · Foundation
description: Collections of shadow library
---

<script setup>
  import pCaption from '../../components/caption/Caption.vue'
  import IconSun from '@carbon/icons-vue/lib/sun/16'
</script>

# Shadows
Shadows foundation is used for `box-shadow` and `drop-shadow`

## Size
<div class="pb-8 pt-20">
  <p-heading element="h5" class="mb-0 !text-default">Size Name</p-heading>
  <p-caption class="!text-lightblue-50">token-name</p-caption>
  <p-caption class="!text-subtle">tailwind-class-name</p-caption>
  <div class="w-10/12 space-y-1 pt-2">
    <div class="relative">
      <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
      <p-caption class="!text-muted">Shadow</p-caption>
    </div>
    <div class="flex space-x-4">
      <p-caption class="!text-default">X axis</p-caption>
      <p-caption class="!text-default">Y axis</p-caption>
      <p-caption class="!text-default">Blur</p-caption>
      <p-caption class="!text-default">Spread</p-caption>
    </div>
    <div class="flex space-x-8">
      <p-caption class="!text-default">Color</p-caption>
      <p-caption class="!text-default">Opacity</p-caption>
    </div>
  </div>
</div>

<div class="grid grid-cols-4 flex-1 gap-y-8 gap-x-6">
  <div class="space-y-4">
    <div class="w-36 h-36 rounded border border-default shadow-sm"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">Small (sm)</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">shadow.sm</p-caption>
      <p-caption size="tn" class="!text-subtle">shadow-sm</p-caption>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption size="tn">X <span class="text-default">0</span></p-caption>
        <p-caption size="tn">Y <span class="text-default">1</span></p-caption>
        <p-caption size="tn">B <span class="text-default">2</span></p-caption>
        <p-caption size="tn">S <span class="text-default">0</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption size="tn" class="!text-default">$gray.100</p-caption>
        <p-caption size="tn" class="!text-default">5%</p-caption>
      </div>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption size="tn">X <span class="text-default">0</span></p-caption>
        <p-caption size="tn">Y <span class="text-default">1</span></p-caption>
        <p-caption size="tn">B <span class="text-default">3</span></p-caption>
        <p-caption size="tn">S <span class="text-default">0</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption size="tn" class="!text-default">$gray.100</p-caption>
        <p-caption size="tn" class="!text-default">10%</p-caption>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-36 h-36 rounded border border-default shadow-md"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">Medium (md)</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">shadow.md</p-caption>
      <p-caption size="tn" class="!text-subtle">shadow-md</p-caption>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption size="tn">X <span class="text-default">0</span></p-caption>
        <p-caption size="tn">Y <span class="text-default">2</span></p-caption>
        <p-caption size="tn">B <span class="text-default">4</span></p-caption>
        <p-caption size="tn">S <span class="text-default">0</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption size="tn" class="!text-default">$gray.100</p-caption>
        <p-caption size="tn" class="!text-default">5%</p-caption>
      </div>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption size="tn">X <span class="text-default">0</span></p-caption>
        <p-caption size="tn">Y <span class="text-default">4</span></p-caption>
        <p-caption size="tn">B <span class="text-default">6</span></p-caption>
        <p-caption size="tn">S <span class="text-default">-1</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption size="tn" class="!text-default">$gray.100</p-caption>
        <p-caption size="tn" class="!text-default">10%</p-caption>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-36 h-36 rounded border border-default shadow-lg"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">Large (lg)</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">shadow.lg</p-caption>
      <p-caption size="tn" class="!text-subtle">shadow-lg</p-caption>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption size="tn">X <span class="text-default">0</span></p-caption>
        <p-caption size="tn">Y <span class="text-default">4</span></p-caption>
        <p-caption size="tn">B <span class="text-default">6</span></p-caption>
        <p-caption size="tn">S <span class="text-default">0</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption size="tn" class="!text-default">$gray.100</p-caption>
        <p-caption size="tn" class="!text-default">5%</p-caption>
      </div>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption size="tn">X <span class="text-default">0</span></p-caption>
        <p-caption size="tn">Y <span class="text-default">10</span></p-caption>
        <p-caption size="tn">B <span class="text-default">15</span></p-caption>
        <p-caption size="tn">S <span class="text-default">-3</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption size="tn" class="!text-default">$gray.100</p-caption>
        <p-caption size="tn" class="!text-default">10%</p-caption>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-36 h-36 rounded border border-default shadow-xl"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">XLarge (xl)</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">shadow.xl</p-caption>
      <p-caption size="tn" class="!text-subtle">shadow-xl</p-caption>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption size="tn">X <span class="text-default">0</span></p-caption>
        <p-caption size="tn">Y <span class="text-default">16</span></p-caption>
        <p-caption size="tn">B <span class="text-default">25</span></p-caption>
        <p-caption size="tn">S <span class="text-default">-2</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption size="tn" class="!text-default">$gray.100</p-caption>
        <p-caption size="tn" class="!text-default">10%</p-caption>
      </div>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption size="tn">X <span class="text-default">0</span></p-caption>
        <p-caption size="tn">Y <span class="text-default">8</span></p-caption>
        <p-caption size="tn">B <span class="text-default">10</span></p-caption>
        <p-caption size="tn">S <span class="text-default">-2</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption size="tn" class="!text-default">$gray.100</p-caption>
        <p-caption size="tn" class="!text-default">10%</p-caption>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-36 h-36 rounded border border-default shadow-2xl"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">2XLarge (2xl)</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">shadow.2xl</p-caption>
      <p-caption size="tn" class="!text-subtle">shadow-2xl</p-caption>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption size="tn">X <span class="text-default">0</span></p-caption>
        <p-caption size="tn">Y <span class="text-default">20</span></p-caption>
        <p-caption size="tn">B <span class="text-default">40</span></p-caption>
        <p-caption size="tn">S <span class="text-default">-8</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption size="tn" class="!text-default">$gray.100</p-caption>
        <p-caption size="tn" class="!text-default">25%</p-caption>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-36 h-36 rounded border border-default shadow-lg-top"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">Large (top)</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">shadow.lg-top</p-caption>
      <p-caption size="tn" class="!text-subtle">shadow-lg-top</p-caption>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption size="tn">X <span class="text-default">0</span></p-caption>
        <p-caption size="tn">Y <span class="text-default">-4</span></p-caption>
        <p-caption size="tn">B <span class="text-default">6</span></p-caption>
        <p-caption size="tn">S <span class="text-default">0</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption size="tn" class="!text-default">$gray.100</p-caption>
        <p-caption size="tn" class="!text-default">5%</p-caption>
      </div>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption size="tn">X <span class="text-default">0</span></p-caption>
        <p-caption size="tn">Y <span class="text-default">-10</span></p-caption>
        <p-caption size="tn">B <span class="text-default">15</span></p-caption>
        <p-caption size="tn">S <span class="text-default">-3</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption size="tn" class="!text-default">$gray.100</p-caption>
        <p-caption size="tn" class="!text-default">10%</p-caption>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-36 h-36 rounded border border-default shadow-lg-left"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">Large (left)</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">shadow.lg-left</p-caption>
      <p-caption size="tn" class="!text-subtle">shadow-lg-left</p-caption>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption size="tn">X <span class="text-default">-4</span></p-caption>
        <p-caption size="tn">Y <span class="text-default">0</span></p-caption>
        <p-caption size="tn">B <span class="text-default">6</span></p-caption>
        <p-caption size="tn">S <span class="text-default">0</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption size="tn" class="!text-default">$gray.100</p-caption>
        <p-caption size="tn" class="!text-default">5%</p-caption>
      </div>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption size="tn">X <span class="text-default">-10</span></p-caption>
        <p-caption size="tn">Y <span class="text-default">0</span></p-caption>
        <p-caption size="tn">B <span class="text-default">15</span></p-caption>
        <p-caption size="tn">S <span class="text-default">-3</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption size="tn" class="!text-default">$gray.100</p-caption>
        <p-caption size="tn" class="!text-default">10%</p-caption>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-36 h-36 rounded border border-default shadow-lg-right"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">Large (right)</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">shadow.lg-right</p-caption>
      <p-caption size="tn" class="!text-subtle">shadow-lg-right</p-caption>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption size="tn">X <span class="text-default">4</span></p-caption>
        <p-caption size="tn">Y <span class="text-default">0</span></p-caption>
        <p-caption size="tn">B <span class="text-default">6</span></p-caption>
        <p-caption size="tn">S <span class="text-default">0</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption size="tn" class="!text-default">$gray.100</p-caption>
        <p-caption size="tn" class="!text-default">5%</p-caption>
      </div>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption size="tn">X <span class="text-default">10</span></p-caption>
        <p-caption size="tn">Y <span class="text-default">0</span></p-caption>
        <p-caption size="tn">B <span class="text-default">15</span></p-caption>
        <p-caption size="tn">S <span class="text-default">-3</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption size="tn" class="!text-default">$gray.100</p-caption>
        <p-caption size="tn" class="!text-default">10%</p-caption>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <div class="bg-accent-emphasis p-4 mx-auto">
      <div class="w-28 h-28 mx-auto bg-emphasis-alpha rounded border border-on-emphasis-alpha-subtle shadow-lg-on-emphasis"></div>
    </div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">lg On Emphasis</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">shadow.lg-on-emphasis</p-caption>
      <p-caption size="tn" class="!text-subtle">shadow-lg-on-emphasis</p-caption>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption size="tn">X <span class="text-default">0</span></p-caption>
        <p-caption size="tn">Y <span class="text-default">4</span></p-caption>
        <p-caption size="tn">B <span class="text-default">6</span></p-caption>
        <p-caption size="tn">S <span class="text-default">-2</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption size="tn" class="!text-default">$gray.100</p-caption>
        <p-caption size="tn" class="!text-default">15%</p-caption>
      </div>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption size="tn">X <span class="text-default">0</span></p-caption>
        <p-caption size="tn">Y <span class="text-default">10</span></p-caption>
        <p-caption size="tn">B <span class="text-default">15</span></p-caption>
        <p-caption size="tn">S <span class="text-default">-3</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption size="tn" class="!text-default">$gray.100</p-caption>
        <p-caption size="tn" class="!text-default">35%</p-caption>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <div class="bg-emphasis p-4 mx-auto">
      <div class="w-28 h-28 mx-auto bg-emphasis-alpha rounded border border-on-emphasis-alpha-subtle shadow-lg-on-emphasis-darker"></div>
    </div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">lg OE Darker</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">shadow.lg-on-emphasis-darker</p-caption>
      <p-caption size="tn" class="!text-subtle">shadow-lg-on-emphasis-darker</p-caption>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption size="tn">X <span class="text-default">0</span></p-caption>
        <p-caption size="tn">Y <span class="text-default">4</span></p-caption>
        <p-caption size="tn">B <span class="text-default">6</span></p-caption>
        <p-caption size="tn">S <span class="text-default">-2</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption size="tn" class="!text-default">$base.black</p-caption>
        <p-caption size="tn" class="!text-default">65%</p-caption>
      </div>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption size="tn">X <span class="text-default">0</span></p-caption>
        <p-caption size="tn">Y <span class="text-default">10</span></p-caption>
        <p-caption size="tn">B <span class="text-default">15</span></p-caption>
        <p-caption size="tn">S <span class="text-default">-3</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption size="tn" class="!text-default">$base.black</p-caption>
        <p-caption size="tn" class="!text-default">85%</p-caption>
      </div>
    </div>
  </div>
</div>

## Colors
Shadow with roles color just available in large size.

<div class="grid grid-cols-4 flex-1 gap-y-8 gap-x-6 pt-20">
  <div class="space-y-4">
    <div class="w-36 h-36 rounded border border-accent shadow-lg-accent"></div>
    <div class="space-y-1">
      <p-caption class="!text-default">Large (accent)</p-caption>
      <p-caption class="!text-lightblue-50">shadow.lg-accent</p-caption>
      <p-caption class="!text-subtle">shadow-lg-accent</p-caption>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption>X <span class="text-default">0</span></p-caption>
        <p-caption>Y <span class="text-default">4</span></p-caption>
        <p-caption>B <span class="text-default">6</span></p-caption>
        <p-caption>S <span class="text-default">-2</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption class="!text-default">$blue.10</p-caption>
        <p-caption class="!text-default">5%</p-caption>
      </div>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption>X <span class="text-default">0</span></p-caption>
        <p-caption>Y <span class="text-default">10</span></p-caption>
        <p-caption>B <span class="text-default">15</span></p-caption>
        <p-caption>S <span class="text-default">-3</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption class="!text-default">$blue.10</p-caption>
        <p-caption class="!text-default">10%</p-caption>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-36 h-36 rounded border border-success shadow-lg-success"></div>
    <div class="space-y-1">
      <p-caption class="!text-default">Large (success)</p-caption>
      <p-caption class="!text-lightblue-50">shadow.lg-success</p-caption>
      <p-caption class="!text-subtle">shadow-lg-success</p-caption>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption>X <span class="text-default">0</span></p-caption>
        <p-caption>Y <span class="text-default">4</span></p-caption>
        <p-caption>B <span class="text-default">6</span></p-caption>
        <p-caption>S <span class="text-default">-2</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption class="!text-default">$green.10</p-caption>
        <p-caption class="!text-default">5%</p-caption>
      </div>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption>X <span class="text-default">0</span></p-caption>
        <p-caption>Y <span class="text-default">10</span></p-caption>
        <p-caption>B <span class="text-default">15</span></p-caption>
        <p-caption>S <span class="text-default">-3</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption class="!text-default">$green.10</p-caption>
        <p-caption class="!text-default">10%</p-caption>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-36 h-36 rounded border border-warning shadow-lg-warning"></div>
    <div class="space-y-1">
      <p-caption class="!text-default">Large (warning)</p-caption>
      <p-caption class="!text-lightblue-50">shadow.lg-warning</p-caption>
      <p-caption class="!text-subtle">shadow-lg-warning</p-caption>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption>X <span class="text-default">0</span></p-caption>
        <p-caption>Y <span class="text-default">4</span></p-caption>
        <p-caption>B <span class="text-default">6</span></p-caption>
        <p-caption>S <span class="text-default">-2</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption class="!text-default">$orange.40</p-caption>
        <p-caption class="!text-default">5%</p-caption>
      </div>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption>X <span class="text-default">0</span></p-caption>
        <p-caption>Y <span class="text-default">10</span></p-caption>
        <p-caption>B <span class="text-default">15</span></p-caption>
        <p-caption>S <span class="text-default">-3</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption class="!text-default">$orange.40</p-caption>
        <p-caption class="!text-default">5%</p-caption>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-36 h-36 rounded border border-danger shadow-lg-danger"></div>
    <div class="space-y-1">
      <p-caption class="!text-default">Large (danger)</p-caption>
      <p-caption class="!text-lightblue-50">shadow.lg-danger</p-caption>
      <p-caption class="!text-subtle">shadow-lg-danger</p-caption>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption>X <span class="text-default">0</span></p-caption>
        <p-caption>Y <span class="text-default">4</span></p-caption>
        <p-caption>B <span class="text-default">6</span></p-caption>
        <p-caption>S <span class="text-default">-2</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption class="!text-default">$red.10</p-caption>
        <p-caption class="!text-default">5%</p-caption>
      </div>
    </div>
    <div class="w-10/12 space-y-1">
      <div class="relative">
        <IconSun class="text-muted absolute -left-5 scale-75 top-0" /> 
        <p-caption class="!text-muted">Shadow</p-caption>
      </div>
      <div class="flex justify-between">
        <p-caption>X <span class="text-default">0</span></p-caption>
        <p-caption>Y <span class="text-default">10</span></p-caption>
        <p-caption>B <span class="text-default">15</span></p-caption>
        <p-caption>S <span class="text-default">-3</span></p-caption>
      </div>
      <div class="flex space-x-8">
        <p-caption class="!text-default">$red.10</p-caption>
        <p-caption class="!text-default">10%</p-caption>
      </div>
    </div>
  </div>
</div>