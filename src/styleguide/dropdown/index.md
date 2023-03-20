---
title: Dropdown · Style guide
description: Dropdown style guide
---

<script setup>
  import pDropdownGroup from '../../components/dropdown-subitem/DropdownSubitem.vue'
  import pDropdown from '../../components/dropdown/Dropdown.vue'
  import pDropdownItem from '../../components/dropdown/DropdownItem.vue'
  import pSubheading from '../../components/subheading/Subheading.vue'
  import pCaption from '../../components/caption/Caption.vue'
  import pCheckbox from '../../components/checkbox/Checkbox.vue'
  import pAvatar from '../../components/avatar/Avatar.vue'
  import pBanner from '../../components/banner/Banner.vue'
  import pDivider from '../../components/divider/Divider.vue'
  import pRadio from '../../components/radio/Radio.vue'
  import IconNext from '@carbon/icons-vue/lib/chevron--right/16'
  import { ref } from 'vue-demi'
  
  const model = ref(true)
  const selected = ref('orange')
</script>

<style lang="postcss">
  .dropdown-preview {
    @apply py-4;

    .dropdown {
      &__menu {
        @apply static;
      }
    }
  }
</style>

# ![dropdown](/assets/images/img-guide-data-table.svg) List item/Dropdown Menu

## List item/Drop Down menu

### Usage
A list of actions or selectable options for a user. Each list resemble specific action or selectable item that can be choose by user.

### List Item Type

#### List Item Default
<div class="dropdown-preview">
  <div class="dropdown">
    <div
      class="dropdown__menu">
      <div class="dropdown__subitem">
        <p-subheading
          class="px-4 pt-4 pb-1"
          weight="medium"
          overline>
          Title Section
        </p-subheading>
        <p-dropdown-item href="#">
          Item Text
        </p-dropdown-item>
        <p-dropdown-item href="#">
          Item Text
        </p-dropdown-item>
        <p-dropdown-item href="#">
          Item Text
        </p-dropdown-item>
      </div>
    </div>
  </div>
</div>
<p-caption class="!text-subtle">
  Usage: Default state, a checkbox input includes a selected and unselected state.
</p-caption>

#### List item with value
<div class="dropdown-preview">
  <div class="dropdown">
    <div
      class="dropdown__menu">
      <div class="dropdown__subitem">
        <p-subheading
          class="px-4 pt-4 pb-1"
          weight="medium"
          overline>
          Title Section
        </p-subheading>
        <p-dropdown-item href="#">
          <span class="flex items-center justify-between">
            <span>Item Text</span>
            <p-caption>value</p-caption>
          </span>
        </p-dropdown-item>
        <p-dropdown-item href="#">
          <span class="flex items-center justify-between">
            <span>Item Text</span>
            <p-caption>value</p-caption>
          </span>
        </p-dropdown-item>
        <p-dropdown-item href="#">
          <span class="flex items-center justify-between">
            <span>Item Text</span>
            <p-caption>value</p-caption>
          </span>
        </p-dropdown-item>
      </div>
    </div>
  </div>
</div>
<p-caption class="!text-subtle">
  Usage: List item with value is used when the list has value to clarify or add info for the list item
</p-caption>

#### List item With icon
<div class="dropdown-preview">
  <div class="dropdown">
    <div
      class="dropdown__menu">
      <div class="dropdown__subitem">
        <p-subheading
          class="px-4 pt-4 pb-1"
          weight="medium"
          overline>
          Title Section
        </p-subheading>
        <p-dropdown-item href="#">
          <span class="flex items-center justify-between">
            <span>Item Text</span>
            <IconNext />
          </span>
        </p-dropdown-item>
        <p-dropdown-item href="#">
          <span class="flex items-center justify-between">
            <span>Item Text</span>
            <IconNext />
          </span>
        </p-dropdown-item>
        <p-dropdown-item href="#">
          <span class="flex items-center justify-between">
            <span>Item Text</span>
            <IconNext />
          </span>
        </p-dropdown-item>
      </div>
    </div>
  </div>
</div>
<p-caption class="!text-subtle">
  Usage: List items with icons are usually used when a list item requires an icon to add an action or just to make the options more clear
</p-caption>

#### List item Checkbox
<div class="dropdown-preview">
  <div class="dropdown w-2/6">
    <div
      class="dropdown__menu">
      <div class="dropdown__subitem">
        <p-subheading
          class="px-4 pt-4 pb-1"
          weight="medium"
          overline>
          Title Section
        </p-subheading>
        <p-checkbox>Checklist Label</p-checkbox>
        <p-checkbox>Checklist Label</p-checkbox>
        <p-checkbox>Checklist Label</p-checkbox>
      </div>
    </div>
  </div>
</div>
<p-caption class="!text-subtle">
  Usage: List item checkbox usually used for option that can be selected by user. User can select multiple option with checkbox
</p-caption>

#### List item Select
<div class="dropdown-preview">
  <div class="dropdown w-2/6">
    <div
      class="dropdown__menu">
      <div class="dropdown__subitem">
        <p-subheading
          class="px-4 pt-4 pb-1"
          weight="medium"
          overline>
          Title Section
        </p-subheading>
        <p-radio appearance="option" v-model="selected" value="orange">Checklist Label</p-radio>
        <p-radio appearance="option" v-model="selected" value="grape">Checklist Label</p-radio>
        <p-radio appearance="option" v-model="selected" value="pineaple">Checklist Label</p-radio>
      </div>
    </div>
  </div>
</div>
<p-caption class="!text-subtle">
  Usage: List item select are usually used for options that only one of them is allowed to be selected by the user.
</p-caption>

