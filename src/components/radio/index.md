---
title: Radio · Components
description: Base radio form input.
---

<script setup>
  import pRadio from "./Radio.vue"
  import pCaption from "../caption/Caption.vue"
  import pCard from "../card/Card.vue"
  import pLabel from "../label/Label.vue"
  import pButton from "../button/Button.vue"
  import IconBee from '@carbon/icons-vue/lib/bee/20'
  import IconBug from '@carbon/icons-vue/lib/debug/20'
  import IconBeeBat from '@carbon/icons-vue/lib/bee-bat/20'
  import IconCheck from '@carbon/icons-vue/lib/checkmark--outline/20'
  import { ref } from "vue-demi"

  const value    = ref('')
  const selected = ref()
</script>

# Radio

> Base radio form input

## Usage

### Simple Usage

<preview>
  <p-radio value="1" v-model="value">Radio Label</p-radio>
</preview>

```vue
<template>
  <p-radio value="1" v-model="value">Radio Label</p-radio>
</template>
```

### With Subtext

<preview>
  <p-radio v-model="value">
    <div>Radio Label</div>
    <p-caption>Text</p-caption>
  </p-radio>
</preview>

```vue
<template>
  <p-radio v-model="value">
    <div>Radio Label</div>
    <p-caption>Text</p-caption>
  </p-radio>
</template>
```

## Disabled State

<preview>
  <p-radio disabled>
    Radio Label
  </p-radio>
</preview>

```vue
<template>
  <p-radio v-model="value" disabled>
    Radio Label
  </p-radio>
</template>
```

## Readonly State

<preview>
  <p-radio readonly>
    Radio Label
  </p-radio>
</preview>

```vue
<template>
  <p-radio readonly>
    Radio Label
  </p-radio>
</template>
```

## Binding v-model

<preview class="justify-center">
  <div class="flex flex-col space-y-3">
    <p-radio v-model="selected" value="apple">Apple</p-radio>
    <p-radio v-model="selected" value="grape">Grape</p-radio>
    <p-radio v-model="selected" value="orange">Orange</p-radio>
  </div>
</preview>

**Selected :**

<pre><code>{{ selected }}</code></pre>

```vue
<template>
  <p-radio v-model="selected" value="apple">Apple</p-radio>
  <p-radio v-model="selected" value="grape">Grape</p-radio>
  <p-radio v-model="selected" value="orange">Orange</p-radio>
</template>
```

## Appearance

Some case, you may need some [Checkbox][checkbox] but work like a Radio. You can change the appearance via `appearance` props.

<preview class="justify-center">
  <div class="flex flex-col space-y-3">
    <p-radio appearance="checkbox" v-model="selected" value="apple">Apple</p-radio>
    <p-radio appearance="checkbox" v-model="selected" value="grape">Grape</p-radio>
    <p-radio appearance="checkbox" v-model="selected" value="orange">Orange</p-radio>
  </div>
</preview>

**Selected :**

<pre><code>{{ selected }}</code></pre>

```vue
<template>
  <p-radio appearance="checkbox" v-model="selected" value="apple">Apple</p-radio>
  <p-radio appearance="checkbox" v-model="selected" value="grape">Grape</p-radio>
  <p-radio appearance="checkbox" v-model="selected" value="orange">Orange</p-radio>
</template>
```

## Custom Appearance

Also, apart from the `appearance` variants that have been provided, you can explore at will to create a radio with the appearance fit to your need.

Just set `appearance` to `none`, can create your own radio's appearance.

### Icon and text
<preview class="justify-center">
  <div class="flex flex-col space-y-3">
    <p-radio appearance="none" v-model="selected" value="Olivia Withness">
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="px-4 py-2 hover:shadow-md hover:border-subtle hover:dark:border-dark-subtle ease-in-out duration-200 min-w-[223px]"
          :class="{ '!border-info-emphasis dark:!border-dark-info-emphasis' : isChecked }"
          sectioned>
          <div class="flex items-center space-x-3">
            <IconBee class="text-muted dark:text-dark-muted" />
            <div>
              Olivia Withness
              <p-caption>olivia@eth.com</p-caption>
            </div>
          </div>
        </p-card>
      </template>
    </p-radio>
    <p-radio appearance="none" v-model="selected" value="Hyuga Kojiro">
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="px-4 py-2 hover:shadow-md hover:border-subtle hover:dark:border-dark-subtle ease-in-out duration-200 min-w-[223px]"
          :class="{ '!border-info-emphasis dark:!border-dark-info-emphasis' : isChecked }"
          sectioned>
          <div class="flex items-center space-x-3">
            <IconBee class="text-muted dark:text-dark-muted" />
            <div>
              Hyuga Kojiro
              <p-caption>hyuga@gmail.com</p-caption>
            </div>
          </div>
        </p-card>
      </template>
    </p-radio>
    <p-radio appearance="none" v-model="selected" value="Marsha Timoty" disabled>
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="px-4 py-2 hover:shadow-md hover:border-subtle hover:dark:border-dark-subtle ease-in-out duration-200 min-w-[223px]"
          :class="{ '!border-info-emphasis dark:!border-dark-info-emphasis' : isChecked }"
          sectioned>
          <div class="flex items-center space-x-3">
            <IconBee class="text-muted dark:text-dark-muted" />
            <div>
              Marsha Timoty
              <p-caption>timoty@marsha.com</p-caption>
            </div>
          </div>
        </p-card>
      </template>
    </p-radio>
  </div>
