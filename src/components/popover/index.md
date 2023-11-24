---
title: Popover · Components
description: Rich content tooltip
---

<script setup>
import pPopover from './Popover.vue'
import pButton from '../button/Button.vue'
import Banner from '../banner/Banner.vue'
import pCheckbox from '../checkbox/Checkbox.vue'
import { usePopoverPromise } from '.'
import * as dialog from '../dialog/index'
import { ref } from 'vue-demi'

const popoverPromise = usePopoverPromise()
const show           = ref(false)

async function confirmDelete () {
  const result = await popoverPromise.start()

  if (result === true) {
    dialog.alert({
      title: 'Info',
      text : 'Deleted',
    })
  }
}
</script>

# Popover

> Rich content tooltip

## Usage

### Simple Usage

<preview>
  <p-popover>
    <template #activator="{ show }">
      <a href="javascript:void" @click.prevent="show">
        Remove?
      </a>
    </template>
    <template #default="{ hide }">
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="hide">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="hide">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
</preview>

```vue
<template>
  <p-popover>
    <template #activator="{ show }">
      <a href="javascript:void" @click.prevent="show">
        Remove?
      </a>
    </template>
    <template #default="{ hide }">
      <div class="space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="hide">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="hide">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
</template>
```

### Async Usage

<preview>
  <p-popover v-bind="popoverPromise.bind()">
    <template #activator>
      <a href="javascript:void" @click.prevent="confirmDelete()">
        Remove?
      </a>
    </template>
    <template #default>
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="popoverPromise.finish(true)">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="popoverPromise.finish(false)">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
</preview>

```vue
<template>
  <p-popover v-bind="popoverPromise.bind()">
    <template #activator>
      <a href="javascript:void" @click.prevent="confirmDelete()">
        Remove?
      </a>
    </template>
    <template #default>
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="popoverPromise.finish(true)">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="popoverPromise.finish(false)">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
</template>

<script lang="ts" setup>
import { dialog, usePopoverPromise } from '@privyid/persona/core'

const popoverPromise = usePopoverPromise<boolean>()

async function confirmDelete () {
  const result = await popoverPromise.start()

  if (result === true) {
    dialog.alert({
      title: 'Info',
      text : 'Deleted',
    })
  }
}
</script>
```

## Color

You can change popover color using props `color`, valid value is  `white` and `black`, default is `white`

<preview class="space-x-2">
  <p-popover color="white">
    <template #activator="{ show }">
      <a href="javascript:void" @click.prevent="show">
        White
      </a>
    </template>
    <template #default="{ hide }">
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="hide">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="hide">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
  <p-popover color="black">
    <template #activator="{ show }">
      <a href="javascript:void" @click.prevent="show">
        Black
      </a>
    </template>
    <template #default="{ hide }">
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="hide">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="hide">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
</preview>

## Placement

You can change popup placement via `placement` prop. Valid options is:

- `top`
- `bottom`
- `right`
- `left`

<preview class="space-x-3">
  <p-popover placement="top">
    <template #activator="{ show }">
      <a href="javascript:void" @click.prevent="show">
        Top
      </a>
    </template>
    <template #default="{ hide }">
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="hide">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="hide">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
  <p-popover placement="bottom">
    <template #activator="{ show }">
      <a href="javascript:void" @click.prevent="show">
        Bottom
      </a>
    </template>
    <template #default="{ hide }">
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="hide">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="hide">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
  <p-popover placement="left">
    <template #activator="{ show }">
      <a href="javascript:void" @click.prevent="show">
        Left
      </a>
    </template>
    <template #default="{ hide }">
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="hide">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="hide">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
  <p-popover placement="right">
    <template #activator="{ show }">
      <a href="javascript:void" @click.prevent="show">
        Right
      </a>
    </template>
    <template #default="{ hide }">
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="hide">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="hide">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
</preview>

