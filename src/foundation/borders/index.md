---
title: Borders & Outlines · Foundation
description: Collections of borders, outlines and radius library
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
    <div class="w-28 h-28 border border-default dark:border-dark-default"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default dark:!text-dark-default">Default</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.default</p-caption>
      <p-caption size="tn" class="!text-subtle">border/default</p-caption>
      <p-caption class="!text-muted mt-2">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-default</p-caption>
      <p-caption class="!text-muted mt-2">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-default</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 border border-default-alpha dark:border-dark-default-alpha"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default dark:!text-dark-default">Default Alpha</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.default.alpha</p-caption>
      <p-caption size="tn" class="!text-subtle">border/defaultAlpha</p-caption>
      <p-caption class="!text-muted mt-2">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-default-alpha</p-caption>
      <p-caption class="!text-muted mt-2">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-default-alpha</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 border border-subtle dark:border-dark-subtle"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default dark:!text-dark-default">Subtle</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.subtle</p-caption>
      <p-caption size="tn" class="!text-subtle">border/subtle</p-caption>
      <p-caption class="!text-muted mt-2">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-subtle</p-caption>
      <p-caption class="!text-muted mt-2">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-subtle</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 border border-subtle-alpha dark:border-dark-subtle-alpha"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default dark:!text-dark-default">Subtle Alpha</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.subtle.alpha</p-caption>
      <p-caption size="tn" class="!text-subtle">border/subtleAlpha</p-caption>
      <p-caption class="!text-muted mt-2">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-subtle-alpha</p-caption>
      <p-caption class="!text-muted mt-2">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-subtle-alpha</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 border border-muted dark:border-dark-muted"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default dark:!text-dark-default">Muted</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.muted</p-caption>
      <p-caption size="tn" class="!text-subtle">border/muted</p-caption>
      <p-caption class="!text-muted mt-2">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-muted</p-caption>
      <p-caption class="!text-muted mt-2">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-muted</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 border border-inverse dark:border-dark-inverse"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default dark:!text-dark-default">Inverse</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.inverse</p-caption>
      <p-caption size="tn" class="!text-subtle">border/inverse</p-caption>
      <p-caption class="!text-muted mt-2">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-inverse</p-caption>
      <p-caption class="!text-muted mt-2">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-inverse</p-caption>
    </div>
  </div>
</div>

### Roles