#### List item with avatar
<div class="dropdown-preview">
  <div class="dropdown w-2/6">
    <div
      class="dropdown__menu">
      <div class="dropdown__subitem">
        <p-subheading
          class="px-4 pt-4 pb-1"
          weight="medium"
          overline>
          Title Section
        </p-subheading>
        <p-dropdown-item href="#">
          <span class="flex items-center space-x-2">
            <p-avatar src="https://picsum.photos/50" size="xs" />
            <span>Item Text</span>
          </span>
        </p-dropdown-item>
        <p-dropdown-item href="#">
          <span class="flex items-center space-x-2">
            <p-avatar name="Sam Alpha" size="xs" />
            <span>Item Text</span>
          </span>
        </p-dropdown-item>
        <p-dropdown-item href="#">
          <span class="flex items-center space-x-2">
            <p-avatar size="xs" />
            <span>Item Text</span>
          </span>
        </p-dropdown-item>
      </div>
    </div>
  </div>
</div>
<p-caption class="!text-subtle">
  Usage: List item avatar usually used for option that require image (avatar, etc) to make the options more clear.
</p-caption>

#### List item with subtext
<div class="dropdown-preview">
  <div class="dropdown w-2/6">
    <div
      class="dropdown__menu">
      <p-subheading
        class="px-4 pt-4 pb-1"
        weight="medium"
        overline>
        Title Section
      </p-subheading>
      <p-dropdown-item href="#">
        Item Text
        <p-caption>Item Subtext</p-caption>
      </p-dropdown-item>
      <p-dropdown-item href="#">
        Item Text
        <p-caption>Item Subtext</p-caption>
      </p-dropdown-item>
      <p-dropdown-item href="#">
        Item Text
        <p-caption>Item Subtext</p-caption>
      </p-dropdown-item>
    </div>
  </div>
</div>
<p-caption class="!text-subtle">
  Usage: List items with subtext usually used when a list item requires subtext to clarify or add additional info
</p-caption>

<p-banner class="my-6">
Note: All types can be combined as needed, except the checkbox and icon used to add actions cannot be used together
</p-banner>

### List Item Ornament

#### List item With Divider
<div class="dropdown-preview">
  <div class="dropdown dropdown--divider w-2/6">
    <div
      class="dropdown__menu">
      <p-subheading
        class="px-4 pt-4 pb-1"
        weight="medium"
        overline>
        Title Section
      </p-subheading>
      <p-dropdown-item href="#">Item Text</p-dropdown-item>
      <p-dropdown-item href="#">Item Text</p-dropdown-item>
      <p-dropdown-item href="#">Item Text</p-dropdown-item>
    </div>
  </div>
</div>
<p-caption class="!text-subtle">
  Usage: List item with divider is used when a list item requires a divider to separate options to make it clear from one list to another
</p-caption>

#### List item With Divider and Gap
<div class="dropdown-preview">
  <div class="dropdown dropdown--divider w-2/6">
    <div
      class="dropdown__menu">
      <p-subheading
        class="px-4 pt-4 pb-1"
        weight="medium"
        overline>
        Title Section
      </p-subheading>
      <p-dropdown-item href="#" class="!py-6">Item Text</p-dropdown-item>
      <p-dropdown-item href="#" class="!py-6">Item Text</p-dropdown-item>
    </div>
  </div>
</div>
<p-caption class="!text-subtle">
  Usage: List items with divider and gap are usually used to give space between lists
</p-caption>

### Use Case

#### Grouping List
<div class="dropdown-preview">
  <div class="dropdown w-2/6">
    <div
      class="dropdown__menu">
      <p-subheading
        class="px-4 pt-4 pb-1"
        weight="medium"
        overline>
        Title Section
      </p-subheading>
      <p-dropdown-item href="#">Profile</p-dropdown-item>
      <p-dropdown-item href="#">Settings</p-dropdown-item>
      <p-dropdown-item href="#">Help</p-dropdown-item>
      <p-divider />
      <p-dropdown-item href="#">Log Out</p-dropdown-item>
    </div>
  </div>
</div>
<p-caption class="!text-subtle">
  Usage: Use divider and gap to separate lists that have different contexts from each other
</p-caption>


## Pattern Rule

### Best Practice

<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>
        A number of components can be used to give people the ability to select options. 
        See the list of related components below for advice on choosing the right one.
      </li>
      <li>
        When organizing dropdown menu items, sort the list in a logical order by putting 
        the most selected option at the top, if known. Test and refine over time to 
        re-evaluate if all menu items are needed.
      </li>
      <li>
        For long lists, group related menu items. If including radio buttons and checkboxes 
        as menu items, try grouping related actions.
      </li>
      <li>
        Grouped items are separated by a short, uppercase title that describes the options 
        in that sub-category.
      </li>
    </ul> 
  </div>
</div>

### Do

<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>
        Dropdown menus are typically used when you have 5-15 items to choose from. 
        They’re used for navigation or commands, where an action is initiated 
        based on the selection.
      </li>
      <li>
        When organizing dropdown menu items, sort the list in a logical order 
        by putting the most selected option at the top.
      </li>
      <li>Use for a “more” menu, where the control contains an icon.</li>
      <li>Use for user profiles, where the control is an avatar.</li>
      <li>Use in conjunction with the dropdown item and dropdown group components.</li>
    </ul> 
  </div>
</div>

### Don’t

<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>Don’t use for hiding primary actions since they should be visible by default.</li>
      <li>Don’t use for selecting an option from a list of options, use the select component instead.</li>
      <li>
        Don’t nest elements or components other than the dropdown item and dropdown group components. 
        Consider using the popout component when creating custom UI.
      </li>
    </ul> 
  </div>
</div>