```vue
<template>
  <p-popover placement="top">
    <template #activator="{ show }">
      <a href="javascript:void" @click.prevent="show">
        Top
      </a>
    </template>
    <template #default="{ hide }">
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="hide">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="hide">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
  <p-popover placement="bottom">
    <template #activator="{ show }">
      <a href="javascript:void" @click.prevent="show">
        Bottom
      </a>
    </template>
    <template #default="{ hide }">
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="hide">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="hide">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
  <p-popover placement="left">
    <template #activator="{ show }">
      <a href="javascript:void" @click.prevent="show">
        Left
      </a>
    </template>
    <template #default="{ hide }">
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="hide">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="hide">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
  <p-popover placement="right">
    <template #activator="{ show }">
      <a href="javascript:void" @click.prevent="show">
        Right
      </a>
    </template>
    <template #default="{ hide }">
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="hide">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="hide">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
</template>
```

### Placement Align

You can combine placement with suffix `*-start` and `*-end` to set popup position align

<Banner class="md:!hidden" :dismissable="false">Because limited screen width, maybe you can't notice the different.</Banner>

<preview class="space-x-3">
  <p-popover placement="bottom">
    <template #activator="{ show }">
      <a href="javascript:void" @click.prevent="show">
        Bottom
      </a>
    </template>
    <template #default="{ hide }">
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="hide">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="hide">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
  <p-popover placement="bottom-start">
    <template #activator="{ show }">
      <a href="javascript:void" @click.prevent="show">
        Bottom Start
      </a>
    </template>
    <template #default="{ hide }">
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="hide">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="hide">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
  <p-popover placement="bottom-end">
    <template #activator="{ show }">
      <a href="javascript:void" @click.prevent="show">
        Bottom End
      </a>
    </template>
    <template #default="{ hide }">
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="hide">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="hide">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
</preview>

```vue
<template>
  <p-popover placement="bottom">
    <template #activator="{ show }">
      <a href="javascript:void" @click.prevent="show">
        Bottom
      </a>
    </template>
    <template #default="{ hide }">
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="hide">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="hide">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
  <p-popover placement="bottom-start">
    <template #activator="{ show }">
      <a href="javascript:void" @click.prevent="show">
        Bottom Start
      </a>
    </template>
    <template #default="{ hide }">
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="hide">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="hide">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
  <p-popover placement="bottom-end">
    <template #activator="{ show }">
      <a href="javascript:void" @click.prevent="show">
        Bottom End
      </a>
    </template>
    <template #default="{ hide }">
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="hide">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="hide">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
</template>
```

## Binding v-model

You can programmatically toggle popover using `v-model`

<preview class="flex-col space-y-2">
  <p-checkbox v-model="show">Show Popover</p-checkbox>
  <p-popover placement="bottom" v-model="show">
    <template #activator="{ show }">
      <a href="javascript:void" @click.prevent="show">
        Popover
      </a>
    </template>
    <template #default="{ hide }">
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="hide">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="hide">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
</preview>

```vue
<template>
  <p-checkbox v-model="show">Show Popover</p-checkbox>
  <p-popover placement="bottom" v-model="show">
    <template #activator="{ show }">
      <a href="javascript:void" @click.prevent="show">
        Popover
      </a>
    </template>
    <template #default="{ hide }">
      <div class="flex items-center space-x-2">
        <span>Are you sure?</span>
        <p-button color="success" size="xs" @click="hide">
          Yes
        </p-button>
        <p-button color="danger" size="xs" @click="hide">
          Cancel
        </p-button>
      </div>
    </template>
  </p-popover>
</template>
```

## API

### Props

| Props        |   Type    |  Default  | Description                                                                                                                                                                                     |
|--------------|:---------:|:---------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `color`      | `String`  | `primary` | Popover color variant, valid value is `white`, `black`                                                                                                                                          |
| `disabled`   | `Boolean` |  `false`  | Disable state                                                                                                                                                                                   |
| `placement`  | `String`  |   `top`   | Popover placement, valid value is <br/>`top`, `top-start`, `top-end`,<br/>`bottom`, `bottom-start`, `bottom-end`,<br/>`right`, `right-start`, `right-end`,<br/>`left`, `left-start`, `left-end` |
| `modelValue` | `Boolean` |  `false`  | v-model value for show and hide                                                                                                                                                                 |

### Slots

| Name        | Description            |
|-------------|------------------------|
| `default`   | Popover menu content   |
| `activator` | Popover target content |

### Events

| Name   | Arguments | Description               |
|--------|-----------|---------------------------|
| `show` | -         | Event when popover shown  |
| `hide` | -         | Event when popover hidden |

## See Also

- [Dropdown](../dropdown/)
- [Tooltip](../tooltip/)