</preview>

**Selected :**

<pre><code>{{ selected }}</code></pre>

```vue
<template>
  <div class="flex flex-col space-y-3">
    <p-radio appearance="none" v-model="selected" value="Olivia Withness">
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="px-4 py-2 hover:shadow-md hover:border-subtle hover:dark:border-dark-subtle ease-in-out duration-200 min-w-[223px]"
          :class="{ '!border-info-emphasis dark:!border-dark-info-emphasis': isChecked }"
          sectioned>
          <div class="flex items-center space-x-3">
            <IconBee class="text-muted dark:text-dark-muted" />
            <div>
              Olivia Withness
              <p-caption>olivia@eth.com</p-caption>
            </div>
          </div>
        </p-card>
      </template>
    </p-radio>
    <p-radio appearance="none" v-model="selected" value="Hyuga Kojiro">
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="px-4 py-2 hover:shadow-md hover:border-subtle hover:dark:border-dark-subtle ease-in-out duration-200 min-w-[223px]"
          :class="{ '!border-info-emphasis dark:!border-dark-info-emphasis': isChecked }"
          sectioned>
          <div class="flex items-center space-x-3">
            <IconBee class="text-muted dark:text-dark-muted" />
            <div>
              Hyuga Kojiro
              <p-caption>hyuga@gmail.com</p-caption>
            </div>
          </div>
        </p-card>
      </template>
    </p-radio>
    <p-radio appearance="none" v-model="selected" value="Marsha Timoty" disabled>
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="px-4 py-2 hover:shadow-md hover:border-subtle hover:dark:border-dark-subtle ease-in-out duration-200 min-w-[223px]"
          :class="{ '!border-info-emphasis dark:!border-dark-info-emphasis': isChecked }"
          sectioned>
          <div class="flex items-center space-x-3">
            <IconBee class="text-muted dark:text-dark-muted" />
            <div>
              Marsha Timoty
              <p-caption>timoty@marsha.com</p-caption>
            </div>
          </div>
        </p-card>
      </template>
    </p-radio>
  </div>
</template>
```

### Icon only

<preview class="justify-center">
  <div class="flex space-x-3">
    <p-radio appearance="none" v-model="selected" value="Bee">
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="p-4 duration-200 ease-in-out hover:shadow-md hover:border-subtle hover:dark:border-dark-subtle"
          :class="{ '!border-info-emphasis dark:!border-dark-info-emphasis': isChecked }"
          sectioned>
          <IconBee />
        </p-card>
      </template>
    </p-radio>
    <p-radio appearance="none" v-model="selected" value="Bug">
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="p-4 duration-200 ease-in-out hover:shadow-md hover:border-subtle hover:dark:border-dark-subtle"
          :class="{ '!border-info-emphasis dark:!border-dark-info-emphasis': isChecked }"
          sectioned>
          <IconBug />
        </p-card>
      </template>
    </p-radio>
    <p-radio appearance="none" v-model="selected" value="Bee Bat" disabled>
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="p-4 duration-200 ease-in-out hover:shadow-md hover:border-subtle hover:dark:border-dark-subtle"
          :class="{ '!border-info-emphasis dark:!border-dark-info-emphasis': isChecked }"
          sectioned>
            <IconBeeBat />
        </p-card>
      </template>
    </p-radio>
  </div>
</preview>

**Selected :**

<pre><code>{{ selected }}</code></pre>

```vue
<template>
  <div class="flex space-x-3">
    <p-radio appearance="none" v-model="selected" value="Bee">
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="p-4 duration-200 ease-in-out hover:shadow-md hover:border-subtle hover:dark:border-dark-subtle"
          :class="{ '!border-info-emphasis dark:!border-dark-info-emphasis': isChecked }"
          sectioned>
          <IconBee />
        </p-card>
      </template>
    </p-radio>
    <p-radio appearance="none" v-model="selected" value="Bug">
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="p-4 duration-200 ease-in-out hover:shadow-md hover:border-subtle hover:dark:border-dark-subtle"
          :class="{ '!border-info-emphasis dark:!border-dark-info-emphasis': isChecked }"
          sectioned>
          <IconBug />
        </p-card>
      </template>
    </p-radio>
    <p-radio appearance="none" v-model="selected" value="Bee Bat" disabled>
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="p-4 duration-200 ease-in-out hover:shadow-md hover:border-subtle hover:dark:border-dark-subtle"
          :class="{ '!border-info-emphasis dark:!border-dark-info-emphasis': isChecked }"
          sectioned>
            <IconBeeBat />
        </p-card>
      </template>
    </p-radio>
  </div>
</template>
```

