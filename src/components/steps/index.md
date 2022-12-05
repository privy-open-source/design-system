<script setup>
  import pSteps from './Steps.vue'
  import pStep from './Step.vue'
  import pCard from '../card/Card.vue'
  import pButton from '../button/Button.vue'
  import pInput from '../input/Input.vue'
  import pBanner from '../banner/Banner.vue'
  import { reactive, ref } from 'vue-demi'
  import { dialog } from '../../core/'

  const step = ref(1)

  const form = reactive({
    name : '',
    email: '',
  })

  function validate (to, from) {
    if (from === 1) {
      if (!form.name) {
        dialog.alert({ text: 'Name is required' })

        return false
      }
    }

    if (from === 2) {
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

# Steps
> Headless Wizard

## Usage

### Simple Usage

<preview>
  <p-steps>
    <p-step>
      <template #default="{ next, prev }">
        <p-card>
          <div class="flex flex-col h-52">
            <div class="flex-grow">Step 1</div>
            <div class="space-gap-2">
              <p-button disabled color="primary">Prev</p-button>
              <p-button @click="next" color="primary">Next</p-button>
            </div>
          </div>
        </p-card>
      </template>
    </p-step>
    <p-step>
      <template #default="{ next, prev }">
        <p-card>
          <div class="flex flex-col h-52">
            <div class="flex-grow">Step 2</div>
            <div class="space-gap-2">
              <p-button @click="prev" color="primary">Prev</p-button>
              <p-button @click="next" color="primary">Next</p-button>
            </div>
          </div>
        </p-card>
      </template>
    </p-step>
    <p-step>
      <template #default="{ next, prev, toStep }">
        <p-card>
          <div class="flex flex-col h-52">
            <div class="flex-grow">Step 3</div>
            <div class="space-gap-2">
              <p-button @click="prev" color="primary">Prev</p-button>
              <p-button @click="next" color="primary">Finish</p-button>
              <p-button @click="toStep(1)" color="primary">To Step 1</p-button>
            </div>
          </div>
        </p-card>
      </template>
    </p-step>
  </p-steps>
</preview>

```vue
<template>
  <p-steps>
    <p-step>
      <template #default="{ next, prev }">
        <p-card>
          <div class="flex flex-col h-52">
            <div class="flex-grow">Step 1</div>
            <div class="space-gap-2">
              <p-button disabled color="primary">Prev</p-button>
              <p-button @click="next" color="primary">Next</p-button>
            </div>
          </div>
        </p-card>
      </template>
    </p-step>
    <p-step>
      <template #default="{ next, prev }">
        <p-card>
          <div class="flex flex-col h-52">
            <div class="flex-grow">Step 2</div>
            <div class="space-gap-2">
              <p-button @click="prev" color="primary">Prev</p-button>
              <p-button @click="next" color="primary">Next</p-button>
            </div>
          </div>
        </p-card>
      </template>
    </p-step>
    <p-step>
      <template #default="{ next, prev, to }">
        <p-card>
          <div class="flex flex-col h-52">
            <div class="flex-grow">Step 3</div>
            <div class="space-gap-2">
              <p-button @click="prev" color="primary">Prev</p-button>
              <p-button @click="next" color="primary">Finish</p-button>
              <p-button @click="to(1)" color="primary">To Step 1</p-button>
            </div>
          </div>
        </p-card>
      </template>
    </p-step>
  </p-steps>
</template>
```

## Hooks

### `on-before-next` hook

This hook ran when `next` function was called, suit for form validation.

<preview>
  <p-steps :on-before-next="validate">
    <p-step>
      <template #default="{ next, prev }">
        <p-card>
          <div class="flex flex-col h-52">
            <div class="flex-grow">
              <label>Name</label>
              <p-input v-model="form.name" placeholder="Fill to next" />
            </div>
            <div class="space-gap-2">
              <p-button disabled color="primary">Prev</p-button>
              <p-button @click="next" color="primary">Next</p-button>
            </div>
          </div>
        </p-card>
      </template>
    </p-step>
    <p-step>
      <template #default="{ next, prev }">
        <p-card>
          <div class="flex flex-col h-52">
            <div class="flex-grow">
              <label>Email</label>
              <p-input v-model="form.email" placeholder="Fill to next" />
            </div>
            <div class="space-gap-2">
              <p-button @click="prev" color="primary">Prev</p-button>
              <p-button @click="next" color="primary">Next</p-button>
            </div>
          </div>
        </p-card>
      </template>
    </p-step>
  </p-steps>
</preview>

```vue
<template>
  <p-steps :on-before-next="validate">
    <p-step>
      <template #default="{ next, prev }">
        <p-card>
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
        </p-card>
      </template>
    </p-step>
    <p-step>
      <template #default="{ next, prev }">
        <p-card>
          <div class="flex flex-col h-52">
            <div class="flex-grow">
              <label>Email</label>
              <p-input v-model="form.email" placeholder="Fill to next" />
            </div>
            <div class="space-gap-2">
              <p-button @click="prev" color="primary">Prev</p-button>
              <p-button @click="next" color="primary">Next</p-button>
            </div>
          </div>
        </p-card>
      </template>
    </p-step>
  </p-steps>
</template>

<script setup>
  import { reactive } from 'vue-demi'
  import { dialog } from '@privyid/persona/core/'

  const form = reactive({
    name : '',
    email: '',
  })

  function validate (to, from) {
    if (from === 1) {
      if (!name.value) {
        dialog.alert({ text: 'Name is required' })

        return false // return false to prevent navigate to next step
      }
    }

    if (from === 2) {
      if (!form.email || !form.email.includes('@')) {
        dialog.alert({ text: 'Email must be valid email' })

        return false
      }
    }

    return true
  }
</script>
```

### `on-before-prev` hook

Similar to [`on-before-next`](#on-before-next-hook), but run when `prev` function called.

### `on-finished` hook

This hook run when `next` function called in **last step**, and after `on-before-next` resolved. It's suit for handle save form, or sending POST to API.

<preview>
  <p-steps
    :on-before-next="validate"
    :on-finished="save">
    <p-step>
      <template #default="{ next, prev }">
        <p-card>
          <div class="flex flex-col h-52">
            <div class="flex-grow">
              <label>Name</label>
              <p-input v-model="form.name" placeholder="Fill to next" />
            </div>
            <div class="space-gap-2">
              <p-button disabled color="primary">Prev</p-button>
              <p-button @click="next" color="primary">Next</p-button>
            </div>
          </div>
        </p-card>
      </template>
    </p-step>
    <p-step>
      <template #default="{ next, prev }">
        <p-card>
          <div class="flex flex-col h-52">
            <div class="flex-grow">
              <label>Email</label>
              <p-input v-model="form.email" placeholder="Fill to next" />
            </div>
            <div class="space-gap-2">
              <p-button @click="prev" color="primary">Prev</p-button>
              <p-button @click="next" color="primary">Next</p-button>
            </div>
          </div>
        </p-card>
      </template>
    </p-step>
  </p-steps>
</preview>

```vue
<template>
  <p-steps
    :on-before-next="validate"
    :on-finished="save">
    <p-step>
      <template #default="{ next, prev }">
        <p-card>
          <div class="flex flex-col h-52">
            <div class="flex-grow">
              <label>Name</label>
              <p-input v-model="form.name" placeholder="Fill to next" />
            </div>
            <div class="space-gap-2">
              <p-button disabled color="primary">Prev</p-button>
              <p-button @click="next" color="primary">Next</p-button>
            </div>
          </div>
        </p-card>
      </template>
    </p-step>
    <p-step>
      <template #default="{ next, prev }">
        <p-card>
          <div class="flex flex-col h-52">
            <div class="flex-grow">
              <label>Email</label>
              <p-input v-model="form.email" placeholder="Fill to next" />
            </div>
            <div class="space-gap-2">
              <p-button @click="prev" color="primary">Prev</p-button>
              <p-button @click="next" color="primary">Next</p-button>
            </div>
          </div>
        </p-card>
      </template>
    </p-step>
  </p-steps>
</template>

<script setup>
  import { reactive } from 'vue-demi'
  import { dialog } from '@privyid/persona/core/'

  const form = reactive({
    name : '',
    email: '',
  })

  function validate (to, from) { /* Example above */ }

  function save() {
    dialog.alert({ text: 'Success' })
  }
</script>
```

## Binding v-model

You can binding current step with v-model

<p-banner variant="danger" :dismissable="false">
  Changing the step using v-model, will skip all hooks. Use <code>toStep()</code> instead if you want to keep all hooks.
</p-banner>

<preview>
  <p-steps v-model="step">
    <p-step>
      <template #default="{ next, prev }">
        <p-card>
          <div class="flex flex-col h-52">
            <div class="flex-grow">Step 1</div>
            <div class="space-gap-2">
              <p-button disabled color="primary">Prev</p-button>
              <p-button @click="next" color="primary">Next</p-button>
            </div>
          </div>
        </p-card>
      </template>
    </p-step>
    <p-step>
      <template #default="{ next, prev }">
        <p-card>
          <div class="flex flex-col h-52">
            <div class="flex-grow">Step 2</div>
            <div class="space-gap-2">
              <p-button @click="prev" color="primary">Prev</p-button>
              <p-button @click="next" color="primary">Next</p-button>
            </div>
          </div>
        </p-card>
      </template>
    </p-step>
    <p-step>
      <template #default="{ next, prev }">
        <p-card>
          <div class="flex flex-col h-52">
            <div class="flex-grow">Step 3</div>
            <div class="space-gap-2">
              <p-button @click="prev" color="primary">Prev</p-button>
              <p-button @click="next" color="primary">Finish</p-button>
            </div>
          </div>
        </p-card>
      </template>
    </p-step>
  </p-steps>
</preview>

**Step :**

<pre><code>{{ step }}</code></pre>

## API

### Props `<p-steps>`

| Props            |    Type    | Default | Description                                                       |
|------------------|:----------:|:-------:|-------------------------------------------------------------------|
| `on-before-next` | `Function` |   `-`   | Hook which run before navigate to next page                       |
| `on-before-prev` | `Function` |   `-`   | Hook which run before navigate to previous page                   |
| `on-finished`    | `Function` |   `-`   | Hook which run on last step, after `on-before-next` hook resolved |
| `keep-alive`     | `Boolean`  | `false` | Enable [KeepAlive][KeepAlive]                                     |
| `modelValue`     |  `Number`  |   `1`   | Binding v-model                                                   |

### Slot `<p-steps>`

| Name      | Description                 |
|-----------|-----------------------------|
| `default` | Content to place `<p-step>` |

### Events `<p-steps>`

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

### Props `<p-step>`

| Props            |    Type    | Default | Description                                     |
|------------------|:----------:|:-------:|-------------------------------------------------|
| `on-before-next` | `Function` |   `-`   | Hook which run before navigate to next page     |
| `on-before-prev` | `Function` |   `-`   | Hook which run before navigate to previous page |

### Slots `<p-step>`

| Name      | Description  |
|-----------|--------------|
| `default` | Step content |

### Events `<p-step>`

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
- [Wizard](/components/wizard/)
- [Progress](/components/progress/)

[KeepAlive]: https://vuejs.org/guide/built-ins/keep-alive.html
