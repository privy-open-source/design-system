---
title: Page · Components
description: Page with toggle expand for responsive purpose
---

<script setup>
  import pPage from './Page.vue'
  import pSidebarMenu from '../sidebar-menu/SidebarMenu.vue'
  import pSidebarBrand from '../sidebar/SidebarBrand.vue'
  import pCheckbox from '../checkbox/Checkbox.vue'
  import pCard from '../card/Card.vue'
  import pHeading from '../heading/Heading.vue'
  import pBanner from '../banner/Banner.vue'
  import IconDashboard from '@carbon/icons-vue/lib/dashboard/20'
  import IconDocument from '@carbon/icons-vue/lib/document/20'
  import IconUsers from '@carbon/icons-vue/lib/group/20'
  import IconSettings from '@carbon/icons-vue/lib/settings--adjust/20'
  import IconMenu from '@carbon/icons-vue/lib/menu/20'
  import IconEN from '../sidebar-menu/assets/images/img-flag.svg'
  import { defineMenu } from '../sidebar-menu'
  import { ref } from 'vue-demi'

  const model = ref(false)
  const modelA   = ref(false)
  const modelB = ref(false)

  const menu = defineMenu([
    {
      items: [
        {
          name : 'dashboard',
          label: 'Dashboard',
          url  : '/',
          icon : IconDashboard
        },
        {
          name : 'documents',
          label: 'Documents',
          url  : '/',
          icon : IconDocument
        },
        {
          name : 'contacts',
          label: 'Contacts',
          url  : '/',
          icon : IconUsers
        }
      ]
    },
  ])

  const basic = defineMenu([
    {
      items: [
        {
          name : 'dashboard',
          label: 'Dashboard',
          url  : '/',
          icon : IconDashboard,
        },
        {
          name       : 'document',
          label      : 'Documents',
          url        : '/',
          icon       : IconDocument,
          collapsible: true,
          submenu    : [
            {
              name : 'need-action',
              label: 'Need Action',
              url  : '/'
            },
            {
              name : 'in-progress',
              label: 'In Progress',
              url  : '/'
            },
            {
              name : 'others',
              label: 'Others',
              url  : '/'
            }
          ]
        },
        {
          name : 'contact',
          label: 'Contacts',
          url  : '/',
          icon : IconUsers
        }
      ]
    },
    {
      condensed: true,
      title: 'Quick Jump',
      items: [
        {
          name : 'rejects',
          label: 'Rejects',
          url  : '/',
        },
        {
          name: 'archives',
          label: 'Archives',
          url: '/',
        },
      ]
    },
    {
      bottom: true,
      items: [
        {
          name : 'settings',
          label: 'Settings',
          icon : IconSettings,
          url  : '/',
        },
        {
          name : 'english',
          label: 'English',
          url  : '/',
          icon : IconEN
        },
      ]
    },
  ])

  const narrow = defineMenu([
    {
      items: [
        {
          name: 'dashboard',
          url : '/',
          icon: IconDashboard
        },
        {
          name: 'document',
          url : '/',
          icon: IconDocument
        },
        {
          name: 'users',
          url : '/',
          icon: IconUsers
        }
      ]
    },
    {
      bottom: true,
      items : [
        {
          name: 'settings',
          url : '/',
          icon: IconSettings
        },
        {
          name : 'language',
          label: 'ENG',
          url  : '/',
          icon : IconEN,
        }
      ]
    }
  ])
</script>
<style scoped lang="postcss">
  .preview {
    @apply block h-[28rem] overflow-hidden;

    &.higher {
      @apply h-[35rem];
    }

    .sidebar--fixed {
      @apply absolute;
    }
  }
</style>

# Page

> Toggle expand page for responsive purpose

## Usage
The page component is used in combination with the sidebar component. It can be toggle expanded fit the sidebar via `expand` props. Page component also can expand automatically if certain breakpoint condition have been met. There are at least 4 breakpoints available, namely `all`, `lg`, `md` and `sm`.

<p-banner :dismissable="false">
  Please resize the browser to see
  the demo works.
