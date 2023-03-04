<script setup>
  import pBreadcrumb from './Breadcrumb.vue'
  import pBreadcrumbItem from './BreadcrumbItem.vue'
  import pBreadcrumbItemDropdown from './BreadcrumbItemDropdown.vue'
  import pDropdownItem from '../dropdown/DropdownItem.vue'

  const items = [{
    text: 'Home',
    href: '#'
  },
  {
    text: 'Document',
    href: '#'
  },
  {
    text: 'History',
    active: true,
  }]
</script>

<preview>
  <p-breadcrumb>
    <p-breadcrumb-item href="http://google.com">
      Hello there
    </p-breadcrumb-item>
    <p-breadcrumb-item>
      Hello there
    </p-breadcrumb-item>
    <p-breadcrumb-item-dropdown text="hello there">
      <p-dropdown-item>Item Text</p-dropdown-item>
      <p-dropdown-item>Item Text</p-dropdown-item>
      <p-dropdown-item>Item Text</p-dropdown-item>
    </p-breadcrumb-item-dropdown>
  </p-breadcrumb>
</preview>

<preview>
  <p-breadcrumb :items="items">
  </p-breadcrumb>
</preview>