### Color Picker

<preview class="justify-center">
  <div class="flex space-x-3">
    <p-radio appearance="none" v-model="selected" value="#0065D1">
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="p-3 hover:shadow-md ease-in-out duration-200 !bg-[#0065D1] !border-[#0065D1]"
          sectioned>
          <IconCheck
            class="duration-200 ease-in-out text-state-emphasis dark:text-dark-state-emphasis"
            :class="[isChecked ? 'opacity-100' : 'opacity-0']" />
        </p-card>
      </template>
    </p-radio>
    <p-radio appearance="none" v-model="selected" value="#F5A623">
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="p-3 hover:shadow-md ease-in-out duration-200 !bg-[#F5A623] !border-[#F5A623]"
          sectioned>
          <IconCheck
            class="duration-200 ease-in-out text-state-emphasis dark:text-dark-state-emphasis"
            :class="[isChecked ? 'opacity-100' : 'opacity-0']" />
        </p-card>
      </template>
    </p-radio>
    <p-radio appearance="none" v-model="selected" value="#23B242" disabled>
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="p-3 hover:shadow-md ease-in-out duration-200 !bg-[#23B242] !border-[#23B242]"
          sectioned>
          <IconCheck
            class="duration-200 ease-in-out text-state-emphasis dark:text-dark-state-emphasis"
            :class="[isChecked ? 'opacity-100' : 'opacity-0']" />
        </p-card>
      </template>
    </p-radio>
  </div>
</preview>

**Selected :**

<pre><code>{{ selected }}</code></pre>

```vue
<template>
  <div class="flex space-x-3">
    <p-radio appearance="none" v-model="selected" value="#0065D1">
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="p-3 hover:shadow-md ease-in-out duration-200 !bg-[#0065D1] !border-[#0065D1]"
          sectioned>
          <IconCheck
            class="duration-200 ease-in-out text-state-emphasis dark:text-dark-state-emphasis"
            :class="[isChecked ? 'opacity-100' : 'opacity-0']" />
        </p-card>
      </template>
    </p-radio>
    <p-radio appearance="none" v-model="selected" value="#F5A623">
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="p-3 hover:shadow-md ease-in-out duration-200 !bg-[#F5A623] !border-[#F5A623]"
          sectioned>
          <IconCheck
            class="duration-200 ease-in-out text-state-emphasis dark:text-dark-state-emphasis"
            :class="[isChecked ? 'opacity-100' : 'opacity-0']" />
        </p-card>
      </template>
    </p-radio>
    <p-radio appearance="none" v-model="selected" value="#23B242" disabled>
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="p-3 hover:shadow-md ease-in-out duration-200 !bg-[#23B242] !border-[#23B242]"
          sectioned>
          <IconCheck
            class="duration-200 ease-in-out text-state-emphasis dark:text-dark-state-emphasis"
            :class="[isChecked ? 'opacity-100' : 'opacity-0']" />
        </p-card>
      </template>
    </p-radio>
  </div>
</template>
```

### Image Picker

<preview class="justify-center">
  <div class="flex space-x-3">
    <p-radio appearance="none" v-model="selected" value="image 01">
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="flex items-center justify-center hover:shadow-md ease-in-out duration-200 bg-[url('/assets/images/img-radio-picker-01.svg')] bg-cover bg-no-repeat !border-0 relative overflow-hidden w-14 h-14"
          :class="{ 'after:absolute after:left-0 after:top-0 after:content-[\'\'] after:w-full after:h-full after:bg-inverse/50 after:z-[1]' : selected === 'image 01' }"
          sectioned>
          <IconCheck
            class="ease-in-out duration-200 text-state-emphasis dark:text-dark-state-emphasis relative z-[2]"
            :class="[isChecked ? 'opacity-100' : 'opacity-0']" />
        </p-card>
      </template>
    </p-radio>
    <p-radio appearance="none" v-model="selected" value="image 02">
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="flex items-center justify-center hover:shadow-md ease-in-out duration-200 bg-[url('/assets/images/img-radio-picker-02.svg')] bg-cover bg-no-repeat !border-0 relative overflow-hidden w-14 h-14"
          :class="{ 'after:absolute after:left-0 after:top-0 after:content-[\'\'] after:w-full after:h-full after:bg-inverse/50 after:z-[1]' : selected === 'image 02' }"
          sectioned>
          <IconCheck
            class="ease-in-out duration-200 text-state-emphasis dark:text-dark-state-emphasis relative z-[2]"
            :class="[isChecked ? 'opacity-100' : 'opacity-0']" />
        </p-card>
      </template>
    </p-radio>
    <p-radio appearance="none" v-model="selected" value="image 03" disabled>
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="flex items-center justify-center hover:shadow-md ease-in-out duration-200 bg-[url('/assets/images/img-radio-picker-03.svg')] bg-cover bg-no-repeat !border-0 relative overflow-hidden w-14 h-14"
          :class="{ 'after:absolute after:left-0 after:top-0 after:content-[\'\'] after:w-full after:h-full after:bg-inverse/50 after:z-[1]' : selected === 'image 03' }"
          sectioned>
          <IconCheck
            class="ease-in-out duration-200 text-state-emphasis dark:text-dark-state-emphasis relative z-[2]"
            :class="[isChecked ? 'opacity-100' : 'opacity-0']" />
        </p-card>
      </template>
    </p-radio>
  </div>
