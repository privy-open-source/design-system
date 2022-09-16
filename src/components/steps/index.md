<script setup>
  import pSteps from './Steps.vue'
  import pStep from './Step.vue'
  import pCard from '../card/Card.vue'
  import pButton from '../button/Button.vue'
  import pInput from '../input/Input.vue'
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
            <div class="space-x-2">
              <p-button disabled>Prev</p-button>
              <p-button @click="next">Next</p-button>
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
            <div class="space-x-2">
              <p-button @click="prev">Prev</p-button>
              <p-button @click="next">Next</p-button>
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
            <div class="space-x-2">
              <p-button @click="prev">Prev</p-button>
              <p-button @click="next">Finish</p-button>
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
            <div class="space-x-2">
              <p-button disabled>Prev</p-button>
              <p-button @click="next">Next</p-button>
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
            <div class="space-x-2">
              <p-button @click="prev">Prev</p-button>
              <p-button @click="next">Next</p-button>
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
            <div class="space-x-2">
              <p-button @click="prev">Prev</p-button>
              <p-button @click="next">Finish</p-button>
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
            <div class="space-x-2">
              <p-button disabled>Prev</p-button>
              <p-button @click="next">Next</p-button>
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
            <div class="space-x-2">
              <p-button @click="prev">Prev</p-button>
              <p-button @click="next">Next</p-button>
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
              <p-button disabled>Prev</p-button>
              <p-button @click="next">Next</p-button>
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
            <div class="space-x-2">
              <p-button @click="prev">Prev</p-button>
              <p-button @click="next">Next</p-button>
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

  function validate (to, currentStep) {
    if (currentStep === 1) {
      if (!name.value) {
        dialog.alert({ text: 'Name is required' })

        return false // return false to prevent navigate to next step
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
            <div class="space-x-2">
              <p-button disabled>Prev</p-button>
              <p-button @click="next">Next</p-button>
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
            <div class="space-x-2">
              <p-button @click="prev">Prev</p-button>
              <p-button @click="next">Next</p-button>
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
            <div class="space-x-2">
              <p-button disabled>Prev</p-button>
              <p-button @click="next">Next</p-button>
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
            <div class="space-x-2">
              <p-button @click="prev">Prev</p-button>
              <p-button @click="next">Next</p-button>
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

  function validate (to, currentStep) { /* Example above */ }

  function save() {
    dialog.alert({ text: 'Success' })
  }
</script>
```
