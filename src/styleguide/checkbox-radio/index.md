---
title: Checkbox & Radio · Style guide
description: Checkbox & radio style guide
---

<script setup>
  import Radio from '../../components/radio/Radio.vue'
  import Checkbox from '../../components/checkbox/Checkbox.vue'
  import Caption from '../../components/caption/Caption.vue'
  import Card from '../../components/card/Card.vue'
  import IconBee from '@carbon/icons-vue/lib/bee/20'
  import IconCheck from '@carbon/icons-vue/lib/checkmark--outline/20'
  import { ref, computed } from "vue-demi"

  const value  = ref(false)
  const value2 = ref(true)
  const indeterminate = ref(true)
  const selected = ref([])
  const color = ref('#0065D1')
  const image = ref('image 01')
</script>

# ![badge](/assets/images/img-guide-radio-and-checkbox.svg) Checkbox and Radio

## Checkbox

### Usage:
Checkboxes is checkable input that communicates if an option is true, false or indeterminate. Allowing user to choose one or more options from a limited set of options. If you have more than 10 options, please use Select component instead.

### Checkbox by state

#### Default Checkbox
<div class="py-4">
  <Checkbox v-model="value" />
</div>
<Caption class="!text-subtle">Usage: Default state, a checkbox input includes a selected and unselected state.</Caption>

#### Checked Checkbox
<div class="py-4">
  <Checkbox v-model="value2" />
</div>
<Caption class="!text-subtle">Usage: Checked state when the checkbox is being selected.</Caption>

#### Intermediate Checkbox
<div class="py-4">
  <Checkbox v-model="indeterminate" :indeterminate="true" />
</div>
<Caption class="!text-subtle">Usage: State to show partially checked states. The parent checkbox will be indeterminate until all its child sub-options are checked.</Caption>

#### Disabled Checkbox
<div class="py-4">
  <Checkbox disabled />
</div>
<Caption class="!text-subtle">Usage: Disabled state. This prevents users from being able to interact with the component, and conveys its inactive state to assistive technologies.</Caption>

#### Checked Disabled Checkbox
<div class="py-4">
  <Checkbox v-model="value2" disabled />
</div>
<Caption class="!text-subtle">Usage: This state indicate that the option is mandatory checked. The user can’t change the option.</Caption>

#### Intermediate Disabled Checkbox
<div class="py-4">
  <Checkbox v-model="indeterminate" :indeterminate="true" disabled />
</div>
<Caption class="!text-subtle">Usage: This state indicates that the option in mandatory intermediate. So some of the sub-option is also mandatory checked too.</Caption>

### Checkbox by Additional item

#### Checked with label
<div class="py-4">
  <Checkbox v-model="value2">Checklist Label</Checkbox>
</div>
<Caption class="!text-subtle">Usage: This is the default component that mainly use ini all over the design. The label is used to make checkbox context clear.</Caption>

#### Checked with label and Caption
<div class="py-4">
  <Checkbox v-model="value2">
    Checklist Label
    <Caption>Text</Caption>
  </Checkbox>
</div>
<Caption class="!text-subtle">Usage: This component mainly used for the checkbox that require additional information to describe the function or context of the checkbox.</Caption>


## Radio

### Usage:
Radio buttons are graphical user interface elements that allow user to choose only one option from a predefined set of mutually exclusive options. Radio is generally displayed in a radio group.

### Radio by state

#### Default Radio
<div class="py-4">
  <Radio v-model="value" />
</div>
<Caption class="!text-subtle">Usage: Default state, a radio input includes a selected and unselected state.</Caption>

#### Checked Radio
<div class="py-4">
  <Radio v-model="value2" />
</div>
<Caption class="!text-subtle">Usage: Checked state when the radio is being selected.</Caption>

#### Disabled Radio
<div class="py-4">
  <Radio v-model="value" disabled />
</div>
<Caption class="!text-subtle">Usage: Disabled state. This prevents users from being able to interact with the component, and conveys its inactive state to assistive technologies.</Caption>

#### Checked Disabled Radio
<div class="py-4">
  <Radio v-model="value2" disabled />
</div>
<Caption class="!text-subtle">Usage: This state indicate that the option is mandatory checked. The user can’t change the option.</Caption>