</p-banner>

### Basic Usage

<preview class="higher">
  <div class="flex h-full min-h-screen">
    <p-sidebar-menu :menus="menu" fixed toggleable="lg" v-model="model" class="shadow-lg">
      <p-sidebar-brand>
        <img src="../sidebar/assets/images/logo-privy.svg" alt="" />
      </p-sidebar-brand>
    </p-sidebar-menu>
    <p-page expand="lg" v-model="model">
      <div class="mb-5 visible lg:invisible">
        <p-checkbox appearance="none" v-model="model">
          <template #default>
            <p-card
              element="div"
              class="p-2 hover:shadow-md hover:border-subtle ease-in-out duration-200"
              sectioned>
              <span class="flex items-center space-x-2">
                <IconMenu class="text-muted" />
                <span>Menu</span>
              </span>
            </p-card>
          </template>
        </p-checkbox>
      </div>
      <p-heading element="h5" class="mb-5">
        A wonderful serenity has taken possession
      </p-heading>
      <p>
        My <em>entire</em> soul, <small>like</small> these sweet mornings of spring <strong>which I enjoy</strong> with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath
      </p>
    </p-page>
  </div>
</preview>

```vue
<script setup>
  import { defineMenu } from '@privyid/persona/core'
  import IconDashboard from '@carbon/icons-vue/lib/dashboard/20'
  import IconDocument from '@carbon/icons-vue/lib/document/20'
  import IconUsers from '@carbon/icons-vue/lib/group/20'
  import IconMenu from '@carbon/icons-vue/lib/menu/20'

  const model = ref(false)

  const menu = defineMenu([
    {
      items: [
        {
          name : 'dashboard',
          label: 'Dashboard',
          url  : '/',
          icon : IconDashboard
        },
        {
          name : 'documents',
          label: 'Documents',
          url  : '/',
          icon : IconDocument
        },
        {
          name : 'contacts',
          label: 'Contacts',
          url  : '/',
          icon : IconUsers
        }
      ]
    },
  ])
</script>

<template>
  <p-sidebar-menu :menus="menu" fixed toggleable="lg" v-model="model">
    <p-sidebar-brand>
      <img src="../sidebar/assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
  </p-sidebar-menu>
  <p-page expand="lg" v-model="model">
    <div class="mb-5 visible lg:invisible">
      <p-checkbox appearance="none" v-model="model">
        <template #default>
          <p-card
            element="div"
            class="p-2 hover:shadow-md hover:border-subtle ease-in-out 
            duration-200"
            sectioned>
            <span class="flex items-center space-x-2">
              <IconMenu class="text-muted" />
              <span>Menu</span>
            </span>
          </p-card>
        </template>
      </p-checkbox>
    </div>
    <p-heading element="h5" class="mb-5">
      A wonderful serenity has taken possession
    </p-heading>
    <p>
      My <em>entire</em> soul, <small>like</small> these sweet mornings 
      of spring <strong>which I enjoy</strong> with my whole heart. 
      I am alone...
    </p>
  </p-page>
</template>
```

### Full Width
Now is very simple when need full-width page with toggle-slide sidebar menu. Just give `all` (to expanded in all breakpoint) in `expand` props of page component and `toggleable` props of sidebar component.

<preview class="higher">
  <div class="flex h-full min-h-screen">
    <p-sidebar-menu :menus="menu" fixed toggleable="all" v-model="modelB" class="shadow-lg">
      <p-sidebar-brand>
        <img src="../sidebar/assets/images/logo-privy.svg" alt="" />
      </p-sidebar-brand>
    </p-sidebar-menu>
    <p-page expand="all" v-model="modelB">
      <div class="mb-5">
        <p-checkbox appearance="none" v-model="modelB">
          <template #default>
            <p-card
              element="div"
              class="p-2 hover:shadow-md hover:border-subtle ease-in-out duration-200"
              sectioned>
              <span class="flex items-center space-x-2">
                <IconMenu class="text-muted" />
                <span>Menu</span>
              </span>
            </p-card>
          </template>
        </p-checkbox>
      </div>
      <p-heading element="h5" class="mb-5">
        A wonderful serenity has taken possession
      </p-heading>
      <p>
        My <em>entire</em> soul, <small>like</small> these sweet mornings of spring <strong>which I enjoy</strong> with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath
      </p>
    </p-page>
  </div>
