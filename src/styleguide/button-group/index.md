<script setup>
  import ButtonGroup from '../../components/button-group/ButtonGroup.vue'
  import Button from '../../components/button/Button.vue'
  import Dropdown from '../../components/dropdown/Dropdown.vue'
  import DropdownItem from '../../components/dropdown/DropdownItem.vue'
  import IconChevronDown from '@carbon/icons-vue/lib/chevron--down/20'
  import IconChevronLeft from '@carbon/icons-vue/lib/chevron--left/20'
  import IconChevronRight from '@carbon/icons-vue/lib/chevron--right/20'
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
<div class="flex pt-5 pb-8 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Default group button style that will used on many area.
    This style will use to highligth most important action in any experience.
  </div>
</div>

##### Outline button
<div class="flex space-x-3">
  <ButtonGroup>
    <Button variant="outline">Button Text</Button>
    <Button variant="outline" icon><IconChevronDown /></Button>
  </ButtonGroup>
</div>
<div class="flex pt-5 pb-8 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Outline group button style will used if an action need less visual weight.
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
<div class="flex pt-5 pb-8 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Button group that consist of two component button can
    be classified as two type. Two button group text and
    addon & Two button group double text.
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
<div class="flex pt-5 pb-8 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Three button group usually used when similar actions
    have to be shown together, and have the same level of importance.
    Three button text usually using text only without icon.
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
<div class="flex pt-5 pb-8 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Four button group is the maximum quantity of button
    group with text. Have the same function like before which is
    used when similar actions have to be shown together,
    and have the same level of importance.
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
<div class="flex pt-5 pb-8 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Button with addon usually used to simplify many actions
    into one group button, the other action can be hidened inside the addon.
  </div>
</div>

##### Button Both Addon
<div class="flex space-x-3">
  <ButtonGroup>
    <Button icon><IconChevronLeft /></Button>
    <Button icon><IconChevronRight /></Button>
  </ButtonGroup>
</div>
<div class="flex pt-5 pb-8 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Button all addon usually used when the button group
    consist of two up to six button with only icon.
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
<div class="flex pt-5 pb-8 text-sm text-body-75">
  <div class="w-3/4">
    Usage : Button with addon usually used to simplify many actions
    into one group button, the other action can be hidened inside the addon.
  </div>
</div>
