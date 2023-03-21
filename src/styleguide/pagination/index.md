---
title: Pagination · Style guide
description: Pagination style guide
---

<script setup>
  import pPagination from '../../components/pagination/Pagination.vue'
  import { ref } from 'vue-demi'
  import IconPrev from '@carbon/icons-vue/lib/chevron--left/20'
  import IconNext from '@carbon/icons-vue/lib/chevron--right/20'

  const page = ref(1)
  const total = ref(100)
  const total2 = ref(200)
  const page2 = ref(5)
  const total3 = ref(990)
  const perPage = ref(20)
  const perPageOptions = ref([10,20,30])
</script>

<style lang="postcss">
  .nav-left {
    .pagination {
      &__items {
        @apply only:mr-auto only:!ml-0;
      }
    }
  }
</style>

# ![pagination](/assets/images/img-guide-pagination.svg) Pagination

## Pagination

### Usage

Pagination allows you to divide large amounts of content into smaller chunks across multiple pages.

### Style

#### Default

<div class="py-6">
  <p-pagination v-model="page" :total="total" />
</div>
<p-caption class="!text-subtle">
  Usage: This is the default pagination that usualy used in entire design layout. This type of pagination used when the amount of page is limited (ex : up to 10).
</p-caption>

#### Truncate

<div class="py-6">
  <p-pagination v-model="page" :total="total2" />
</div>
<p-caption class="!text-subtle">
  Usage: This type of pagination usualy used when the page has a large amout or exceeds the maximum display limit (ex : more than 10). Ellipsis is used to truncate the remaining pages.
</p-caption>

<div class="py-6">
  <p-pagination v-model="page2" :total="total3" />
</div>
<p-caption class="!text-subtle">
  Usage: This type of pagination that have double truncation usualy used when the current page is separated by more than five pages from both the first and last page.
</p-caption>

### Navigation

#### Short

<div class="py-6">
  <p-pagination v-model="page" :total="total" />
</div>
<p-caption class="!text-subtle">
  Usage: This type of pagination usualy used when the page has a large amout or exceeds the maximum display limit (ex : more than 10). Ellipsis is used to truncate the remaining pages.
</p-caption>

#### None

<div class="py-6">
  <p-pagination variant="none" v-model="page" :total="total" />
</div>
<p-caption class="!text-subtle">
  Usage: This type of pagination usualy used when the page has a large amout or exceeds the maximum display limit (ex : more than 10). Ellipsis is used to truncate the remaining pages.
</p-caption>

#### Far

<div class="py-6">
  <p-pagination variant="far" v-model="page" :total="total" />
</div>
<p-caption class="!text-subtle">
  Usage: This type of pagination that have a navigation also button shortcut to jump to the first page or last page.
</p-caption>

#### Navigation Only

<div class="py-6 nav-left">
  <p-pagination v-model="page" :total="total" navigation-only />
</div>
<p-caption class="!text-subtle">
  Usage: Use this type of pagination to jump to the next or previous page. This pagination used to simplify the function for move to another page, usually used when amount of page is limited.
</p-caption>

#### Navigation Only with text

<div class="py-6 nav-left">
  <p-pagination 
    v-model="page" 
    :total="total" 
    navigation-only
    navigation-text
    prev-nav-label="Previous"
    next-nav-label="Next" />
</div>
<p-caption class="!text-subtle">
  Usage: Use this type of pagination to jump to the next or previous page. This navigation used when the user can’t understand the meaning of next or previous button. So instead using icon to navigate next and previous page, use button text ‘previous’ and ‘next’.
</p-caption>

#### Navigation Only Text and icon

<div class="py-6 nav-left">
  <p-pagination 
    v-model="page" 
    :total="total" 
    navigation-only
    navigation-text
    variant="far"
    first-nav-label="First"
    last-nav-label="Last">
    <template #prev-navigation>
      <IconPrev />
    </template>
    <template #next-navigation>
      <IconNext />
    </template>
  </p-pagination>
</div>
<p-caption class="!text-subtle">
  Usage: Use this type of navigation to jump to the next or previous page, also can jump to the first and last page.
</p-caption>

#### Jump to page

<div class="py-6 nav-left">
  <p-pagination 
    v-model="page" 
    v-model:per-page="perPage"
    :total="total" 
    quick-jump>
  </p-pagination>
</div>
<p-caption class="!text-subtle">
  Usage: This component used when the page number is too much (ex : more than 100), so to shorten the process, this pagination will be used because can search to specific page.
</p-caption>

### Detail

#### With Detail

<div class="py-6 nav-left">
  <p-pagination 
    v-model="page" 
    v-model:per-page="perPage" 
    :total="total" 
    show-detail>
    <template #pagination-count="{ range, total }">
      {{ range[0] }} to {{ range[1] }} from {{ total }}
    </template>
  </p-pagination>
</div>
<p-caption class="!text-subtle">
  Usage: The pagination with detail usualy used for the page has a large amout. so the user can set by themself how many pages they liked to shown. 
</p-caption>

#### Without Detail

<div class="py-6 nav-left">
  <p-pagination 
    v-model="page" 
    v-model:per-page="perPage" 
    :total="total" />
</div>
<p-caption class="!text-subtle">
  Usage: This is the basic default pagination component that usualy used in all over designs. This type of pagination usualy used when the page doesn’t have large amount content to shown, and have a limited amount of page.
</p-caption>

## Pattern Rule

### Best Practice

<div class="flex">
  <div class="w-2/3">
    <p>For smaller screens, it's best to show a maximum of seven pages (including the ellipsis)</p>
    <p>For larger screens, show a maximum of 14 pages (including the ellipsis).</p>
    <p>On all platforms, pagination should</p>
    <ul>
      <li>Only be used for lists with more than 25 items</li>
    </ul> 
    <p>Web pagination should</p>
    <ul>
      <li>Be placed at the bottom of a long list that has been split up into pages</li>
      <li>Pagination should navigate to the previous and next set of items in the paged list</li>
      <li>Hint when merchants are at the first or the last page by disabling the corresponding button</li>
    </ul> 
  </div>
</div>

### Do

<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>Use Pagination to let users page through items where a user is trying to find a specific item.</li>
      <li>
        Add custom, context-specific information to page labels and left and right page controls 
        to give customers more clarity about where they are and where they’re going, when needed.
      </li>
      <li>
        Show current page count whenever possible so users understand where they are in a dataset, 
        and so that they know the content in view has been updated if they navigate to a new page number.
      </li>
    </ul> 
  </div>
</div>

### Don’t

<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>
        Don’t use the Pagination component to help users navigate through linear multi-step 
        content like paged forms. In these cases, use a Progress Stepper (coming soon) or something 
        that can communicate more about a user’s status through a flow than the Pagination component allows.
      </li>
      <li>
        Don’t over-complicate Pagination labels with too much information about the content in view. 
        If you can’t give succinct labels to Pagination, consider showing the information elsewhere on the page.
      </li>
    </ul> 
  </div>
</div>