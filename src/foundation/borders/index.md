---
title: Borders & Outlines · Foundation
description: Collections of borders and outlines library
---

<script setup>
  import pCaption from '../../components/caption/Caption.vue'
  import pHeading from '../../components/heading/Heading.vue'
  import { ref, computed } from "vue-demi"
</script>

# Borders and Outlines

## Borders
The borders and also rings colors of Persona is based on [semantics borders colors](/foundation/colors/#borders).

<div class="pb-8 pt-20 space-y-1">
  <p-heading element="h5" class="mb-0">Name</p-heading>
  <p-caption class="!text-lightblue-50">token-name</p-caption>
  <p-caption class="!text-subtle">figma-style-name</p-caption>
  <p-caption class="!text-subtle" weight="bold">tailwind-class-name</p-caption>
</div>

### Base

<div class="grid grid-cols-4 gap-y-8 gap-x-6 py-8">
  <div class="space-y-4">
    <div class="w-28 h-28 border border-default"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">default</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.default</p-caption>
      <p-caption size="tn" class="!text-subtle">border/default</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-default</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-default</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 border border-default-alpha"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">default alpha</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.default.alpha</p-caption>
      <p-caption size="tn" class="!text-subtle">border/defaultAlpha</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">default-alpha</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-default-alpha</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-default-alpha</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 border border-subtle"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">subtle</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.subtle</p-caption>
      <p-caption size="tn" class="!text-subtle">border/subtle</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-subtle</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-subtle</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 border border-subtle-alpha"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">subtle alpha</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.subtle.alpha</p-caption>
      <p-caption size="tn" class="!text-subtle">border/subtleAlpha</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">subtle-alpha</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-subtle-alpha</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-subtle-alpha</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 border border-muted"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">muted</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.muted</p-caption>
      <p-caption size="tn" class="!text-subtle">border/muted</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-muted</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-muted</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 border border-on-emphasis"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">on emphasis</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.onEmphasis</p-caption>
      <p-caption size="tn" class="!text-subtle">border/onEmphasis</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-on-emphasis</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-on-emphasis</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 border border-on-emphasis-alpha bg-default shadow-sm"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">OE alpha</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.onEmphasis.alpha</p-caption>
      <p-caption size="tn" class="!text-subtle">border/onEmphasisAlpha</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-on-emphasis-alpha</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-on-emphasis-alpha</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 border border-on-emphasis-alpha-subtle bg-default shadow-sm"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">OE alpha subtle</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.onEmphasis.alpha.subtle</p-caption>
      <p-caption size="tn" class="!text-subtle">border/onEmphasisAlphaSubtle</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-on-emphasis-alpha-subtle</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-on-emphasis-alpha-subtle</p-caption>
    </div>
  </div>
</div>

### Roles

<div class="grid grid-cols-4 gap-y-8 gap-x-6 py-8">
  <div class="space-y-4">
    <div class="w-28 h-28 border border-accent"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">accent</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.accent</p-caption>
      <p-caption size="tn" class="!text-subtle">border/accent</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-accent</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-accent</p-caption>
    </div>
  </div>
  <div class="space-y-4">
    <div class="w-28 h-28 border border-accent-emphasis"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">accent emphasis</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.accent.emphasis</p-caption>
      <p-caption size="tn" class="!text-subtle">border/accentEmphasis</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-accent-emphasis</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-accent-emphasis</p-caption>
    </div>
  </div>
  <div class="space-y-4">
    <div class="w-28 h-28 border border-success"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">success</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.success</p-caption>
      <p-caption size="tn" class="!text-subtle">border/success</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-success</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-success</p-caption>
    </div>
  </div>
  <div class="space-y-4">
    <div class="w-28 h-28 border border-success-emphasis"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">success emphasis</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.success.emphasis</p-caption>
      <p-caption size="tn" class="!text-subtle">border/successEmphasis</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-success-emphasis</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-success-emphasis</p-caption>
    </div>
  </div>
  <div class="space-y-4">
    <div class="w-28 h-28 border border-warning"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">warning</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.warning</p-caption>
      <p-caption size="tn" class="!text-subtle">border/warning</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-warning</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-warning</p-caption>
    </div>
  </div>
  <div class="space-y-4">
    <div class="w-28 h-28 border border-warning-emphasis"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">warning emphasis</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.warning.emphasis</p-caption>
      <p-caption size="tn" class="!text-subtle">border/warningEmphasis</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-warning-emphasis</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-warning-emphasis</p-caption>
    </div>
  </div>
  <div class="space-y-4">
    <div class="w-28 h-28 border border-danger"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">danger</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.danger</p-caption>
      <p-caption size="tn" class="!text-subtle">border/danger</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-danger</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-danger</p-caption>
    </div>
  </div>
  <div class="space-y-4">
    <div class="w-28 h-28 border border-danger-emphasis"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">danger emphasis</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.danger.emphasis</p-caption>
      <p-caption size="tn" class="!text-subtle">border/dangerEmphasis</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-danger-emphasis</p-caption>
      <p-caption class="!text-muted mt-2 mb-1">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-danger-emphasis</p-caption>
    </div>
  </div>
</div>

## Outlines

<div class="pb-8 pt-20 space-y-1">
  <p-heading element="h5" class="mb-0">Name</p-heading>
  <p-caption class="!text-lightblue-50">token-name</p-caption>
  <p-caption class="!text-subtle" weight="bold">tailwind-class-name</p-caption>
</div>

<div class="grid grid-cols-4 gap-y-8 gap-x-6 pt-20 pb-8">
  <div class="space-y-4">
    <div class="w-28 h-28 outline outline-default"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">default</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">outlineColor.default</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">outline-default</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 outline outline-accent"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">accent</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">outlineColor.accent</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">outline-accent</p-caption>
    </div>
  </div>
  
  <div class="space-y-4">
    <div class="w-28 h-28 outline outline-success"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">success</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">outlineColor.success</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">outline-success</p-caption>
    </div>
  </div>
  
  <div class="space-y-4">
    <div class="w-28 h-28 outline outline-warning"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">warning</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">outlineColor.warning</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">outline-warning</p-caption>
    </div>
  </div>
  
  <div class="space-y-4">
    <div class="w-28 h-28 outline outline-danger"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">danger</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">outlineColor.danger</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">outline-danger</p-caption>
    </div>
  </div>
</div>

## Radius

<div class="pb-8 pt-20 space-y-1">
  <p-heading element="h5" class="mb-0">Name</p-heading>
  <p-caption class="!text-lightblue-50">token-name</p-caption>
  <p-caption class="!text-subtle">tailwind-class-name</p-caption>
  <p-caption class="!text-subtle" weight="bold">size</p-caption>
</div>

<div class="grid grid-cols-4 gap-y-8 gap-x-6 pt-20 pb-8">
  <div class="space-y-4">
    <div class="w-28 h-28 border border-default rounded-none"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">none</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderRadius.none</p-caption>
      <p-caption size="tn" class="!text-subtle">rounded-none</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">0</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 border border-default rounded-sm"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">small</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderRadius.sm</p-caption>
      <p-caption size="tn" class="!text-subtle">rounded-sm</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">4px</p-caption>
    </div>
  </div>
  
  <div class="space-y-4">
    <div class="w-28 h-28 border border-default rounded-md"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">medium</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderRadius.md</p-caption>
      <p-caption size="tn" class="!text-subtle">rounded-md</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">8px</p-caption>
    </div>
  </div>
  
  <div class="space-y-4">
    <div class="w-28 h-28 border border-default rounded-lg"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">large</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderRadius.lg</p-caption>
      <p-caption size="tn" class="!text-subtle">rounded-lg</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">12px</p-caption>
    </div>
  </div>
  
  <div class="space-y-4">
    <div class="w-28 h-28 border border-default rounded-xl"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">xlarge</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderRadius.xl</p-caption>
      <p-caption size="tn" class="!text-subtle">rounded-xl</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">16px</p-caption>
    </div>
  </div>
  
  <div class="space-y-4">
    <div class="w-28 h-28 border border-default rounded-2xl"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">2xlarge</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderRadius.2xl</p-caption>
      <p-caption size="tn" class="!text-subtle">rounded-2xl</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">22px</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 border border-default rounded-full"></div>
    <div>
      <p-caption size="tn" class="!text-default mb-1">full</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderRadius.full</p-caption>
      <p-caption size="tn" class="!text-subtle">rounded-full</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">999999px</p-caption>
    </div>
  </div>
</div>