</preview>

**Selected :**

<pre><code>{{ selected }}</code></pre>

```vue
<template>
  <div class="flex space-x-3">
    <p-radio appearance="none" v-model="selected" value="image 01">
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="flex items-center justify-center hover:shadow-md ease-in-out duration-200 bg-[url('/assets/images/img-radio-picker-01.svg')] bg-cover bg-no-repeat !border-0 relative overflow-hidden w-14 h-14"
          :class="{ 'after:absolute after:left-0 after:top-0 after:content-[\'\'] after:w-full after:h-full after:bg-inverse/50 after:z-[1]' : selected === 'image 01' }"
          sectioned>
          <IconCheck
            class="ease-in-out duration-200 text-on-emphasis dark:text-dark-on-emphasis relative z-[2]"
            :class="[isChecked ? 'opacity-100' : 'opacity-0']" />
        </p-card>
      </template>
    </p-radio>
    <p-radio appearance="none" v-model="selected" value="image 02">
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="flex items-center justify-center hover:shadow-md ease-in-out duration-200 bg-[url('/assets/images/img-radio-picker-02.svg')] bg-cover bg-no-repeat !border-0 relative overflow-hidden w-14 h-14"
          :class="{ 'after:absolute after:left-0 after:top-0 after:content-[\'\'] after:w-full after:h-full after:bg-inverse/50 after:z-[1]' : selected === 'image 02' }"
          sectioned>
          <IconCheck
            class="ease-in-out duration-200 text-on-emphasis dark:text-dark-on-emphasis relative z-[2]"
            :class="[isChecked ? 'opacity-100' : 'opacity-0']" />
        </p-card>
      </template>
    </p-radio>
    <p-radio appearance="none" v-model="selected" value="image 03" disabled>
      <template #default="{ isChecked }">
        <p-card
          element="div"
          class="flex items-center justify-center hover:shadow-md ease-in-out duration-200 bg-[url('/assets/images/img-radio-picker-03.svg')] bg-cover bg-no-repeat !border-0 relative overflow-hidden w-14 h-14"
          :class="{ 'after:absolute after:left-0 after:top-0 after:content-[\'\'] after:w-full after:h-full after:bg-inverse/50 after:z-[1]' : selected === 'image 03' }"
          sectioned>
          <IconCheck
            class="ease-in-out duration-200 text-on-emphasis dark:text-dark-on-emphasis relative z-[2]"
            :class="[isChecked ? 'opacity-100' : 'opacity-0']" />
        </p-card>
      </template>
    </p-radio>
  </div>
</template>
```


## API

### Props

| Props        |   Type    | Default | Description                                                             |
|--------------|:---------:|:-------:|-------------------------------------------------------------------------|
| `checked`    | `Boolean` | `false` | Checked condition. if it is `true`, Radio will be checked on first time |
| `value`      |   `Any`   | `true`  | Checked value                                                           |
| `disabled`   | `Boolean` | `false` | Disable state                                                           |
| `readonly`   | `Boolean` | `false` | Readonly state                                                          |
| `appearance` | `String`  | `radio` | Radio appearance, valid value is: `radio`, `checkbox`                    |
| `modelValue` |   `Any`   |   `-`   | `v-model` value                                                         |

### Slots

| Name      | Description               |
|-----------|---------------------------|
| `default` | Content to place in radio |

### Events

| Name     | Arguments | Description              |
|----------|-----------|--------------------------|
| `change` | Boolean   | Event when value changed |

## See Also
- [Checkbox][checkbox]
- [Toggle][toggle]

[checkbox]: /components/checkbox/index
[toggle]: /components/toggle/index
