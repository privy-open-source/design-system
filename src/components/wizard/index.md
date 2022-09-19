<script setup>
  import pWizard from './Wizard.vue'
  import pWizardStep from './WizardStep.vue'
  import pButton from '../button/Button.vue'
  import pCard from '../card/Card.vue'
  import IconDocument from '@carbon/icons-vue/lib/document/16'
  import { ref } from 'vue-demi'
</script>

# Wizard

## Usage

### Simple Usage

<preview>
  <p-wizard>
    <p-wizard-step title="Step 1">
      <template #icon>
        <IconDocument />
      </template>
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">Step 1</div>
          <div class="space-x-2">
            <p-button disabled>Prev</p-button>
            <p-button @click="next">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
    <p-wizard-step title="Step 2">
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">Step 2</div>
          <div class="space-x-2">
            <p-button @click="prev">Prev</p-button>
            <p-button @click="next">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
    <p-wizard-step title="Step 3">
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">Step 3</div>
          <div class="space-x-2">
            <p-button @click="prev">Prev</p-button>
            <p-button @click="next">Next</p-button>
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
            <p-button disabled>Prev</p-button>
            <p-button @click="next">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
    <p-wizard-step title="Step 2">
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">Step 2</div>
          <div class="space-x-2">
            <p-button @click="prev">Prev</p-button>
            <p-button @click="next">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
    <p-wizard-step title="Step 3">
      <template #default="{ next, prev }">
        <div class="flex flex-col h-52">
          <div class="flex-grow">Step 3</div>
          <div class="space-x-2">
            <p-button @click="prev">Prev</p-button>
            <p-button @click="next">Next</p-button>
          </div>
        </div>
      </template>
    </p-wizard-step>
  </p-wizard>
</template>
```
