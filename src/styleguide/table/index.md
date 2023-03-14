---
title: Table · Style guide
description: Table style guide
---

<script setup>
  import pTable from '../../components/table/Table.vue'
  import pCaption from '../../components/caption/Caption.vue'
  import pLabel from '../../components/label/Label.vue'
  import pAvatar from '../../components/avatar/Avatar.vue'
  import pButton from '../../components/button/Button.vue'
  import pCheckbox from '../../components/checkbox/Checkbox.vue'
  import pRadio from '../../components/radio/Radio.vue'
  import pInput from '../../components/input/Input.vue'
  import pToggle from '../../components/toggle/Toggle.vue'
  import IconMenu from '@carbon/icons-vue/lib/overflow-menu--horizontal/20'
  import { defineTable } from '../../components/table'
  import { ref } from 'vue-demi'

  const fields1 = defineTable([
    {
      key: 'label',
      label: 'label',
    }
  ])

  const items1 = ref([
    {
      label: 'Text Content'
    }
  ])

  const fields2 = defineTable([
    {
      key: 'label',
      label: 'label',
      thClass: 'hidden',
    }
  ])

  const items2 = ref([
    {
      id    : 1,
      name  : 'Text Content',
      status: true,
    },
  ])

  const fields3 = defineTable([
    {
      key     : 'id',
      label   : 'PrivyID',
      thClass : 'hidden',
      tdClass : 'self-center'
    },
    {
      key     : 'name',
      label   : 'Name',
      thClass : 'hidden',
      tdClass : 'self-center'
    },
    {
      key     : 'status',
      label   : 'Is Active',
      thClass : 'hidden',
      tdClass : 'self-center'
    },
  ])

  const fields = defineTable([
    {
      key: 'name',
      label: 'Label',
    },
    {
      key: 'avatar',
      label: 'Label',
    },
    {
      key: 'status',
      label: 'Label',
      thClass: 'text-center',
      tdClass: 'text-center'
    },
    {
      key: 'action',
      label: 'Label',
      thClass: 'text-center',
      tdClass: 'text-center'
    }
  ])

  const items = ref([
    {
      name  : 'Text',
      avatar : 'Text',
      status: true,
    },
    {
      name  : 'Text',
      avatar : 'Text',
      status: true,
    },
  ])

  const items3 = ref([
    {
      name  : 'Samuel',
      avatar : 'Text',
      status: true,
    },
    {
      name  : 'Jonathan',
      avatar : 'Text',
      status: true,
    },
    {
      name  : 'Ranthi',
      avatar : 'Text',
      status: true,
    },
  ])

  const selected = ref([])
  const selectedA = ref([])
</script>

<style lang="postcss">
  .table-noborder {
    .datatable {
      &__row {
        @apply border-0;
      }
    }
  }
</style>

# ![navigation](/assets/images/img-guide-data-table.svg) Data Table

## Data Table

### Usage
Table is used to organize and display information from a data set.

### Row Component Type

#### With Label

<div class="py-4 table-noborder">
  <p-table :fields="fields1" :items="items1" />
</div>
<p-caption class="!text-subtle">
  Usage: Default state, a checkbox input includes a selected and unselected state.
</p-caption>

#### Without Label

<div class="py-4 table-noborder">
  <p-table :fields="fields2" :items="items1" />
</div>
<p-caption class="!text-subtle">
  Usage: This data set component used for data set that has header table. This type of data set doesn’t require label because the context of data set component has been represented by table header.
</p-caption>

### Row Component Function type

#### Without Label

<div class="py-4 table-noborder">
  <p-table :fields="fields3" :items="items2">
    <template #cell(id)="{ item }">
      {{ item.name }}
    </template>
    <template #cell(name)="{ item }">
      {{ item.name }}
      <p-caption>Caption</p-caption>
    </template>
    <template #cell(status)="{ item }">
      <span>
        {{ item.name }}
        <p-label variant="light" color="primary" size="xs">Label</p-label>
      </span>
      <p-caption>Caption</p-caption>
    </template>
  </p-table>
