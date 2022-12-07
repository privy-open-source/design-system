<script setup>
  import pWizard from './Wizard.vue'
  import pWizardStep from './WizardStep.vue'
  import pButton from '../button/Button.vue'
  import pInput from '../input/Input.vue'
  import IconDocument from '@carbon/icons-vue/lib/document/16'
  import { reactive } from 'vue-demi'
  import { dialog } from '../../core/'

  const form = reactive({
    name : '',
    email: '',
  })

  function validate (to, currentStep) {
    if (currentStep === 1) {
      if (!form.name) {
        dialog.alert({ text: 'Name is required' })

        return false
      }
    }

    if (currentStep === 2) {
      if (!form.email || !form.email.includes('@')) {
        dialog.alert({ text: 'Email must be valid email' })

        return false
      }
    }

    return true
  }

  function save () {
    dialog.alert({ text: 'Success'})
  }
</script>

# Wizard
> Fancy form wizard

## Usage

### Simple Usage

<preview>
  <p-wizard variant="counter">
    <p-wizard-step title="Step 1">
      <template #icon>
        <IconDocument />
      </template>
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">Step 1</div>
          <div class="space-x-2">
            <p-button disabled color="primary">Prev</p-button>
            <p-button @click="next" color="primary">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
    <p-wizard-step title="Step 2">
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">Step 2</div>
          <div class="space-x-2">
            <p-button @click="prev" color="primary">Prev</p-button>
            <p-button @click="next" color="primary">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
    <p-wizard-step title="Step 3">
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">Step 3</div>
          <div class="space-x-2">
            <p-button @click="prev" color="primary">Prev</p-button>
            <p-button @click="next" color="primary">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
  </p-wizard>
</preview>

```vue
<template>
  <p-wizard>
    <p-wizard-step title="Step 1">
      <template #icon>
        <IconDocument />
      </template>
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">Step 1</div>
          <div class="space-x-2">
            <p-button disabled color="primary">Prev</p-button>
            <p-button @click="next" color="primary">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
    <p-wizard-step title="Step 2">
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">Step 2</div>
          <div class="space-x-2">
            <p-button @click="prev" color="primary">Prev</p-button>
            <p-button @click="next" color="primary">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
    <p-wizard-step title="Step 3">
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">Step 3</div>
          <div class="space-x-2">
            <p-button @click="prev" color="primary">Prev</p-button>
            <p-button @click="next" color="primary">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
  </p-wizard>
</template>
```

## Variant

Inherit from [Progress](/components/progress/), you can set progress `variant` and `title-variant` in here.

<preview>
  <p-wizard
    variant="counter"
    title-variant="general">
    <p-wizard-step title="Step 1">
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">Step 1</div>
          <div class="space-x-2">
            <p-button disabled color="primary">Prev</p-button>
            <p-button @click="next" color="primary">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
    <p-wizard-step title="Step 2">
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">Step 2</div>
          <div class="space-x-2">
            <p-button @click="prev" color="primary">Prev</p-button>
            <p-button @click="next" color="primary">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
    <p-wizard-step title="Step 3">
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">Step 3</div>
          <div class="space-x-2">
            <p-button @click="prev" color="primary">Prev</p-button>
            <p-button @click="next" color="primary">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
  </p-wizard>
</preview>

```vue
<template>
  <p-wizard
    variant="counter"
    title-variant="general">
    <p-wizard-step title="Step 1">
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">Step 1</div>
          <div class="space-x-2">
            <p-button disabled color="primary">Prev</p-button>
            <p-button @click="next" color="primary">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
    <p-wizard-step title="Step 2">
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">Step 2</div>
          <div class="space-x-2">
            <p-button @click="prev" color="primary">Prev</p-button>
            <p-button @click="next" color="primary">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
    <p-wizard-step title="Step 3">
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">Step 3</div>
          <div class="space-x-2">
            <p-button @click="prev" color="primary">Prev</p-button>
            <p-button @click="next" color="primary">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
  </p-wizard>
</template>
```

## Hooks

All hooks from [Steps](/components/steps/) like `on-before-next`, `on-before-prev` and `on-finished` also work at here.

