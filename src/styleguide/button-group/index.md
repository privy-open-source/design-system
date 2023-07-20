---
title: Button Group · Style guide
description: Button group style guide
---

<script setup>
  import ButtonGroup from '../../components/button-group/ButtonGroup.vue'
  import Button from '../../components/button/Button.vue'
  import Dropdown from '../../components/dropdown/Dropdown.vue'
  import DropdownItem from '../../components/dropdown/DropdownItem.vue'
  import Caption from '../../components/caption/Caption.vue'
  import IconChevronDown from '@privyid/persona-icon/vue/chevron-down/20.vue'
  import IconChevronLeft from '@privyid/persona-icon/vue/chevron-left/20.vue'
  import IconChevronRight from '@privyid/persona-icon/vue/chevron-right/20.vue'
</script>

# ![button](/assets/images/img-guide-button.svg) Buttons Group

## Usage
A button group displays multiple buttons together that gives user access to similar actions or frequently performed.

## Button by Style

##### Default button
<div class="flex space-x-3">
  <ButtonGroup>
    <Button>Button Text</Button>
    <Button icon><IconChevronDown /></Button>
  </ButtonGroup>
</div>
<div class="flex pt-5 pb-8">
  <div class="w-3/4">
    <Caption class="!text-subtle dark:!text-dark-subtle">
    Usage : Default group button style that will used on many area.
    This style will use to highligth most important action in any experience.
    </Caption>
  </div>
</div>

##### Outline button
<div class="flex space-x-3">
  <ButtonGroup>
    <Button variant="outline">Button Text</Button>
    <Button variant="outline" icon><IconChevronDown /></Button>
  </ButtonGroup>
</div>
<div class="flex pt-5 pb-8">
  <div class="w-3/4">
    <Caption class="!text-subtle dark:!text-dark-subtle">
    Usage : Outline group button style will used if an action need less visual weight.
    </Caption>
  </div>
</div>

## Button by Quantity

##### Two Button
<div class="flex space-x-3">
  <div class="flex space-x-3">
    <ButtonGroup>
      <Button>Button Text</Button>
      <Button icon><IconChevronDown /></Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button>Button Text</Button>
      <Button>Button Text</Button>
    </ButtonGroup>
  </div>
</div>
<div class="flex pt-5 pb-8">
  <div class="w-3/4">
    <Caption class="!text-subtle dark:!text-dark-subtle">
    Usage : Button group that consist of two component button can
    be classified as two type. Two button group text and
    addon & Two button group double text.
    </Caption>
  </div>
</div>

##### Three Button
<div class="flex space-x-3">
  <ButtonGroup>
    <Button>Button Text</Button>
    <Button>Button Text</Button>
    <Button>Button Text</Button>
  </ButtonGroup>
</div>
<div class="flex pt-5 pb-8">
  <div class="w-3/4">
    <Caption class="!text-subtle dark:!text-dark-subtle">
    Usage : Three button group usually used when similar actions
    have to be shown together, and have the same level of importance.
    Three button text usually using text only without icon.
    </Caption>
  </div>
</div>

##### Four Button
<div class="flex space-x-3">
  <ButtonGroup>
    <Button>Button Text</Button>
    <Button>Button Text</Button>
    <Button>Button Text</Button>
    <Button>Button Text</Button>
  </ButtonGroup>
</div>
<div class="flex pt-5 pb-8">
  <div class="w-3/4">
    <Caption class="!text-subtle dark:!text-dark-subtle">
    Usage : Four button group is the maximum quantity of button
    group with text. Have the same function like before which is
    used when similar actions have to be shown together,
    and have the same level of importance.
    </Caption>
  </div>
</div>

## Button by Addon

##### Button Addon Right
<div class="flex space-x-3">
  <ButtonGroup>
    <Button>Button Text</Button>
    <Dropdown
      icon
      no-caret>
      <template #button-content>
        <IconChevronDown />
      </template>
      <DropdownItem>Action</DropdownItem>
      <DropdownItem>Another action</DropdownItem>
      <DropdownItem>Something else here</DropdownItem>
    </Dropdown>
  </ButtonGroup>
</div>
<div class="flex pt-5 pb-8">
  <div class="w-3/4">
    <Caption class="!text-subtle dark:!text-dark-subtle">
    Usage : Button with addon usually used to simplify many actions
    into one group button, the other action can be hidened inside the addon.
    </Caption>
  </div>
</div>

##### Button Both Addon
<div class="flex space-x-3">
  <ButtonGroup>
    <Button icon><IconChevronLeft /></Button>
    <Button icon><IconChevronRight /></Button>
  </ButtonGroup>
</div>
<div class="flex pt-5 pb-8">
  <div class="w-3/4">
    <Caption class="!text-subtle dark:!text-dark-subtle">
    Usage : Button all addon usually used when the button group
    consist of two up to six button with only icon.
    </Caption>
  </div>
</div>

##### Button Addon Left
<div class="flex space-x-3">
  <ButtonGroup>
    <Dropdown
      no-caret
      icon>
      <template #button-content>
        <IconChevronDown />
      </template>
      <DropdownItem>Action</DropdownItem>
      <DropdownItem>Another action</DropdownItem>
      <DropdownItem>Something else here</DropdownItem>
    </Dropdown>
    <Button>Button Text</Button>
  </ButtonGroup>
</div>
<div class="flex pt-5 pb-8">
  <div class="w-3/4">
    <Caption class="!text-subtle dark:!text-dark-subtle">
    Usage : Button with addon usually used to simplify many actions
    into one group button, the other action can be hidened inside the addon.
    </Caption>
  </div>
</div>
