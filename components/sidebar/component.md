<script setup>
  import Sidebar from './Sidebar.vue'
  import SidebarNav from './SidebarNav.vue'
  import NavItem from '../nav/NavItem.vue'
  import IconDocument from '@carbon/icons-vue/lib/document/20'
</script>

<style scoped>
  .preview {
    @apply block h-96;

    .sidebar--fixed {
      @apply absolute;
    }

    .sidebar {
      @apply w-auto;
    }
  }
</style>

<preview>
<div class="w-14">
  <Sidebar fixed variant="pills" align="left" type="narrow">
    <SidebarNav title="Menus">
      <NavItem active>
        <template #icon>
          <IconDocument />
        </template>
        Dashboard
      </NavItem>
      <NavItem>Documents</NavItem>
      <NavItem>Contacts</NavItem>
      <NavItem>Structure</NavItem>
    </SidebarNav>
  </Sidebar>
</div>
</preview>


<preview>
<div class="w-80">
  <Sidebar fixed variant="pills" align="right">
    <SidebarNav title="Menus">
      <NavItem active>Dashboard</NavItem>
      <NavItem>
        <template #icon>
          <IconDocument />
        </template>
        Documents
      </NavItem>
      <NavItem>Contacts</NavItem>
      <NavItem>Structure</NavItem>
    </SidebarNav>
  </Sidebar>
</div>
</preview>
