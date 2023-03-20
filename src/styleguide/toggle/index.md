---
title: Toggle · Style guide
description: Toggle style guide
---

<script setup>
  import pToggle from '../../components/toggle/Toggle.vue'
  import pCaption from '../../components/caption/Caption.vue'
  import IconOne from '@carbon/icons-vue/lib/number--1/16'
  import IconZero from '@carbon/icons-vue/lib/number--0/16'
  import IconLight from "@carbon/icons-vue/lib/light/16"
  import IconDark from "@carbon/icons-vue/lib/asleep/16"
  import { ref } from "vue-demi"
  import { useDark } from '@vueuse/core'

  const isDark = useDark()
</script>

# ![toggle](/assets/images/img-guide-toggle.svg) Toggle

## Toggle

### Usage

A toggle is used to view or switch between enabled or disabled states. Toggle switch gives control over a feature or option that can be turned on or off. 

### State

#### On
<div class="flex my-6">
  <p-toggle variant="pill" no-label readonly checked />
</div>
<p-caption class="!text-subtle">
  Usage: The state that indicated toggle is being enable or turned on.
</p-caption>

#### Off
<div class="flex my-6">
  <p-toggle variant="pill" no-label readonly />
</div>
<p-caption class="!text-subtle">
  Usage: The state that indicated toggle is being disable or turned off.
</p-caption>

#### Muted On
<div class="flex my-6">
  <p-toggle variant="pill" no-label readonly checked disabled />
</div>
<p-caption class="!text-subtle">
  Usage: The state that indicate toggle is being disabled in active condition or can be say that the toggle is being mandatory active.
</p-caption>

#### Muted Off
<div class="flex my-6">
  <p-toggle variant="pill" no-label readonly disabled />
</div>
<p-caption class="!text-subtle">
  Usage: The state that indicate toggle is being disabled in inactive condition or can be say that the toggle is being mandatory inactive.
</p-caption>

### Attributes

#### None
<div class="flex my-6">
  <p-toggle variant="pill" no-label readonly checked />
</div>
<p-caption class="!text-subtle">
  Usage: The toggle that doesn’t have any attributes is mainly used as default toggle. It can be used as general toggle because not bounded with a certain context.
</p-caption>

#### Text
<div class="flex my-6">
  <p-toggle variant="pill" readonly checked />
</div>
<p-caption class="!text-subtle">
  Usage: The toggle that have a text attribute usualy used for certain context. Function of the text is to make the context of the toggle more clearer. The wording that usualy used is (on/off).
</p-caption>

#### Icon
<div class="flex my-6">
  <p-toggle variant="pill" readonly checked>
    <template #checked>
      <IconOne />
    </template>
    <template #unchecked>
      <IconZero />
    </template>
  </p-toggle>
</div>
<p-caption class="!text-subtle">
  Usage: The toggle that have icon atribute usualy has a certain context. Icon used as a substitute of text. The icon should resemble meaning of the context of toggle.
</p-caption>

#### Dark/Light
<div class="flex my-6">
  <p-toggle v-model="isDark" variant="pill" checked>
    <template #checked>
      <IconDark />
    </template>
    <template #unchecked>
      <IconLight />
    </template>
  </p-toggle>
</div>
<p-caption class="!text-subtle">
  Usage: Dark/Light toggle basically is an icon toggle attributes. but it specially made for toggle that have a function to switch light mode to dark mode.
</p-caption>

#### Time
<div class="flex my-6">
  <p-toggle variant="flat" checked-label="PM" unchecked-label="AM" />
</div>
<p-caption class="!text-subtle">
  Usage: Toggle with time attributes have a specific function as a switcher am / pm.
</p-caption>

## Pattern Rule

### Best Practice
<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>Let people know what happens when the toggle is switched by using a tooltip.</li>
      <li>Toggles should never require users to press a button to apply the settings.</li>
    </ul> 
  </div>
</div>

### Do
<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>Use toggles when your intent is to turn something on or off instantly.</li>
      <li>Use for any feature or option that can be turned on or off.</li>
      <li>If a physical switch would work for the action, the toggle is probably the best component to use.</li>
      <li>Use for making it possible to choose one or more options from a limited number of options.</li>
    </ul> 
  </div>
</div>

### Don’t
<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>Toggles should never require users to click a button to apply or save the setting.</li>
      <li>Avoid using when you have more than 10 options to choose from.</li>
      <li>
        Don’t change the selection of another toggle when another one is clicked. Only exception is when a toggle is used to make a bulk selection of multiple items.
      </li>
    </ul> 
  </div>
</div>