</div>
<p-caption class="!text-subtle">
  Usage: -
</p-caption>

#### Avatar Group

<div class="py-4 table-noborder">
  <p-table :fields="fields2" :items="items1">
    <template #cell(label)="{ item }">
      <span class="flex -space-x-2">
        <p-avatar class="border-2 border-base-white" size="md" src="https://picsum.photos/50" />
        <p-avatar class="border-2 border-base-white" size="md" src="https://picsum.photos/50" />
        <p-avatar class="border-2 border-base-white" size="md" src="https://picsum.photos/50" />
      </span>
    </template>
  </p-table>
</div>
<p-caption class="!text-subtle">
  Usage: Data set component that used for displays a number of avatars grouped together.
</p-caption>

#### Button

<div class="py-4 table-noborder">
  <p-table :fields="fields2" :items="items1">
    <template #cell(label)="{ item }">
      <p-button size="sm">Button text</p-button>
    </template>
  </p-table>
</div>
<p-caption class="!text-subtle">
  Usage: Data set component that used for displaying a button.
</p-caption>

#### Tag Label

<div class="py-4 table-noborder">
  <p-table :fields="fields2" :items="items1">
    <template #cell(label)="{ item }">
      <p-label variant="light" color="primary" size="sm">Label</p-label>
    </template>
  </p-table>
</div>
<p-caption class="!text-subtle">
  Usage: Data set component that used for displaying a label.
</p-caption>

#### Checkbox

<div class="py-4 table-noborder">
  <p-table :fields="fields2" :items="items1">
    <template #cell(label)="{ item }">
      <p-checkbox />
    </template>
  </p-table>
</div>
<p-caption class="!text-subtle">
  Usage: Data set component that used for displaying a checkbox.
</p-caption>

#### Radio

<div class="py-4 table-noborder">
  <p-table :fields="fields2" :items="items1">
    <template #cell(label)="{ item }">
      <p-radio />
    </template>
  </p-table>
</div>
<p-caption class="!text-subtle">
  Usage: Data set component that used for displaying a radio.
</p-caption>

#### Avatar

<div class="py-4 table-noborder">
  <p-table :fields="fields2" :items="items1">
    <template #cell(label)="{ item }">
      <div class="flex flex-row space-x-10">
        <span class="flex space-x-2 items-center">
          <p-avatar src="https://picsum.photos/50" />
          <span>
            Text Content
          </span>
        </span>
        <span class="flex space-x-2 items-center">
          <p-avatar src="https://picsum.photos/50" />
          <span>
            Text Content
          </span>
        </span>
      </div>
    </template>
  </p-table>
</div>
<p-caption class="!text-subtle">
  Usage: Data set component that used for displays a single avatars.
</p-caption>

#### Text Field

<div class="py-4 table-noborder">
  <p-table :fields="fields2" :items="items1">
    <template #cell(label)="{ item }">
      <div class="flex w-1/4">
        <p-input placeholder="Placeholder" size="sm" />
      </div>
    </template>
  </p-table>
</div>
<p-caption class="!text-subtle">
  Usage: Data set component that used for displays a text field.
</p-caption>

#### Toggle

<div class="py-4 table-noborder">
  <p-table :fields="fields2" :items="items1">
    <template #cell(label)="{ item }">
      <p-toggle checked no-label />
    </template>
  </p-table>
</div>
<p-caption class="!text-subtle">
  Usage: Data set component that used for displays a toggle.
</p-caption>

#### Icon

<div class="py-4 table-noborder">
  <p-table :fields="fields2" :items="items1">
    <template #cell(label)="{ item }">
      <IconMenu />
    </template>
  </p-table>
</div>
<p-caption class="!text-subtle">
  Usage: Data set component that used for displays a button icon.
</p-caption>

### Table Style

#### Flexible Table Style