<preview>
  <p-wizard
    :on-before-next="validate"
    :on-finished="save">
    <p-wizard-step title="Step 1">
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">
            <label>Name</label>
            <p-input v-model="form.name" placeholder="Fill to next" />
          </div>
          <div class="space-x-2">
            <p-button disabled color="primary">Prev</p-button>
            <p-button @click="next" color="primary">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
    <p-wizard-step title="Step 2">
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">
            <label>Email</label>
            <p-input v-model="form.email" placeholder="Fill to next" />
          </div>
          <div class="space-x-2">
            <p-button @click="prev" color="primary">Prev</p-button>
            <p-button @click="next" color="primary">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
  </p-wizard>
</preview>

```vue
<template>
  <p-wizard
    :on-before-next="validate"
    :on-finished="save">
    <p-wizard-step title="Step 1">
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">
            <label>Name</label>
            <p-input v-model="form.name" placeholder="Fill to next" />
          </div>
          <div class="space-x-2">
            <p-button disabled color="primary">Prev</p-button>
            <p-button @click="next" color="primary">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
    <p-wizard-step title="Step 2">
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">
            <label>Email</label>
            <p-input v-model="form.email" placeholder="Fill to next" />
          </div>
          <div class="space-x-2">
            <p-button @click="prev" color="primary">Prev</p-button>
            <p-button @click="next" color="primary">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
  </p-wizard>
</template>

<script setup>
  import { reactive } from 'vue-demi'
  import { dialog } from '@privyid/persona/core/'

  const form = reactive({
    name : '',
    email: '',
  })

  function validate (to, currentStep) {
    if (currentStep === 1) {
      if (!form.name) {
        dialog.alert({ text: 'Name is required' })

        return false
      }
    }

    if (currentStep === 2) {
      if (!form.email || !form.email.includes('@')) {
        dialog.alert({ text: 'Email must be valid email' })

        return false
      }
    }

    return true
  }

  function save () {
    dialog.alert({ text: 'Success'})
  }
</script>
```

Go to [Steps](/components/steps/#hooks) for more examples.

## API

### Props `<p-wizard>`

| Props            |    Type    |  Default   | Description                                                           |
|------------------|:----------:|:----------:|-----------------------------------------------------------------------|
| `variant`        |  `String`  |   `dot`    | Wizard's progress point variant, valid value is `dot`, `counter`      |
| `titleVariant`   |  `String`  | `specific` | Wizard's progress title variant, valid value is `specific`, `general` |
| `on-before-next` | `Function` |    `-`     | Hook which run before navigate to next page                           |
| `on-before-prev` | `Function` |    `-`     | Hook which run before navigate to previous page                       |
| `on-finished`    | `Function` |    `-`     | Hook which run on last step, after `on-before-next` hook resolved     |
| `keep-alive`     | `Boolean`  |  `false`   | Enable [KeepAlive][KeepAlive]                                         |
| `modelValue`     |  `Number`  |    `1`     | Binding v-model                                                       |

### Slot `<p-wizard>`

| Name      | Description                        |
|-----------|------------------------------------|
| `default` | Content to place `<p-wizard-step>` |

### Events `<p-wizard>`

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Arguments</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="3" class="text-center">There no event here</td>
    </tr>
  </tbody>
</table>

### Props `<p-wizard-step>`

| Props            |    Type    | Default | Description                                     |
|------------------|:----------:|:-------:|-------------------------------------------------|
| `title`          |  `String`  |   `-`   | Step title                                      |
| `on-before-next` | `Function` |   `-`   | Hook which run before navigate to next page     |
| `on-before-prev` | `Function` |   `-`   | Hook which run before navigate to previous page |

### Slots `<p-wizard-step>`

| Name      | Description                             |
|-----------|-----------------------------------------|
| `default` | Step content                            |
| `title`   | Content to use as title                 |
| `icon`    | Content to place as progress point icon |

### Events `<p-wizard-step>`

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Arguments</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="3" class="text-center">There no event here</td>
    </tr>
  </tbody>
</table>

## See Also

- [Steps](/components/steps/)
- [Progress](/components/progress/)

[KeepAlive]: https://vuejs.org/guide/built-ins/keep-alive.html
