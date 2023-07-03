---
title: Badge · Style guide
description: Badge style guide
---
<script setup>
  import Badge from '../../components/badge/Badge.vue'
  import Dot from '../../components/dot/Dot.vue'
</script>

# ![badge](/assets/images/img-guide-badge.svg) Badge

## Usage
Badges are placed before/after the label of the thing they're quantifying, such as the number of notification/document received. They should only be used to represent a number, however, the following letters and special characters can be used to represent number values: + (represent more) or K (represent thousands).

### Example
<div class="space-x-2 pb-8">
  <Badge>25</Badge>
  <Badge style="--p-bg-variant-default: #B79A00;--p-bg-dark-variant-default: #B79A00;">7K</Badge>
  <Badge variant="light" color="success">999+</Badge>
  <span class="inline-block bg-inverse dark:bg-dark-inverse py-1 px-2 leading-none">
    <Badge variant="inverse" class="!text-warning">999+</Badge>
  </span>
  <Dot color="info" />
  <Dot color="info" variant="pills" />
</div>

### Rules
<div class="flex pb-8">
  <div class="w-2/3">
    Use badges in conjunction with a single item or label, to avoid ambiguity around which item is being quantified. Suggestion: 3 digit number max, excl. the special character.
  </div>
</div>


### Color Tone
#### Primary (brand) color
<div class="flex pb-4">
  <div class="w-2/3">
    Available color based on product brand color use, but limited to what design system provided
  </div>
</div>
<div class="space-x-2 pb-8">
  <Badge color="primary">25</Badge>
  <Badge variant="light" color="primary">25</Badge>
</div>

#### State color
<div class="flex pb-4">
  <div class="w-2/3">
    This tone only has 3 color variants based on status, which are orange, red, and green
  </div>
</div>
<div class="space-x-2 pb-8">
  <Badge color="info">25</Badge>
  <Badge variant="light" color="info">25</Badge>
  <Badge color="warning">25</Badge>
  <Badge variant="light" color="warning">25</Badge>
  <Badge color="danger">25</Badge>
  <Badge variant="light" color="danger">25</Badge>
  <Badge color="success">25</Badge>
  <Badge variant="light" color="success">25</Badge>
</div>

#### Level color (customizable and optional)
<div class="flex pb-4">
  <div class="w-2/3">
    The level refers to what state the user is in or objects being tagged, such as premium account or document labeling based on category
  </div>
</div>
<div class="space-x-2 pb-8">
  <Badge class="!bg-gold-40">25</Badge>
  <Badge variant="light" class="!text-gold-60">25</Badge>
</div>

#### Default color
<div class="flex pb-4">
  <div class="w-2/3">
    This color is commonly used in any situation and condition
  </div>
</div>
<div class="space-x-2 pb-8">
  <Badge>25</Badge>
  <Badge variant="light">25</Badge>
</div>

## Pattern Rule

### Best Practice

<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>Using established color patterns so that merchants can quickly identify their status or importance level.</li>
      <li>Being clearly labeled with short, scannable text.</li>
      <li>Being positioned to clearly identify the object they’re informing or labelling.</li>
    </ul> 
  </div>
</div>

### Do

<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>Use to show a status update on a piece of information or action.</li>
      <li>Use to mark something as a “draft” or “new”.</li>
      <li>Use when you want to highlight something that has been added recently.</li>
      <li>Use established color patterns so that users can clearly identify the importance level.</li>
      <li>Always position badge so that it’s clear to understand what object it’s related to.</li>
    </ul> 
  </div>
</div>

### Don’t

<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>Don’t make badges clickable. Instead use button component’s small variant.</li>
      <li>Don’t use alternatives to existing badge variants.</li>
      <li>
        Don’t use alternatives to existing badge options. 
        Only create a new badge option if there aren’t any existing options to communicate the status you need.
      </li>
    </ul> 
  </div>
</div>