<div class="py-4">
  <p-table selectable :fields="fields" :items="items">
    <template #cell(name)="{ item }">
      <span class="flex items-center space-x-2">
        <p-avatar src="https://picsum.photos/50" />
        <span>
          {{ item.name }}
        </span>
      </span>
    </template>
    <template #cell(avatar)="{ item }">
      <span class="flex flex-col">
        <span>
          {{ item.name }}
          <p-label size="xs" variant="light" color="primary">Label</p-label>
        </span>
        <p-caption>Caption</p-caption>
      </span>
    </template>
    <template #cell(status)="{ item }">
      <p-toggle checked no-label />
    </template>
    <template #cell(action)="{ item }">
      <span class="flex justify-center">
        <IconMenu />
      </span>
    </template>
  </p-table>
</div>
<p-caption class="!text-subtle">
  Usage: This component table style usually used for a table that require flexible row inside the table. Each a coloum inside the row has it’s own label, so it’s possible to move up / down the row. This type of style also doesn’t require a table header.
</p-caption>

#### Static Table Style

<div class="py-4">
  <p-table variant="static" :fields="fields" :items="items3">
    <template #cell(name)="{ item }">
      <span class="flex items-center space-x-2">
        <p-avatar src="https://picsum.photos/50" />
        <span>
          {{ item.name }}
        </span>
      </span>
    </template>
    <template #cell(avatar)="{ item }">
      <span class="flex flex-col">
        <span>
          {{ item.name }}
          <p-label size="xs" variant="light" color="primary">Label</p-label>
        </span>
        <p-caption>Caption</p-caption>
      </span>
    </template>
    <template #cell(status)="{ item }">
      <p-toggle checked no-label />
    </template>
    <template #cell(action)="{ item }">
      <span class="flex justify-center">
        <IconMenu />
      </span>
    </template>
  </p-table>
</div>
<p-caption class="!text-subtle">
  Usage: This component table style usually used for a table that have a strict layout. This table style require table header, because it’s doesn’t have label on it’s each coloumn.
</p-caption>


#### Draggable Table Style

<div class="py-4">
  <p-table variant="static" :fields="fields" :items="items3" draggable>
    <template #cell(name)="{ item }">
      <span class="flex items-center space-x-2">
        <p-avatar src="https://picsum.photos/50" />
        <span>
          {{ item.name }}
        </span>
      </span>
    </template>
    <template #cell(avatar)="{ item }">
      <span class="flex flex-col">
        <span>
          {{ item.name }}
          <p-label size="xs" variant="light" color="primary">Label</p-label>
        </span>
        <p-caption>Caption</p-caption>
      </span>
    </template>
    <template #cell(status)="{ item }">
      <p-toggle checked no-label />
    </template>
    <template #cell(action)="{ item }">
      <span class="flex justify-center">
        <IconMenu />
      </span>
    </template>
  </p-table>
</div>
<p-caption class="!text-subtle">
  Usage: This component is a draggable table, the row is flexible so it’s possible to move up / down the row.
</p-caption>

## Pattern Rule

### Best Practice

<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>Show values across multiple categories and measures.</li>
      <li>Allow for filtering and ordering when comparison is not a priority.</li>
      <li>Help merchants visualize and scan many values from an entire data set.</li>
      <li>Help merchants find other values in the data hierarchy through use of links.</li>
      <li>Minimize clutter by only including values that supports the data’s purpose.</li>
      <li>Include a summary row to surface the column totals.</li>
      <li>Not include calculations within the summary row.</li>
      <li>
        Wrap instead of truncate content. This is because if row titles start with the same word, they’ll all appear the same when truncated.
      </li>
      <li>Not to be used for an actionable list of items that link to details pages. For this functionality</li>
    </ul> 
  </div>
</div>

### Do

<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>Use when you need to display tabular data in a view.</li>
      <li>Use a table element directly within the component.</li>
    </ul> 
  </div>
</div>

### Don’t

<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>Don’t use to display list data.</li>
      <li>Don’t use to display basic key and value pairs, consider a description list instead.</li>
      <li>Don’t use tables for layout.</li>
      <li>Don't use a primary button in every row of a table.</li>
    </ul> 
  </div>
</div>