### Radio by Additional item

#### Checked with label
<div class="py-4">
  <Radio v-model="value2">
    Radio Label
    <Caption>Text</Caption>
  </Radio>
</div>
<Caption class="!text-subtle">Usage: This component mainly used for the radio that require additional information to describe the function or context of the radio.</Caption>

#### Checked with label and caption
<div class="py-4">
  <Radio v-model="value2">Radio Label</Radio>
</div>
<Caption class="!text-subtle">Usage: This is the default component that mainly use ini all over the design. The label is used to make radio context clear.</Caption>

## Custom Picker/Custom Checkbox

### Usage:
Custom check box is a component that usually used when required more clearer context of option checkbox. For example checkbox for choosing OTP Method, and else.

### Selection State

#### Select State
<div class="py-4">
  <Checkbox appearance="none" v-model="value2">
    <template #default>
      <Card
        element="div"
        class="px-4 py-2 hover:shadow-md hover:border-subtle ease-in-out duration-200 min-w-[223px]"
        sectioned>
        <div class="flex items-center space-x-3">
          <IconBee class="text-muted" />
          <div>
            Title Text
            <Caption>Subtitle</Caption>
          </div>
        </div>
      </Card>
    </template>
  </Checkbox>
</div>
<Caption class="!text-subtle">Usage: This component indicated that the option is in selected state.</Caption>

#### Unselect State
<div class="py-4">
  <Checkbox appearance="none" v-model="value">
    <template #default>
      <Card
        element="div"
        class="px-4 py-2 hover:shadow-md hover:border-subtle ease-in-out duration-200 min-w-[223px]"
        sectioned>
        <div class="flex items-center space-x-3">
          <IconBee class="text-muted" />
          <div>
            Title Text
            <Caption>Subtitle</Caption>
          </div>
        </div>
      </Card>
    </template>
  </Checkbox>
</div>
<Caption class="!text-subtle">Usage: This component indicated that the option is in unselected state.</Caption>

#### Muted State
<div class="py-4">
  <Checkbox appearance="none" v-model="value" disabled>
    <template #default>
      <Card
        element="div"
        class="px-4 py-2 hover:cursor-default ease-in-out duration-200 min-w-[223px]"
        sectioned>
        <div class="flex items-center space-x-3">
          <IconBee class="text-muted" />
          <div>
            Title Text
            <Caption>Subtitle</Caption>
          </div>
        </div>
      </Card>
    </template>
  </Checkbox>
</div>
<Caption class="!text-subtle">Usage: This component indicated that the option is in muted state. At this state user can’t choose this option.</Caption>

#### Hover State
<div class="py-4">
  <Checkbox appearance="none" v-model="value">
    <template #default>
      <Card
        element="div"
        class="px-4 py-2 shadow-md border-subtle ease-in-out duration-200 min-w-[223px]"
        sectioned>
        <div class="flex items-center space-x-3">
          <IconBee class="text-muted" />
          <div>
            Title Text
            <Caption>Subtitle</Caption>
          </div>
        </div>
      </Card>
    </template>
  </Checkbox>
</div>
<Caption class="!text-subtle">Usage: This component indicated that the option is in hover state. At this state user usually hasn’t selected the option that he/she choose, rather than moving the pointer on each option.</Caption>

#### Select Hover state
<div class="py-4">
  <Checkbox appearance="none" v-model="value2">
    <template #default>
      <Card
        element="div"
        class="px-4 py-2 shadow-md border-subtle ease-in-out duration-200 min-w-[223px]"
        sectioned>
        <div class="flex items-center space-x-3">
          <IconBee class="text-muted" />
          <div>
            Title Text
            <Caption>Subtitle</Caption>
          </div>
        </div>
      </Card>
    </template>
  </Checkbox>
</div>
<Caption class="!text-subtle">Usage: This component indicate that the option is being selected and hovered.</Caption>

### Selection Type

