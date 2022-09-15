<script setup>
  import pSteps from './Steps.vue'
  import pStep from './Step.vue'
  import pCard from '../card/Card.vue'
  import pButton from '../button/Button.vue'
  import pProgress from '../progress/Progress.vue'
  import pProgressItem from '../progress/ProgressItem.vue'
  import { ref } from 'vue-demi'

  const step = ref(1)
</script>

# Steps
> Headless Wizard

## Usage

### Simple Usage

<preview>
  <p-steps v-model="step">
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
      <template #default="{ next, prev, canNext, canPrev }">
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
      <template #default="{ next, prev, canNext, canPrev }">
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

### with Progress

<preview class="flex-col">
  <p-progress :active="step">
    <p-progress-item label="Step 1" />
    <p-progress-item label="Step 2" />
    <p-progress-item label="Step 3" />
  </p-progress>
  <p-steps v-model="step">
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
      <template #default="{ next, prev, canNext, canPrev }">
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
      <template #default="{ next, prev, canNext, canPrev }">
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
  <p-steps v-model="step">
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
      <template #default="{ next, prev, canNext, canPrev }">
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
      <template #default="{ next, prev, canNext, canPrev }">
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

