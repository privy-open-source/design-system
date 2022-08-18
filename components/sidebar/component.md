<script setup>
  import Sidebar from './Sidebar.vue'
  import SidebarNav from './SidebarNav.vue'
  import SidebarBrand from './SidebarBrand.vue'
  import NavItem from '../nav/NavItem.vue'
  import NavSubItem from '../nav/NavSubItem.vue'
  import IconDocument from '@carbon/icons-vue/lib/document/20'
</script>

<style scoped>
  .preview {
    @apply block h-96;

    .sidebar--fixed {
      @apply absolute;
    }
  }
</style>

<preview>
<Sidebar fixed variant="pills" align="left" type="narrow">
  <SidebarBrand>
    <img src="./assets/images/logo-privy-icon.svg" alt="" />
  </SidebarBrand>
  <SidebarNav>
    <NavItem active>
      <template #icon>
        <IconDocument />
      </template>
      Home
    </NavItem>
    <NavItem>
      <template #icon>
        <IconDocument />
      </template>
      Dashboard
    </NavItem>
  </SidebarNav>
  <SidebarNav bottom>
    <NavItem active>
      <template #icon>
        <IconDocument />
      </template>
    </NavItem>
    <NavItem>
      <template #icon>
        <IconDocument />
      </template>
    </NavItem>
  </SidebarNav>
</Sidebar>
</preview>

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
<div>
  <Sidebar fixed variant="pills" align="right">
    <SidebarNav title="Menus">
      <NavItem active>
        <template #icon>
          <IconDocument />
        </template>
        Dashboard
      </NavItem>
      <NavSubItem text="Documents">
        <template #icon>
          <IconDocument />
        </template>
        <SidebarNav>
          <NavItem>
            Contacts
          </NavItem>
          <NavItem>
            Structure
          </NavItem>
        </SidebarNav>
      </NavSubItem>
      <NavItem>Contacts</NavItem>
      <NavItem>Structure</NavItem>
    </SidebarNav>
  </Sidebar>
</div>
</preview>