#### With icon
<div class="py-4">
  <Checkbox appearance="none" v-model="value2">
    <template #default>
      <Card
        element="div"
        class="px-4 py-2 hover:shadow-md hover:border-subtle ease-in-out duration-200 min-w-[223px]"
        sectioned>
        <div class="flex items-center space-x-3">
          <IconBee class="text-muted" />
          <div>
            Title Text
            <Caption>Subtitle</Caption>
          </div>
        </div>
      </Card>
    </template>
  </Checkbox>
</div>
<Caption class="!text-subtle">Usage: This option selection is the complete example. There is icon, title text, and subtitle. Usually used when the option require the most clear context, so it’s require to show icon/image, title, and subtitle.</Caption>

#### Title Text and subtitle
<div class="py-4">
  <Checkbox appearance="none" v-model="value2">
    <template #default>
      <Card
        element="div"
        class="px-4 py-2 hover:shadow-md hover:border-subtle ease-in-out duration-200 min-w-[223px]"
        sectioned>
        Title Text
        <Caption>Subtitle</Caption>
      </Card>
    </template>
  </Checkbox>
</div>
<Caption class="!text-subtle">Usage: This option selection is only showing title text and subtitle. This component usually used when the option is pretty clear described using text only, so the icon/image doesn’t required.</Caption>

#### Title Only
<div class="py-4">
  <Checkbox appearance="none" v-model="value2">
    <template #default>
      <Card
        element="div"
        class="px-4 py-2 hover:shadow-md hover:border-subtle ease-in-out duration-200 min-w-[223px]"
        sectioned>
        Title Text
      </Card>
    </template>
  </Checkbox>
</div>
<Caption class="!text-subtle">Usage: This option selection is only showing title text. This option select component used when the option doesn’t require complex desciption, so it’s enough using title text only.</Caption>

## Colour/Image/Symbol picker

### Usage:
This component usually used for picking option like icon, color, or image.

### Element Picker type

#### Icon
<div class="py-4">
  <Checkbox appearance="none" v-model="value2">
    <template #default>
      <Card
        element="div"
        class="p-4 hover:shadow-md hover:border-subtle ease-in-out duration-200"
        sectioned>
        <IconBee />
      </Card>
    </template>
  </Checkbox>
</div>
<Caption class="!text-subtle">Usage: This element picker usually used to pick an icon.</Caption>

#### Colour
<div class="py-4">
  <Radio appearance="none" v-model="color" value="#0065D1">
    <template #default>
      <Card
        element="div"
        class="p-4 hover:shadow-md ease-in-out duration-200 !bg-[#0065D1] !border-[#0065D1]"
        sectioned>
        <IconCheck
          class="ease-in-out duration-200 text-on-emphasis"
          :class="[color === '#0065D1' ? 'opacity-100' : 'opacity-0']" />
      </Card>
    </template>
  </Radio>
</div>
<Caption class="!text-subtle">Usage: This element picker usually used to pick an icon.</Caption>

#### Image
<div class="py-4">
  <Radio appearance="none" v-model="image" value="image 01">
    <template #default>
      <Card
        element="div"
        class="flex items-center justify-center hover:shadow-md ease-in-out duration-200 bg-[url('/assets/images/img-radio-picker-01.svg')] bg-cover bg-no-repeat !border-0 relative overflow-hidden w-14 h-14"
        :class="{ 'after:absolute after:left-0 after:top-0 after:content-[\'\'] after:w-full after:h-full after:bg-emphasis/50 after:z-[1]' : image === 'image 01' }"
        sectioned>
        <IconCheck
          class="ease-in-out duration-200 text-on-emphasis relative z-[2]"
          :class="[image === 'image 01' ? 'opacity-100' : 'opacity-0']" />
      </Card>
    </template>
  </Radio>
</div>
<Caption class="!text-subtle">Usage: This element picker usually used to pick an image.</Caption>

### Picking State

#### Hover
<div class="py-4">
  <Radio appearance="none" readonly>
    <template #default>
      <Card
        element="div"
        class="flex items-center justify-center shadow-md ease-in-out duration-200 bg-[url('/assets/images/img-radio-picker-01.svg')] bg-cover bg-no-repeat !border-0 relative overflow-hidden w-14 h-14"
        sectioned>
      </Card>
    </template>
  </Radio>
</div>
<Caption class="!text-subtle">Usage: This component indicated that the option is in hover state. At this state user usually hasn’t selected the option that he/she choose, rather than moving the pointer on each option.</Caption>

