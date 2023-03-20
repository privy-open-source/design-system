---
title: Progress · Style guide
description: Progress style guide
---

<script setup>
  import pProgress from '../../components/progress/Progress.vue'
  import pProgressItem from '../../components/progress/ProgressItem.vue'
  import pCaption from '../../components/caption/Caption.vue'
  import IconBee from '@carbon/icons-vue/lib/bee/16'
</script>

# ![progress](/assets/images/img-guide-progress.svg) Progress

## Progress

### Usage

A progress tracker is progress indicator component communicates or displays the steps and progress through a journey of a particular process.

### Amount of step

#### Two
<div class="flex py-6">
  <div class="w-2/5">
    <p-progress>
      <p-progress-item active />
      <p-progress-item />
    </p-progress>  
  </div>
</div>

<p-caption class="!text-subtle">
  Usage : Sidebar navigation menu is a list of primary menu that usualy used or have a high priority functions. This navigation is always shown, and the menu is static.
</p-caption>

#### Up to Six
<div class="flex py-6">
  <div class="w-full">
    <p-progress>
      <p-progress-item active />
      <p-progress-item />
      <p-progress-item />
      <p-progress-item />
      <p-progress-item />
      <p-progress-item />
    </p-progress>  
  </div>
</div>

<p-caption class="!text-subtle">
  Usage: The maximum amount of progress indicator that provided is up to six step.
</p-caption>

### Point Item

#### Dot
<div class="flex py-6">
  <div class="w-full">
    <p-progress>
      <p-progress-item active />
      <p-progress-item />
      <p-progress-item />
      <p-progress-item />
    </p-progress>  
  </div>
</div>
<p-caption class="!text-subtle">
  Usage: Dot Point Item type in progress indicator doesn’t have any specific requirement usage. It’s a default pointer that usualy used in progress indicator.
</p-caption>

#### Text
<div class="flex py-6">
  <div class="w-full">
    <p-progress variant="counter">
      <p-progress-item active />
      <p-progress-item />
      <p-progress-item />
      <p-progress-item />
    </p-progress>  
  </div>
</div>
<p-caption class="!text-subtle">
  Usage: Text Point item type in progress indicator usualy used when the step has a specific step to do regarding particular process. It’s usualy used to make the number of the step more clearer.
</p-caption>

#### Icon
<div class="flex py-6">
  <div class="w-full">
    <p-progress>
      <p-progress-item active >
        <template #icon>
          <IconBee />
        </template>
      </p-progress-item>
      <p-progress-item>
        <template #icon>
          <IconBee />
        </template>
      </p-progress-item>
      <p-progress-item>
        <template #icon>
          <IconBee />
        </template>
      </p-progress-item>
      <p-progress-item>
        <template #icon>
          <IconBee />
        </template>
      </p-progress-item>
    </p-progress>  
  </div>
</div>
<p-caption class="!text-subtle">
  Usage: Text Point item type in progress indicator usualy used when the step has a specific step to do regarding particular process. It’s usualy used to make the number of the step more clearer.
</p-caption>

### Label

#### Specific Label 
<div class="flex py-6">
  <div class="w-full">
    <p-progress>
      <p-progress-item title="Label" active />
      <p-progress-item title="Label" />
      <p-progress-item title="Label" />
      <p-progress-item title="Label" />
    </p-progress>  
  </div>
</div>
<p-caption class="!text-subtle">
  Usage: Specific label type usualy used to make each step in progress indicator more clearer and related to the context of the step. This is can be used when the step in progress indicator is limited so the space is available to create label below the step.
</p-caption>

#### General Label
<div class="flex py-6">
  <div class="w-full">
    <p-progress title-variant="general">
      <p-progress-item title="Label" active />
      <p-progress-item title="Label" />
      <p-progress-item title="Label" />
      <p-progress-item title="Label" />
    </p-progress>  
  </div>
</div>
<p-caption class="!text-subtle">
  Usage: General label type usualy used when the step in progress indicator has a large amount, so the space is very limited and imposibble to make a specific label below the step. So, to make it simpler, the label combined into one, and regulary changed after one step is finish.
</p-caption>

### Alignment

#### Horizontal
<div class="flex py-6">
  <div class="w-2/5">
    <p-progress>
      <p-progress-item title="Label" active />
      <p-progress-item title="Label" />
    </p-progress>  
  </div>
</div>
<p-caption class="!text-subtle">
  Usage: Horizontal aligment progress indicator usualy used in small space, and limited step.
</p-caption>

#### Vertical
<div class="flex py-6">
  <div class="w-2/5 h-64">
    <p-progress vertical>
      <p-progress-item title="Label" active />
      <p-progress-item title="Label" />
    </p-progress>  
  </div>
</div>
<p-caption class="!text-subtle">
  Usage: Vertical aligment progress indicator usualy used in very big space and large amount step.
</p-caption>

## Pattern Rule
### Best Practice

<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>
        Use a maximum of seven dot indicators to keep the user’s journey concise.
      </li>
      <li>Typically accompanied by a carousel or another UI device.</li>
      <li>Use a progress indicator to step a user through a journey so that they can keep track of their progress.</li>
    </ul> 
  </div>
</div>