<div class="grid grid-cols-4 gap-y-8 gap-x-6 py-8">
  <div class="space-y-4">
    <div class="w-28 h-28 border border-info dark:border-dark-info"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default dark:!text-dark-default">Info</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.info</p-caption>
      <p-caption size="tn" class="!text-subtle">border/info</p-caption>
      <p-caption class="!text-muted mt-2">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-info</p-caption>
      <p-caption class="!text-muted mt-2">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-info</p-caption>
    </div>
  </div>
  <div class="space-y-4">
    <div class="w-28 h-28 border border-info-emphasis dark:border-dark-info-emphasis"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default dark:!text-dark-default">Info Emphasis</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.info.emphasis</p-caption>
      <p-caption size="tn" class="!text-subtle">border/infoEmphasis</p-caption>
      <p-caption class="!text-muted mt-2">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-info-emphasis</p-caption>
      <p-caption class="!text-muted mt-2">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-info-emphasis</p-caption>
    </div>
  </div>
  <div class="space-y-4">
    <div class="w-28 h-28 border border-success dark:border-dark-success"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default dark:!text-dark-default">Success</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.success</p-caption>
      <p-caption size="tn" class="!text-subtle">border/success</p-caption>
      <p-caption class="!text-muted mt-2">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-success</p-caption>
      <p-caption class="!text-muted mt-2">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-success</p-caption>
    </div>
  </div>
  <div class="space-y-4">
    <div class="w-28 h-28 border border-success-emphasis dark:border-dark-success-emphasis"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default dark:!text-dark-default">Success Emphasis</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.success.emphasis</p-caption>
      <p-caption size="tn" class="!text-subtle">border/successEmphasis</p-caption>
      <p-caption class="!text-muted mt-2">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-success-emphasis</p-caption>
      <p-caption class="!text-muted mt-2">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-success-emphasis</p-caption>
    </div>
  </div>
  <div class="space-y-4">
    <div class="w-28 h-28 border border-warning dark:border-dark-warning"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default dark:!text-dark-default">Warning</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.warning</p-caption>
      <p-caption size="tn" class="!text-subtle">border/warning</p-caption>
      <p-caption class="!text-muted mt-2">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-warning</p-caption>
      <p-caption class="!text-muted mt-2">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-warning</p-caption>
    </div>
  </div>
  <div class="space-y-4">
    <div class="w-28 h-28 border border-warning-emphasis dark:border-dark-warning-emphasis"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default dark:!text-dark-default">Warning Emphasis</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.warning.emphasis</p-caption>
      <p-caption size="tn" class="!text-subtle">border/warningEmphasis</p-caption>
      <p-caption class="!text-muted mt-2">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-warning-emphasis</p-caption>
      <p-caption class="!text-muted mt-2">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-warning-emphasis</p-caption>
    </div>
  </div>
  <div class="space-y-4">
    <div class="w-28 h-28 border border-danger dark:border-dark-danger"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default dark:!text-dark-default">Danger</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.danger</p-caption>
      <p-caption size="tn" class="!text-subtle">border/danger</p-caption>
      <p-caption class="!text-muted mt-2">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-danger</p-caption>
      <p-caption class="!text-muted mt-2">Ring</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">ring-danger</p-caption>
    </div>
  </div>
  <div class="space-y-4">
    <div class="w-28 h-28 border border-danger-emphasis dark:border-dark-danger-emphasis"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default dark:!text-dark-default">Danger Emphasis</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderColor.danger.emphasis</p-caption>
      <p-caption size="tn" class="!text-subtle">border/dangerEmphasis</p-caption>
      <p-caption class="!text-muted mt-2">Border</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">border-danger-emphasis</p-caption>
      <p-caption class="!text-muted mt-2">Ring</p-caption>
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
    <div class="w-28 h-28 outline outline-default dark:outline-dark-default"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default dark:!text-dark-default">default</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">outlineColor.default</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">outline-default</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 outline outline-info dark:outline-dark-info"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default dark:!text-dark-default">Info</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">outlineColor.info</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">outline-info</p-caption>
    </div>
  </div>
  
  <div class="space-y-4">
    <div class="w-28 h-28 outline outline-success dark:outline-dark-success"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default dark:!text-dark-default">success</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">outlineColor.success</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">outline-success</p-caption>
    </div>
  </div>
  
  <div class="space-y-4">
    <div class="w-28 h-28 outline outline-warning dark:outline-dark-warning"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default dark:!text-dark-default">warning</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">outlineColor.warning</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">outline-warning</p-caption>
    </div>
  </div>
  
  <div class="space-y-4">
    <div class="w-28 h-28 outline outline-danger dark:outline-dark-danger"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default dark:!text-dark-default">danger</p-caption>
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
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">none</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderRadius.none</p-caption>
      <p-caption size="tn" class="!text-subtle">rounded-none</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">0</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 border border-default rounded-tn"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">tiny</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderRadius.tn</p-caption>
      <p-caption size="tn" class="!text-subtle">rounded-tn</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">4px</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 border border-default rounded-xs"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">xsmall</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderRadius.xs</p-caption>
      <p-caption size="tn" class="!text-subtle">rounded-xs</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">6px</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 border border-default rounded-sm"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">small</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderRadius.sm</p-caption>
      <p-caption size="tn" class="!text-subtle">rounded-sm</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">7px</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 border border-default rounded"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">DEFAULT</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderRadius.DEFAULT</p-caption>
      <p-caption size="tn" class="!text-subtle">rounded</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">8px</p-caption>
    </div>
  </div>
  
  <div class="space-y-4">
    <div class="w-28 h-28 border border-default rounded-md"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">medium</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderRadius.md</p-caption>
      <p-caption size="tn" class="!text-subtle">rounded-md</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">12px</p-caption>
    </div>
  </div>
  
  <div class="space-y-4">
    <div class="w-28 h-28 border border-default rounded-lg"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">large</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderRadius.lg</p-caption>
      <p-caption size="tn" class="!text-subtle">rounded-lg</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">14px</p-caption>
    </div>
  </div>
  
  <div class="space-y-4">
    <div class="w-28 h-28 border border-default rounded-xl"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">xlarge</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderRadius.xl</p-caption>
      <p-caption size="tn" class="!text-subtle">rounded-xl</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">16px</p-caption>
    </div>
  </div>
  
  <div class="space-y-4">
    <div class="w-28 h-28 border border-default rounded-2xl"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">2xlarge</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderRadius.2xl</p-caption>
      <p-caption size="tn" class="!text-subtle">rounded-2xl</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">20px</p-caption>
    </div>
  </div>
  
  <div class="space-y-4">
    <div class="w-28 h-28 border border-default rounded-3xl"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">3xlarge</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderRadius.3xl</p-caption>
      <p-caption size="tn" class="!text-subtle">rounded-3xl</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">22px</p-caption>
    </div>
  </div>

  <div class="space-y-4">
    <div class="w-28 h-28 border border-default rounded-full"></div>
    <div class="space-y-1">
      <p-caption size="tn" class="!text-default">full</p-caption>
      <p-caption size="tn" class="!text-lightblue-50">borderRadius.full</p-caption>
      <p-caption size="tn" class="!text-subtle">rounded-full</p-caption>
      <p-caption size="tn" class="!text-subtle" weight="bold">999999px</p-caption>
    </div>
  </div>
</div>