#### Muted
<div class="py-4">
  <Radio appearance="none" disabled>
    <template #default>
      <Card
        element="div"
        class="flex items-center justify-center ease-in-out duration-200 bg-[url('/assets/images/img-radio-picker-01.svg')] bg-cover bg-no-repeat !border-0 relative overflow-hidden w-14 h-14"
        sectioned>
      </Card>
    </template>
  </Radio>
</div>
<Caption class="!text-subtle">Usage: This component indicated that the option is in muted state. At this state user can’t choose this option.</Caption>

#### Select
<div class="py-4">
  <Radio appearance="none" v-model="image" value="image 01">
    <template #default>
      <Card
        element="div"
        class="flex items-center justify-center ease-in-out duration-200 bg-[url('/assets/images/img-radio-picker-01.svg')] bg-cover bg-no-repeat !border-0 relative overflow-hidden w-14 h-14"
        :class="{ 'after:absolute after:left-0 after:top-0 after:content-[\'\'] after:w-full after:h-full after:bg-emphasis/50 after:z-[1]' : image === 'image 01' }"
        sectioned>
        <IconCheck
          class="ease-in-out duration-200 text-on-emphasis relative z-[2]"
          :class="[image === 'image 01' ? 'opacity-100' : 'opacity-0']" />
      </Card>
    </template>
  </Radio>
</div>
<Caption class="!text-subtle">Usage: This component indicated that the option is in selected state.</Caption>

#### Unselect
<div class="py-4">
  <Radio appearance="none" readonly>
    <template #default>
      <Card
        element="div"
        class="flex items-center justify-center ease-in-out duration-200 bg-[url('/assets/images/img-radio-picker-01.svg')] bg-cover bg-no-repeat !border-0 relative overflow-hidden w-14 h-14"
        sectioned>
      </Card>
    </template>
  </Radio>
</div>
<Caption class="!text-subtle">Usage: This component indicated that the option is in unselected state.</Caption>

#### Select Hover
<div class="py-4">
  <Radio appearance="none" v-model="image" value="image 01">
    <template #default>
      <Card
        element="div"
        class="flex items-center justify-center shadow-md ease-in-out duration-200 bg-[url('/assets/images/img-radio-picker-01.svg')] bg-cover bg-no-repeat !border-0 relative overflow-hidden w-14 h-14"
        :class="{ 'after:absolute after:left-0 after:top-0 after:content-[\'\'] after:w-full after:h-full after:bg-emphasis/50 after:z-[1]' : image === 'image 01' }"
        sectioned>
        <IconCheck
          class="ease-in-out duration-200 text-on-emphasis relative z-[2]"
          :class="[image === 'image 01' ? 'opacity-100' : 'opacity-0']" />
      </Card>
    </template>
  </Radio>
</div>
<Caption class="!text-subtle">Usage: This component indicate that the option is being selected and hovered.</Caption>

## Pattern Rule

### Best Practice
<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>Work independently from each other: selecting one checkbox
      shouldn’t change the selection status of another checkbox in
      the list. The exception is when a checkbox is used to make
      a bulk selection of multiple items.</li>
      <li>Be framed positively: for example, Turn on notifications
      instead of Turn off notifications</li>
      <li>Always have a label when being used to toggling a
      setting on or off</li>
      <li>Be listed according to a logical order, whether it’s
      alphabetical, numerical, time-based, or some other
      clear system.</li>
      <li>Link to more information or include a subtitle as
      required to provide more explanation. Don’t rely on
      tooltips to explain a checkbox.</li>
    </ul>
  </div>
</div>

### Do
<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>Use for making it possible to choose one or more
      options from a limited number of options.</li>
      <li>Use for “accepting terms of service”
      and similar functionality.</li>
      <li>Use in forms to toggle something on or off.</li>
    </ul>
  </div>
</div>

### Don't
<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>Avoid using when you have more than 10 options to choose from.</li>
      <li>Don’t change the selection of another checkbox when another
      one is clicked. Only exception is when a checkbox is used to
      make a bulk selection of multiple items.</li>
    </ul>
  </div>
</div>