</preview>

```vue
<template>
  <p-sidebar-menu :menus="menu" fixed toggleable="all" v-model="model">
    ...
  </p-sidebar-menu>
  <p-page expand="all" v-model="model">
    <div class="mb-5">
      ...
    </div>
    ...
  </p-page>
</template>
```

## Type Variant
Page component has 2 type variant, `wide` and `narrow`. Default type is `narrow`. The value of page component type variant is negation with sidebar component type variant. When type variant of sidebar is `wide`, then type variant of page is `narrow`.

<preview class="higher">
  <div class="flex h-full min-h-screen">
    <p-sidebar-menu :menus="narrow" type="narrow" fixed toggleable="lg" v-model="modelA">
      <p-sidebar-brand>
        <img src="../sidebar/assets/images/logo-privy-icon.svg" alt="" />
      </p-sidebar-brand>
    </p-sidebar-menu>
    <p-page expand="lg" type="wide" v-model="modelA">
      <div class="mb-5 visible lg:invisible">
        <p-checkbox appearance="none" v-model="modelA">
          <template #default>
            <p-card
              element="div"
              class="p-2 hover:shadow-md hover:border-subtle ease-in-out 
              duration-200"
              sectioned>
              <span class="flex items-center space-x-2">
                <IconMenu class="text-muted" />
                <span>Menu</span>
              </span>
            </p-card>
          </template>
        </p-checkbox>
      </div>
      <p-heading element="h5" class="mb-5">
        A wonderful serenity has taken possession
      </p-heading>
      <p>
        My <em>entire</em> soul, <small>like</small> these sweet mornings of spring <strong>which I enjoy</strong> with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath
      </p>
    </p-page>
  </div>
</preview>

```vue
<script setup>
  import { defineMenu } from '@privyid/persona/core'
  import IconDashboard from '@carbon/icons-vue/lib/dashboard/20'
  import IconDocument from '@carbon/icons-vue/lib/document/20'
  import IconUsers from '@carbon/icons-vue/lib/group/20'
  import IconSettings from '@carbon/icons-vue/lib/settings--adjust/20'
  import IconMenu from '@carbon/icons-vue/lib/menu/20'
  import IconEN from '../assets/images/img-flag.svg'

  const model = ref(false)

  const menu = defineMenu([
    {
      items: [
        {
          name: 'dashboard',
          url : '/',
          icon: IconDashboard
        },
        {
          name: 'document',
          url : '/',
          icon: IconDocument
        },
        {
          name: 'users',
          url : '/',
          icon: IconUsers
        }
      ]
    },
    {
      bottom: true,
      items : [
        {
          name: 'settings',
          url : '/',
          icon: IconSettings
        },
        {
          name : 'language',
          label: 'ENG',
          url  : '/',
          icon : IconEN,
        }
      ]
    }
  ])
</script>

<template>
  <p-sidebar-menu :menus="menu" type="narrow" fixed toggleable="lg" 
    v-model="model">
    ...
  </p-sidebar-menu>
  <p-page expand="lg" type="wide" v-model="model">
    <div class="mb-5 visible lg:invisible">
      ...
    </div>
    ...
  </p-page>
</template>
```


## API

### Props

| Props          |   Type    | Default     | Description                                                       |
|----------------|:---------:|:-----------:|-------------------------------------------------------------------|
| `expand`       | `String`  | `-`         | Expand page with desired breakpoint `lg`, `md`, `sm` and `all`    |
| `type`         | `String`  | `narrow`      | Page type, valid value is `wide` and `narrow`                   |

### Slots

| Name             | Description                                             |
|------------------|---------------------------------------------------------|
| `default`        | Content to place in the Page                            |

### Events

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
